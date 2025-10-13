'use client';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  RedditShareButton,
  TelegramShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
  RedditIcon,
  TelegramIcon
} from 'react-share';

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  const propertyTypeSlug = property?.type
    ? property.type.replace(/\s/g, '')
    : 'Property';

  return (
    <>
      <h3 className="text-xl font-bold text-center">Share This Property</h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${propertyTypeSlug}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`#${propertyTypeSlug}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator="::"
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property listing: ${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>

        <RedditShareButton url={shareUrl} title={property.name}>
          <RedditIcon size={40} round={true} />
        </RedditShareButton>

        <TelegramShareButton url={shareUrl} title={property.name}>
          <TelegramIcon size={40} round={true} />
        </TelegramShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
