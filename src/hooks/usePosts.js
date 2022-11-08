import { useState, useEffect } from "react";
import { getPosts } from "../services/firebase";

export default function usePosts(user) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function getFeedPosts() {
      if (user?.following?.length > 0) {
        const followedUserPosts = await getPosts(user.userId, user.following);
        // re-arrange array to be newest photos first by dateCreated
        followedUserPosts.sort((a, b) => b.dateCreated - a.dateCreated);
        setPosts(followedUserPosts);
      }
    }

    getFeedPosts();
  }, [user?.userId, user?.following]);

  return { posts };
}
