import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";
const SocialMediaShare = ({ url, title }) => {
  return (
    <div className="mx-5 flex flex-row justify-between">
      <a
        className="mx-3"
        target="_blank"
        rel="noreferrer"
        href={`https://api.whatsapp.com/send/?text=${url}`}
      >
        <WhatsappIcon size={30} />
      </a>
      <TwitterShareButton title={title} url={url} className="mx-2">
        <TwitterIcon size={30} round />
      </TwitterShareButton>
    </div>
  );
};

export default SocialMediaShare;