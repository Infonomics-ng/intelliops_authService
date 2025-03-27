import React, { useEffect } from 'react';
import { useState } from 'react';

const IMAGES = [
  'https://i0.wp.com/www.promosinnigeria.com/wp-content/uploads/2022/11/mtn-nigeria-Graduate-developement-programme.jpg',
  'https://alitech.com.ng/wp-content/uploads/2023/02/IMG_20230214_122201_668.jpg',
  'https://i0.wp.com/www.promosinnigeria.com/wp-content/uploads/2022/09/MTN-Nigeria-Family-Game-Show.jpg',
  'https://pbs.twimg.com/media/FQNYBccX0AMeIVO.jpg',
  'https://pbs.twimg.com/media/FWaZ-MPXgAE9czb.jpg',
  'https://marketingedge.com.ng/wp-content/uploads/2021/07/MTN-Lucky-Number-BN-2.jpeg',
  'https://blogger.googleusercontent.com/img/a/AVvXsEhPpYnOi2m0GPb3BFmFmEkMBAVanNssur19bFS5vyY7nVxtBmStFE5pmpsAxGNo_glYUD3aeWhpKvLjgmYNGDK8D8J2ZIOrBNMtjIcpa1jiRkcK5gUWKLljGzAqyvJDh3xWxRXFAtRIk2wXurwsZKE1ZzWLunMFXrYItD26FJSMr0k_6MNk1VurOml_=s16000',
];

function AdImages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % IMAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div>
      <img
        className="object-cover object-center w-full h-full"
        src={IMAGES[currentImageIndex]}
        alt="cycle-through-images"
        width="760"
        height="1024"
      />
    </div>
  );
}

export default AdImages;
