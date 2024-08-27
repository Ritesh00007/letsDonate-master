const usersList = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = usersList.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Missing room and username' };
  //if(existingUser) return { error: 'name is not available' };
  console.log("name is", name);
  console.log("id is", id);
  console.log("room is", room);

  const newUser = { id, name, room };

  usersList.push(newUser);
  console.log("newUser", newUser);
  return { newUser };
}

const removeUser = (id) => {
  const position = usersList.findIndex((user) => user.id === id);

  if(position !== -1) return usersList.splice(position, 1)[0];
}

const getUser = (id) => usersList.find((user) => user.id === id);

const getUsersInRoom = (room) => usersList.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };