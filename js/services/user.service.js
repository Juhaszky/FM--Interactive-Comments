import { getCurrentUser } from "./localstorage.service.js";

function checkLoggedUser(username) {
  const currentUser = getCurrentUser();
  if (username === currentUser.username) {
    return true;
  }
}

export { checkLoggedUser };
