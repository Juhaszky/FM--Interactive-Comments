import {
    generateBasicCard,
    generateRepliesBox,
    fillRepliesBox,
    generateCommentsEl,
    fillCommentsEl,
  } from "/js/generate-layout/generate-card.js";

function generateLayout(comments) {
  if (comments.length > 0) {
    generateCommentsEl();
  }
  comments.forEach((comment) => {
    const commentCard = generateBasicCard(comment, "comment-card");
    fillCommentsEl(commentCard);
    if (comment.replies.length > 0) {
      generateRepliesBox(comment.id);
      comment.replies.forEach((reply) => {
        const replyEl = generateBasicCard(reply, "reply-card");
        fillRepliesBox(replyEl);
      });
    }
  });
}

function refreshHtmlScore(score, id, typeOfCard) {
  const scoreEl = document.getElementById(`score_${typeOfCard}_${id}`);
  if (scoreEl) scoreEl.textContent = score;
}

export { generateLayout, refreshHtmlScore }