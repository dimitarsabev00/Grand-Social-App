import { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import "./Feed.css";
import InputOption from "../InputOption/InputOption";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from "../Post/Post";
import FlipMove from "react-flip-move";
import {
  addDoc,
  collection,
  Timestamp,
  onSnapshot,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "../../configs/firebase";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";
const Feed = () => {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const user = useSelector(selectUser);

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setInput("");
    await addDoc(postsCollectionRef, {
      authorUsername: user.username,
      description: input,
      likes: [],
      comments: [],
      userLikedPhoto: false,
      imageUrl: "",
      dateCreated: Timestamp.now().toDate().toDateString(),
    });
  };
  return (
    <div className="container col-span-2">
      {posts.length ? (
        posts.map((post) => {
          return (
            <Post
              authorUsername={post.authorUsername}
              docId={post.id}
              totalLikes={post.likes.length}
              likedPhoto={post.userLikedPhoto}
            />
          );
        })
      ) : (
        <Skeleton count={1} width={640} height={400} className="mb-5" />
      )}
    </div>
  );
  // return (
  //   <div className="feed">
  //     <div className="feed_inputContainer">
  //       <div className="feed_input">
  //         <img
  //           src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
  //           alt=""
  //         />
  //         <form onSubmit={handleCreatePost}>
  //           <input
  //             value={input}
  //             type="text"
  //             placeholder="Start a post"
  //             onChange={(e) => {
  //               setInput(e.target.value);
  //             }}
  //           />
  //           <button type="submit">Send</button>
  //         </form>
  //       </div>
  //       <div className="feed_inputOptions">
  //         <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9" />
  //         <InputOption Icon={SubscriptionsIcon} title="Video" color="#e7a33e" />
  //         <InputOption Icon={EventNoteIcon} title="Event" color="#c0cbcd" />
  //         <InputOption
  //           Icon={CalendarViewDayIcon}
  //           title="Write article"
  //           color="#7fc15e"
  //         />
  //       </div>
  //     </div>
  //     <FlipMove>
  //       {posts &&
  //         posts.map(({ id, name, createdAt, message }) => {
  //           return (
  // <Post
  //   key={id}
  //   name={name}
  //   description={createdAt}
  //   message={message}
  // />
  //           );
  //         })}
  //     </FlipMove>
  //   </div>
  // );
};

export default Feed;
