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

  const shareUrl = window.location.href;
  const title = 'Check out this random image!';

  useEffect(() => {
    if (imageUrl) {
      const metaTags = document.getElementsByTagName('meta');
      for (let i = 0; i < metaTags.length; i++) {
        if (metaTags[i].getAttribute('property') === 'og:image') {
          metaTags[i].setAttribute('content', imageUrl);
        }
      }
    }
  }, [imageUrl]);

  return (
    <div className="image-display">
      <Helmet>
        <meta property="og:title" content="Random Image App" />
        <meta property="og:description" content="Check out this random image!" />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Random" />
          <div className="share-buttons">
            <FacebookShareButton quote={title} url={shareUrl}>
              <FontAwesomeIcon icon={faFacebookF} />
              <span>Share on Facebook</span>
            </FacebookShareButton>
            <TwitterShareButton title={title} url={shareUrl}>
              <FontAwesomeIcon icon={faTwitter} />
              <span>Share on Twitter</span>
            </TwitterShareButton>
            <WhatsappShareButton title={title} url={shareUrl}>
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
