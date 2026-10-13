import { hashSync } from "bcryptjs";

const usersData = {
  users: [
    {
      name: "Admin",
      email: "admin@email.com",
      password: hashSync("00000", 10),
      role: "admin",
    },
    {
      name: "User 1",
      email: "user1@email.com",
      password: hashSync("11111", 10),
      role: "user",
    },
    {
      name: "User 2",
      email: "user2@email.com",
      password: hashSync("22222", 10),
      role: "user",
    },
    {
      name: "User 3",
      email: "user3@email.com",
      password: hashSync("33333", 10),
      role: "user",
    },
  ],
};

export default usersData;
