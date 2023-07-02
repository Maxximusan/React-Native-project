import {
  updateDoc,
  increment,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firestoreDB } from "../firebase/config";

export const addLike = async (posts, id, userId) => {
 
  const likesRef = doc(firestoreDB, "posts", id);

  posts?.map((post) => {
    if (post.id === id) {
      if (!post.likes.includes(userId)) {
        updateDoc(likesRef, {
          likesNumber: increment(1),
          likes: arrayUnion(userId),
        });
      } else {
        updateDoc(likesRef, {
          likesNumber: increment(-1),
          likes: arrayRemove(userId),
        });
      }
    }
  });
};

export const likedPosts = (posts, userId) => {
  const newPostsArray = posts?.map((post) => {
    if (post.likes.includes(userId)) {
      return { ...post, isLiked: true };
    } else return post;
  });

  return newPostsArray;
};
