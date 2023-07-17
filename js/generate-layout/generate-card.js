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

function fillCommentsEl(commentEl) {
  const commentsEl = document.querySelector(".comments");
  commentsEl.appendChild(commentEl);
}

function generateBasicCard(comment, typeOfCard) {
  const cardEl = document.createElement("div");
  const commentEl = document.createElement("div");
  commentEl.appendChild(generateVoteSection(comment.score));
  cardEl.appendChild(commentEl);
  commentEl.appendChild(generateMainSection(comment));
  cardEl.classList.add("comment_" + comment.id);
  commentEl.classList.add(typeOfCard);
  return cardEl;
}

function generateCommentsEl() {
  const commentsEl = document.createElement("div");
  commentsEl.classList.add("comments");
  document.querySelector("main").appendChild(commentsEl);
}

function generateVoteSection(score) {
  const voteSectionEl = document.createElement("div");
  const btnGroupEl = document.createElement("div");
  const scoreEl = document.createElement("p");
  scoreEl.textContent = score;
  voteSectionEl.appendChild(btnGroupEl);
  btnGroupEl.appendChild(generateBtn("./images/icon-plus.svg"));
  btnGroupEl.appendChild(scoreEl);
  btnGroupEl.appendChild(generateBtn("./images/icon-minus.svg"));
  //classes
  voteSectionEl.classList.add("vote-section");
  btnGroupEl.classList.add("btn-group");

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

function generateInfoSection(comment) {
    const infoSectionEl = document.createElement("div");

    const ulEl = infoSectionList(comment);
    infoSectionEl.appendChild(ulEl);
    infoSectionEl.classList.add("info-section");

    return infoSectionEl;
}
function infoSectionList(comment) {
    const uListEL = document.createElement("ul");
    const liEl = document.createElement("li");
    const imgEl = document.createElement("img");
    imgEl.src = comment.user.image.webp
    imgEl.classList.add("user-image");
    liEl.appendChild(imgEl);
    uListEL.appendChild(liEl);

    return uListEL;
}

function generateBtn(imgPath) {
  const btn = document.createElement("button");
  const img = document.createElement("img");
  img.src = imgPath;
  btn.appendChild(img);
  return btn;
}

export {
  generateBasicCard,
  generateRepliesBox,
  fillRepliesBox,
  generateCommentsEl,
  fillCommentsEl,
};
