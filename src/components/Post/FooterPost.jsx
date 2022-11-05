import React from "react";

const FooterPost = ({ description, authorUsername }) => {
  return (
    <div className="p-4 pt-2 pb-0">
      <span className="mr-1 font-bold">{authorUsername}</span>
      <span>{description}</span>
    </div>
  );
};

export default FooterPost;
