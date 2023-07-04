function generateCard(commentData, typeOfCard) {
  return `
    <div class="${typeOfCard}">
        <div class="vote-section">
        <div class="btn-group">
            <button><img src="./images/icon-plus.svg" alt="icon_plus"></button>
            <p>${commentData.score}</p>
            <button><img src="./images/icon-minus.svg" alt="icon_minus"></button>
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
            repliesDiv.innerHTML += generateCard(reply, "comment-card");
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

generateLayout();
