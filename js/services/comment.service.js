import { getComments, setComments } from "./localstorage.service.js";
import { refreshHtmlScore } from "../generate-layout/layout.js";

let comments;

function fetchComments() {
  return fetch("./data.json").then((commentData) => (comments = commentData));
}

function updateScore(commentId, type, typeOfCard) {
  const comments = getComments();
  let data = findCommentById(comments, commentId);
  if (data) {
    if (type === "increase") {
      data.score++;
    } else if (type === "decrease") {
      if (data.score > 0) data.score--;
    }
    refreshHtmlScore(data.score, commentId, typeOfCard);
    setComments(comments);
  }
}

/*function findReplyById(comments, id) {
  let reply;
  comments.forEach((comment) => {
    if (comment.replies.length > 0) {
      reply = comment.replies.find((reply) => reply.id === id);
    }
  });
  return reply;
}*/

function findCommentById(comments, id) {
  let comment;
  comments.forEach((commentData) => {
    console.log(id);
    if (commentData.id === id) {
      comment = commentData;
    } else if (commentData.replies.length > 0) {
      commentData.replies.forEach((reply) => {
        if (reply.id === id) {
          comment = reply;
        }
      });
    }
  });
  console.log(comment);
  return comment;
}
function deleteComment(commentId) {
  const comments = getComments();
  comments.forEach((comment, idx) => {
    if (comment.id == commentId) {
      console.log("alma");
    }
  });
  console.log(commentId, "comment deleted");
}

export { updateScore, fetchComments, deleteComment };
