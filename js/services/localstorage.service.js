function getComments() {
  return JSON.parse(localStorage.getItem("comments"));
}

function setComments(comments) {
  return localStorage.setItem("comments", JSON.stringify(comments));
}

//save data to local storage on init
function saveCurrentUser(currentUserData) {
  localStorage.setItem("currentUser", JSON.stringify(currentUserData));
}
function saveComments(commentsData) {
  localStorage.setItem("comments", JSON.stringify(commentsData));
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

export {
  getComments,
  setComments,
  saveCurrentUser,
  saveComments,
  getCurrentUser,
};
