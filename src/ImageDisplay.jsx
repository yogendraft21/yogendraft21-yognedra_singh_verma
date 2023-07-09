import { faFacebookF, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
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

  const shareUrl = window.location.href;
  const title = 'Check out this random image!';

  return (
    <div className="image-display">
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Random" />
          <div className="share-buttons">
            <FacebookShareButton url={shareUrl} quote={title} media={imageUrl}>
              <FontAwesomeIcon icon={faFacebookF} />
              <span>Share on Facebook</span>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title} media={imageUrl}>
              <FontAwesomeIcon icon={faTwitter} />
              <span>Share on Twitter</span>
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl} title={title} media={imageUrl}>
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
