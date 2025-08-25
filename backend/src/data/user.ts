import { NotFoundError } from "@/utils/errors";

let users = [
  { id: 1, name: "topher1" },
  { id: 2, name: "topher2" },
  { id: 3, name: "topher3" },
  { id: 4, name: "topher4" },
];

export function getUsersData() {
  return users;
}

export function getUserData(id: number) {
  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
}

export function createUserData(payload: { name: string }) {
  const newUser = {
    id: users.length + 1,
    name: payload.name,
  };

  users.push(newUser);
  return newUser;
}

export function deleteUserData(id: number) {
  const deletedUser = users.find((user) => user.id === id);

  if (!deletedUser) {
    throw new NotFoundError("User not found");
  }
  users = users.filter((user) => user.id !== id);
  return deletedUser;
}

export function updateUserData(id: number, payload: { name: string }) {
  const updatedUser = users.find((user) => user.id === id);
  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }

  updatedUser.name = payload.name;
  return updatedUser;
}
