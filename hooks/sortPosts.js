import { useState, useEffect } from "react";

export const useSortPosts = (posts) => {
  const [sortPosts, setSortPosts] = useState([]);

  useEffect(() => {
    sortPostsByCreatedDate(posts);
  }, [posts]);

  const sortPostsByCreatedDate = (allPosts) => {
    let result = [...allPosts].sort((prev, next) => {
      if (prev.timeOfCreation < next.timeOfCreation) {
        return 1;
      } else return -1;
    });
    console.log("SORTED-POSTS", result);
    setSortPosts(result);
    return result;
  };

  return sortPosts;
};
