import { hashSync } from "bcryptjs";

const usersData = {
  users: [
    {
      name: "Admin",
      email: "admin@email.com",
      password: hashSync("00000", 10),
      role: "admin",
      mobile: "01111111111",
    },
    {
      name: "User 1",
      email: "user1@email.com",
      password: hashSync("11111", 10),
      role: "user",
      mobile: "02222222222",
    },
    {
      name: "User 2",
      email: "user2@email.com",
      password: hashSync("22222", 10),
      role: "user",
      mobile: "03333333333",
    },
    {
      name: "User 3",
      email: "user3@email.com",
      password: hashSync("33333", 10),
      role: "user",
      mobile: "04444444444",
    },
  ],
};

export default usersData;
