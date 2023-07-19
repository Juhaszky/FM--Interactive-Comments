/*<div class="${typeOfCard}">
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
      <li id="deleteBtn"><img class="garbage-icon" src="./images/icon-delete.svg" alt="" srcset=""> Delete</li>
      <li><img class="reply-icon" src="./images/icon-reply.svg" alt="" srcset=""> Reply</li>
      </ul>
    </div>
    <div class="comment-section">
        <p>${commentData.content}</p>
    </div>
</div>
</div>
</div>*/
import { updateScore } from "../services/comment.service.js";
import { refreshHtmlScore } from "./layout.js"

function fillCommentsEl(commentEl) {
  const commentsEl = document.querySelector(".comments");
  commentsEl.appendChild(commentEl);
}

function generateBasicCard(comment, typeOfCard) {
  const cardEl = document.createElement("div");
  const commentEl = document.createElement("div");
  commentEl.appendChild(generateVoteSection(comment, typeOfCard));
  cardEl.appendChild(commentEl);
  commentEl.appendChild(generateMainSection(comment));
  commentEl.appendChild(generateCommentSection(comment));
  cardEl.classList.add("comment_" + comment.id);
  commentEl.classList.add(typeOfCard);
  return cardEl;
}

function generateCommentsEl() {
  const commentsEl = document.createElement("div");
  commentsEl.classList.add("comments");
  document.querySelector("main").appendChild(commentsEl);
}

function generateVoteSection(comment, typeOfCard) {
  const voteSectionEl = document.createElement("div");
  const btnGroupEl = document.createElement("div");
  const scoreEl = document.createElement("p");
  scoreEl.id = `score_${typeOfCard}_${comment.id}`;
  scoreEl.textContent = comment.score;
  voteSectionEl.classList.add("vote-section");
  voteSectionEl.appendChild(btnGroupEl);
  btnGroupEl.classList.add("btn-group");
  btnGroupEl.appendChild(
    generateBtn("./images/icon-plus.svg", comment.id, typeOfCard, "increase")
  );
  btnGroupEl.appendChild(scoreEl);
  btnGroupEl.appendChild(
    generateBtn("./images/icon-minus.svg", comment.id, typeOfCard, "decrease")
  );
  //classes

  return voteSectionEl;
}

function generateRepliesBox(id) {
  const commentEl = document.querySelector(`.comment_${id}`);
  const repliesBoxEl = document.createElement("div");
  commentEl.appendChild(repliesBoxEl);
  //class
  repliesBoxEl.classList.add("replies-box");
}
function fillRepliesBox(replyEl) {
  const repliesBoxEl = document.querySelector(".replies-box");
  repliesBoxEl.appendChild(replyEl);
}
function generateMainSection(comment) {
  const mainSectionEl = document.createElement("div");
  mainSectionEl.appendChild(generateInfoSection(comment));
  mainSectionEl.classList.add("card-main-section");
  return mainSectionEl;
}
function generateCommentSection(comment) {
  const commentEl = document.createElement("div");
  commentEl.classList.add("comment-section");
  const commentParagraph = document.createElement("p");
  commentParagraph.textContent = comment.content;
  commentEl.appendChild(commentParagraph);

  return commentEl;
}

function generateInfoSection(comment) {
  const infoSectionEl = document.createElement("div");

  const ulEl = infoSectionList(comment);
  const ulActionList = actionList(comment);
  infoSectionEl.appendChild(ulEl);
  infoSectionEl.appendChild(ulActionList);
  infoSectionEl.classList.add("info-section");

  return infoSectionEl;
}
function infoSectionList(comment) {
  const uListEL = document.createElement("ul");
  const userImgLiEl = document.createElement("li");
  const userNameLiEl = document.createElement("li");
  const createdAtLiEl = document.createElement("li");
  const imgEl = document.createElement("img");
  imgEl.src = comment.user.image.webp;
  imgEl.classList.add("user-image");
  userImgLiEl.appendChild(imgEl);
  userNameLiEl.classList.add("user-name");
  userNameLiEl.textContent = comment.user.username;
  createdAtLiEl.textContent = comment.createdAt;

  uListEL.appendChild(userImgLiEl);
  uListEL.appendChild(userNameLiEl);
  uListEL.appendChild(createdAtLiEl);
  return uListEL;
}

function actionList(comment) {
  const ulListEl = document.createElement("ul");
  const liListEl = document.createElement("li");
  const liDeleteBtnEl = document.createElement("button");
  liDeleteBtnEl.id = "deleteBtn";
  liDeleteBtnEl.classList.add("garbage-icon");
  liDeleteBtnEl.src = "./images/icon-delete.svg";
  liDeleteBtnEl.textContent = "Delete";
  liListEl.appendChild(liDeleteBtnEl);
  ulListEl.appendChild(liListEl);

  const liReplyLiEl = document.createElement("li");
  const liReplyBtnEl = document.createElement("button");
  liReplyBtnEl.classList.add("reply-icon");
  const img = document.createElement("img");
  img.src = "./images/icon-reply.svg";
  img.classList.add("reply-icon");
  liReplyLiEl.appendChild(img);
  liReplyLiEl.appendChild(liReplyBtnEl);
  liReplyBtnEl.textContent = "Reply";

  ulListEl.appendChild(liReplyLiEl);

  return ulListEl;
}
function generateBtn(imgPath, commentId, typeOfCard, action) {
  const btn = document.createElement("button");
  const img = document.createElement("img");
  img.src = imgPath;
  btn.addEventListener("click", () => {
    updateScore(commentId, action, typeOfCard);
  });
  btn.appendChild(img);
  return btn;
}



export {
  generateBasicCard,
  generateRepliesBox,
  fillRepliesBox,
  generateCommentsEl,
  fillCommentsEl,
  actionList,
  generateCommentSection
};
