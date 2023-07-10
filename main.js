function generateCard(commentData, typeOfCard) {
  console.log(typeOfCard);
  return `
    <div class="${typeOfCard}">
        <div class="vote-section">
        <div class="btn-group">
            <button onClick="updateScore(${commentData.id}, 'increase', '${typeOfCard}')"><img src="./images/icon-plus.svg" alt="icon_plus"></button>
            <p id="score_${typeOfCard}_${commentData.id}">${commentData.score}</p>
            <button onClick="updateScore(${commentData.id}, 'decrease', '${typeOfCard}')"><img src="./images/icon-minus.svg" alt="icon_minus"></button>
            </div>
        </div>
        <div class="card-main-section">
            <div class="info-section">
                <ul>
                    <li><img class="user-image" src="${commentData.user.image.webp}" alt="" srcset=""></li>
                    <li class="user-name">${commentData.user.username}</li>
                    <li>${commentData.createdAt}</li>
                </ul>
                <ul>
              <li><img class="reply-icon" src="./images/icon-reply.svg" alt="" srcset=""> Reply</li>
              </ul>
            </div>
            <div class="comment-section">
                <p>${commentData.content}</p>
            </div>
        </div>
    </div>
    </div>`;
}

function generateReply() {}

function generateLayout() {
  getCommentInformations().then((res) =>
    res.json().then((data) => {
      const commentsBoxEl = document.querySelector(".comments");
      data.comments.forEach((comment, index) => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add(`comment-${index}`);
        commentDiv.innerHTML += generateCard(comment, "comment-card");
        if (comment.replies.length > 0) {
          const repliesDiv = document.createElement("div");
          repliesDiv.classList.add("replies-box");
          comment.replies.forEach((reply) => {
            commentDiv.insertAdjacentElement("beforeend", repliesDiv);
            repliesDiv.innerHTML += generateCard(reply, "reply-card");
          });
        }
        commentsBoxEl.insertAdjacentElement("beforeend", commentDiv);
      });
    })
  );
}

function checkUser() {}

async function getCommentInformations() {
  return fetch("./data.json");
}

function onInit() {
  getCommentInformations().then((res) =>
    res.json().then((data) => {
      localStorage.setItem("comments", JSON.stringify(data.comments));
      localStorage.setItem("currentUser", JSON.stringify(data.currentUser));
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
function getComments() {
  return JSON.parse(localStorage.getItem("comments"));
}
function setComments(comments) {
  return localStorage.setItem("comments", JSON.stringify(comments));
}

function findCommentById(comments, id) {
  return comments.find((comment) => comment.id === id);
}

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

function saveReplyToLocalStorage(id, reply) {}

generateLayout();
onInit();
