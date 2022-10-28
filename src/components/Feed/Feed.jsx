import { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import "./Feed.css";
import InputOption from "../InputOption/InputOption";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from "../Post/Post";
import {
  addDoc,
  collection,
  getDocs,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../configs/firebase";
const Feed = () => {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);
  const handleCreatePost = async (e) => {
    e.preventDefault();
    const newDoc = {
      name: "Dimitar Sabev(ADMIN)",
      message: input,
      photoUrl: "",
      createdAt: Timestamp.now().toDate().toDateString(),
    };
    await addDoc(postsCollectionRef, newDoc);
    setInput("");
    window.location.reload();
  };
  return (
    <div className="feed">
      <div className="feed_inputContainer">
        <div className="feed_input">
          <CreateIcon />
          <form onSubmit={handleCreatePost}>
            <input
              value={input}
              type="text"
              placeholder="Start a post"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="feed_inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#e7a33e" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#c0cbcd" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7fc15e"
          />
        </div>
      </div>
      {posts &&
        posts.map((post) => {
          return (
            <Post
              key={post.id}
              name={post.name}
              description={post.createdAt}
              message={post.message}
            />
          );
        })}
    </div>
  );
};

export default Feed;
