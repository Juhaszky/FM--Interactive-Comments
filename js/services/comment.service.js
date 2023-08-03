import { getComments, setComments } from './localstorage.service.js';
import { refreshHtmlScore } from '../generate-layout/layout.js';


let replies;

function fetchComments() {
  return fetch("./data.json").then((replies) => replies = replies);
}



function updateScore(commentId, type, typeOfCard) {
  const comments = getComments();
  let data;
  if (typeOfCard === "comment-card") {
    data = findCommentById(comments, commentId);
  } else {
    data = findReplyById(comments, commentId);
  }
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

function findReplyById(comments, id) {
  let reply;
  comments.forEach((comment) => {
    if (comment.replies.length > 0) {
      reply = comment.replies.find((reply) => reply.id === id);
    }
  });
  return reply;
}
function findCommentById(comments, id) {
  return comments.find((comment) => comment.id === id);
}


export { updateScore, fetchComments };