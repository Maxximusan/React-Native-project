import { useState, useEffect } from "react";

export const useSortComments = (posts) => {
  const [sortComments, setSortComments] = useState([]);

  useEffect(() => {
    sortCommentsByCreatedDate(posts);
  }, [posts]);

  const sortCommentsByCreatedDate = (allComments) => {
    let result = [...allComments].sort((prev, next) => {
      if (prev.timeOfCreation > next.timeOfCreation) {
        return 1;
      } else return -1;
    });
    console.log("SORTED-POSTS", result);
    setSortComments(result);
    return result;
  };

  return sortComments;
};
