import { Avatar } from "@mui/material";
import React, { forwardRef } from "react";
import InputOption from "../InputOption/InputOption";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HeaderPost from "./HeaderPost";
import ImagePost from "./ImagePost";
import ActionsPost from "./ActionsPost";
import { useRef } from "react";
import FooterPost from "./FooterPost";
import CommentPost from "./CommentPost";
const Post = ({
  authorUsername,
  docId,
  totalLikes,
  likedPhoto,
  description,
  comments,
  posted,
}) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-16">
      <HeaderPost authorUsername={authorUsername} />
      <ImagePost />
      <ActionsPost
        docId={docId}
        totalLikes={totalLikes}
        likedPhoto={likedPhoto}
        handleFocus={handleFocus}
      />
      <FooterPost description={description} authorUsername={authorUsername} />
      <CommentPost
        docId={docId}
        comments={comments}
        posted={posted}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Post;
// const Post = forwardRef(({ name, description, message, photoUrl }, ref) => {
//   return (
//     <div ref={ref} className="post">
//       <div className="post_header">
//         <div className="post_left">
//           <Avatar src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" />
//           <div className="post_info">
//             <h2>{name}</h2>
//             <p>{description}</p>
//           </div>
//         </div>

//         <MoreHorizIcon />
//       </div>
//       <div className="post_body">
//         <p>{message}</p>
//         <img
//           src="https://celebrityaccess.com/wp-content/uploads/2018/10/instagram.jpg"
//           alt=""
//         />
//       </div>
//       <div className="post_buttons">
//         <InputOption Icon={ThumbUpOffAltIcon} title="Like" color="gray" />

//         <InputOption Icon={ChatOutlinedIcon} title="Comments" color="gray" />
//         <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
//       </div>
//     </div>
//   );
// });

// export default Post;
