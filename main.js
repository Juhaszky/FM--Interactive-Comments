import {
  saveCurrentUser,
  saveComments,
} from "./js/services/localstorage.service.js";
import { generateLayout } from "/js/generate-layout/layout.js";
import { fetchComments } from "./js/services/comment.service.js";

function onInit() {
  fetchComments().then((res) =>
    res.json().then((data) => {
      const comments = data.comments;
      saveCurrentUser(data.currentUser);
      saveComments(comments);
      generateLayout(comments);
    })
  );
}

function addReply(id, reply) {
  const comment = getCommentById(id);
  comment.replies.push(reply);
}

function showDeleteBtn(user) {
  const currentUser = getCurrentUser();
  if (currentUser.username === user.username) {
    document.getElementById("deleteBtn").style.display = "";
  }
}

function saveReplyToLocalStorage(id, reply) {}

onInit();
