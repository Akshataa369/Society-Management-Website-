import bcrypt from "bcryptjs";

const plainPassword = "12345678"; // The password user will enter
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds).then((hash) => {
  console.log("New Hashed Password:", hash);
});
