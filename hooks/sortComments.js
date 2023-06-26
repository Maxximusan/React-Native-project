import { useState, useEffect } from "react";

export const useSortComments = (comments) => {
  const [sortComments, setSortComments] = useState([]);

  useEffect(() => {
    sortCommentsByCreatedDate(comments);
  }, [comments]);

  const sortCommentsByCreatedDate = (allComments) => {
    let result = [...allComments].sort((prev, next) => {
      if (prev.timeOfCreation > next.timeOfCreation) {
        return 1;
      } else return -1;
    });
    console.log("SORTED-coments", result);
    setSortComments(result);
    return result;
  };

  return sortComments;
};
