import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Op, QueryTypes } from "sequelize";
import db from "../../config/Database.js";
import LocationUser from "../../models/POSModule/LocationuserModel.js";
import Users from "../../models/baseModule/UserModel.js";
import Userrole from "../../models/baseModule/UserroleModel.js";
import UserModule from "../../models/baseModule/moduleModel.js";
import { Email } from "../../utils/mail.js";
import { generateOtp } from "../../utils/otp.js";

const generateTokens = (usercd, name, email, identity, firstTime) => {
  const accessToken = jwt.sign(
    {
      usercd,
      name,
      email,
      identity,
      firstTime,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1600s",
    }
  );

  const refreshToken = jwt.sign(
    {
      usercd,
      name,
      email,
      identity,
      firstTime,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return { accessToken, refreshToken };
};

const processUser = async (user, identityField) => {
  const usercd = user.id;
  const name = user.name;
  const identity = user.identity;
  const firstTime = user.first_time;
  const email = user[identityField];

  const location = await LocationUser.findAll({
    where: {
      [Op.or]: [{ usercd: email }, { usercd: identity }],
    },
    attributes: [
      "posname",
      "shopcd",
      "shopname",
      "locationcd",
      "locationname",
      "prylocation_flag",
    ],
  });

  const userModules = await UserModule.findAll({
    where: { usercd: identity },
    attributes: ["usercd", "module_name", "modulecd", "url", "timestamp"],
  });

  // const userPrivileges = await db.query(
  //   ` SELECT sm.seqno, sm.id, sm.ftnclass, a.usercd, sm.pathincludes, sm.icon, sm.label, sm.urlpath, sm.grpmenu,
  //           b.sysprivilegename, max(b.view) view, max(b.crud) crud
  //           FROM userrole a
  //           JOIN infopos.sysrole b ON a.sysrolecd = b.sysrolecd
  //           left JOIN intelliopsapp.sysmenu sm ON b.sysprivilegename = sm.sysprivilegename
  //           WHERE a.usercd = :identity
  //           GROUP BY sm.seqno, sm.id, sm.ftnclass, a.usercd, sm.pathincludes, sm.icon, sm.label, sm.grpmenu,
  //           b.sysprivilegename
  //           order by sm.seqno;
  //         `,
  //   {
  //     replacements: { identity: identity },
  //     type: QueryTypes.SELECT
  //   }
  // );

  // const grpMenu = await db.query(
  //   ` SELECT distinct a.id,  '${identity}' usercd, a.grpmenu, a.seqno, a.ftnclass, a.label, a.activestatus,
  //           a.urlpath, a.sysprivilegename, a.pathincludes, a.icon
  //           from intelliopsapp.sysmenu a
  //           where a.ftnclass = 'SideGrpmenu';
  //   `,
  //   {
  //     type: QueryTypes.SELECT
  //   }
  // );

  const userRoles = await Userrole.findAll({
    where: {
      [Op.or]: [{ usercd: email }, { usercd: identity }],
    },
    attributes: ["id", "usercd", "sysrolecd"],
  });

  const userPrivileges = await db.query(
    `
  SELECT b.sysprivilegename, max(b.view) view, max(b.crud) crud 
  FROM userrole a
  JOIN sysrole b ON a.sysrolecd = b.sysrolecd
  WHERE a.usercd = :identity
  GROUP BY b.sysprivilegename;
`,
    {
      replacements: { identity: identity },
      type: QueryTypes.SELECT,
    }
  );

  const { accessToken, refreshToken } = generateTokens(
    usercd,
    name,
    email,
    identity,
    firstTime
  );

  await Users.update(
    { refresh_token: refreshToken },
    {
      where: {
        id: usercd,
      },
    }
  );

  return {
    refreshToken,
    accessToken,
    refreshToken,
    user: {
      name,
      email,
      identity,
      firstTime,
      location,
      userModules,
      userRoles,
      userPrivileges,
      // grpMenu
    },
  };
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: {
        [Op.or]: [{ email }, { identity: email }],
      },
    });

    if (!user) {
      res.statusMessage = "User not found";
      return res.status(400).json({ msg: "User not found" });
    }

    if (user.active == "FALSE") {
      res.statusMessage = "User account not found";
      return res.status(400).json({ msg: "User account not active" });
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (hashedPassword !== user.password) {
      return res.status(400).json({ msg: "Wrong Password" });
    }

    const processedUser = await processUser(user, "email");

    res.cookie("refreshToken", processedUser.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ status: "success", ...processedUser });
  } catch (error) {
    console.error(error);
    res.statusMessage = error.message;
    res.status(500).json({ msg: "Login Exception Raised" });
  }
};

export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(204);
    const usercd = user[0].id;
    const userName = user[0].name;
    await Users.update(
      { refresh_token: null },
      {
        where: {
          id: usercd,
        },
      }
    );
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  } catch (error) {
    return res.status(404).json({ msg: "404 Logout Exception Raised " });
  }
};

export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const token = generateOtp();

    const updated = await Users.findOne({
      where: {
        email,
      },
    });
    if (!updated) {
      res.status(404).json({ message: "There is no user with that address" });
    } else {
      await Users.update(
        { refresh_token: token },
        {
          where: {
            email: updated.email,
          },
        }
      );

      const url = `${req.protocol}://${req.get("host")}/newPassword/${token}`;

      await new Email(email, url, token, "").sendPasswordReset();
      res.status(200).json({
        status: "success",
        message: "Token sent to email!",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "There was an error sending the email" });
  }
};

export const newPassword = async (req, res) => {
  const token = req.params.token;

  const user = await Users.findOne({
    where: {
      refresh_token: token,
    },
  });
  if (!user) {
    res.status(400).json({ msg: "Token is invalid or has expired" });
  } else {
    const { password, confPassword } = req.body;
    if (password == "") {
      return res.status(400).json({ msg: "Password cannot be blank" });
    } else if (password !== confPassword) {
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password do not match" });
    } else {
      await Users.update(
        { password: password },
        {
          where: {
            email: user.email,
          },
        }
      );
      res.status(200).json({ msg: "Password Changed" });
    }
  }
};
