import { useEffect, useState } from "react";
import Post from "../Post/Post";
import { addDoc, collection, getDocs } from "firebase/firestore";
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
    setPosts(data.docs.map((doc) => ({ ...doc.data(), docId: doc.id })));
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
      dateCreated: Date.now(),
      userId: user.uid,
    });
  };
  return (
    <div className="container col-span-2">
      {posts.length ? (
        posts.map((post) => {
          return (
            <Post
              authorUsername={post.authorUsername}
              docId={post.docId}
              totalLikes={post.likes.length}
              likedPhoto={post.userLikedPhoto}
              description={post.description}
              comments={post.comments}
              posted={post.dateCreated}
            />
          );
        })
      ) : (
        <Skeleton count={1} width={640} height={400} className="mb-5" />
      )}
    </div>
  );
};

export default Feed;
