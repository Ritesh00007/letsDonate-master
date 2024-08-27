// dummy values
let currentUser =
{
  "name": "nouser",
  "email": "noemail@email.com",
  "zipcode": "12345"
};

// need to add logic to check if input is valid

// gets current user
exports.getUser = function () {
  if (JSON.parse(sessionStorage.getItem(currentUser)) == null) // if for some reason the variable is empty, set it again
  {
    sessionStorage.setItem(currentUser, JSON.stringify(currentUser));
  }

  return JSON.parse(sessionStorage.getItem(currentUser));
};

// sets the current user after logging in
exports.setUser = function (user) {
  sessionStorage.setItem(currentUser, JSON.stringify(user));
};

// if user logs out, set back to dummy variable
exports.setUserLogout = function() {
  sessionStorage.setItem(currentUser, JSON.stringify(currentUser));
};