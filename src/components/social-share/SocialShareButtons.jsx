"use client";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

export default function SocialShareButtons({ property }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className='text-xl font-bold text-center pt-2'>
        Share this property:
      </h3>
      <div className='flex gap-3 justify-center pb-5'>
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`#${property.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=' :: '
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
      </div>
    </>
  );
}
