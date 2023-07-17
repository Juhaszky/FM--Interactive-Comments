import { getComments, setComments, saveCurrentUser, saveComments } from './js/services/localstorage.service.js'
import { generateBasicCard, generateRepliesBox, fillRepliesBox, generateCommentsEl, fillCommentsEl} from './js/generate-layout/generate-card.js'


function generateLayout(comments) {
  if (comments.length > 0) { 
    generateCommentsEl();
  }
  comments.forEach((comment) => {
    const commentCard = generateBasicCard(comment ,"comment-card");
    fillCommentsEl(commentCard);
    if (comment.replies.length > 0) {
      generateRepliesBox(comment.id);
      comment.replies.forEach((reply) => {
        const replyEl = generateBasicCard(reply, "reply-card");
        fillRepliesBox(replyEl);
      });
    }
  });
  /*getCommentInformations().then((res) =>
    res.json().then((data) => {
      const commentsBoxEl = document.querySelector(".comments");
      data.comments.forEach((comment, index) => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add(`comment-${index}`);
        commentDiv.innerHTML += generateCard(comment, "comment-card");
        console.log(comment);
        
        if (comment.replies.length > 0) {
          const repliesDiv = document.createElement("div");
          repliesDiv.classList.add("replies-box");
          comment.replies.forEach((reply) => {
            commentDiv.insertAdjacentElement("beforeend", repliesDiv);
            repliesDiv.innerHTML += generateCard(reply, "reply-card");
            //showDeleteBtn(reply.username);
          });
        }
        commentsBoxEl.insertAdjacentElement("beforeend", commentDiv);
        //showDeleteBtn(comment.user.username);
      });
    })
  );*/
}


async function getCommentInformations() {
  return fetch("./data.json");
}

function onInit() {
  getCommentInformations().then((res) =>
    res.json().then((data) => {
      const comments = data.comments;
      console.log(comments);
      saveCurrentUser(data.currentUser);
      saveComments(comments);
      generateLayout(comments)
    })
  );
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

function refreshHtmlScore(score, id, typeOfCard) {
  const scoreEl = document.getElementById(`score_${typeOfCard}_${id}`);
  if (scoreEl) scoreEl.textContent = score;
}

//Comment functions
/*function getComments() {
  return JSON.parse(localStorage.getItem("comments"));
}
function setComments(comments) {
  return localStorage.setItem("comments", JSON.stringify(comments));
}

function findCommentById(comments, id) {
  return comments.find((comment) => comment.id === id);
}*/

//Reply functions

function addReply(id, reply) {
  const comment = getCommentById(id);
  comment.replies.push(reply);
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

function showDeleteBtn(user) {
  const currentUser = getCurrentUser();
  console.log(user);
  console.log(currentUser);
  if (currentUser.username === user.username) {
    document.getElementById('deleteBtn').style.display = '';
  }
}

function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

function saveReplyToLocalStorage(id, reply) {}

onInit();
