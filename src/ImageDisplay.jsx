import { faFacebookF, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import './ImageDisplay.css';
import RandomImage from './RandomImage';

const ImageDisplay = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const randomImage = new RandomImage('https://picsum.photos/200');
    getRandomImage(randomImage);
  }, []);

  const getRandomImage = async (randomImage) => {
    const imageUrl = await randomImage.getRandomImage();
    setImageUrl(imageUrl);
  };

  

  useEffect(() => {
    if (imageUrl) {
      const helmet = Helmet.peek();
      helmet.metaTags.push({ property: 'og:image', content: imageUrl });
    }
  }, [imageUrl]);

  return (
    <div className="image-display">
      <Helmet>
        <meta property="og:title" content="Random Image App" />
        <meta property="og:description" content="Check out this random image!" />
      </Helmet>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Random" />
          <div className="share-buttons">
            <FacebookShareButton url={imageUrl}>
              <FontAwesomeIcon icon={faFacebookF} />
              <span>Share on Facebook</span>
            </FacebookShareButton>
            <TwitterShareButton url={imageUrl}>
              <FontAwesomeIcon icon={faTwitter} />
              <span>Share on Twitter</span>
            </TwitterShareButton>
            <WhatsappShareButton url={imageUrl}>
              <FontAwesomeIcon icon={faWhatsapp} />
              <span>Share on WhatsApp</span>
            </WhatsappShareButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
