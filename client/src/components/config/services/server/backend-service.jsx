import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { logoutR } from "../../../../store/reducers/authReducer";
import { useAuth } from "../../hooks/context/authProvider";
import BaseURL from "./backendUrl";

const baseURL = `${BaseURL.BACKEND_SERVER_URL}/api/v2`;

const useBackendService = (endpoint, method, options) => {
  const { token } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = baseURL + endpoint;

  const backendService = async (payload, config = {}) => {
    const lowerCaseMethod = method.toLowerCase();

    const headers = {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    };

    if (payload instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    config.headers = headers;

    switch (lowerCaseMethod) {
      case "get":
        return axios
          .get(url, { params: payload, ...config })
          .then((res) => res.data);
      case "post":
        return axios.post(url, payload, config).then((res) => res.data);
      case "put":
        return axios.put(url, payload, config).then((res) => res.data);
      case "delete":
        return axios
          .delete(url, { data: payload, ...config })
          .then((res) => res.data);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  };

  const enhancedOptions = {
    ...options,
    onError: (error) => {
      if (!navigator.onLine) {
        toast.error(
          "No internet connection. Please check your network and try again."
        );
        return;
      }

      const errorMessage = error.response?.data?.message?.toLowerCase();
      if (errorMessage && errorMessage.includes("unauthorized")) {
        // toast.error('Session expired. Please log in again.')
        dispatch(logoutR());
        navigate("/login");
        return;
      }

      if (options.onError) {
        options.onError(error);
      }
    },
  };

  return useMutation(backendService, enhancedOptions);
};

export default useBackendService;
