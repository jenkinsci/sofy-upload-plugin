const utils = require("../lib/utils");

const { User } = require("../models");

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw Error("No user exists against this email address");
  }

  const isValid = user.password === password;

  // const isValid = utils.validPassword(
  //   password,
  //   "DB password here",
  //   "password salt here"
  // );

  if (!isValid) {
    throw Error("Invalid credentials");
  }

  const { token } = utils.issueJWT({
    userId: user.UserID,
    userGUID: user.UserGUID,
    name: `${user.FirstName} ${user.LastName}`,
    email: user.Email,
  });

  delete user.password;

  return { user, token };
};

// const register = async () => {
//   try {
//     debugger;
//     const user = await User.create({
//       firstName: "Taha",
//       lastName: "Muhammad",
//       email: "taha@sofy.ai",
//       password:
//         "fb0f42dddf3c12db9ca83ac7f09ad6a1245994c839b5112698252f7f2e179df236191fd3c9231d73ae94b41cf88c6adf2b45f9e931ef1537887bfc4b4ee6b32f",
//     });
//     debugger;
//   } catch (error) {
//     debugger;
//   }
// };

// setTimeout(() => {
//   register();
// }, 5000);

// const register = async (password) => {
// const { salt, hash } = utils.genPassword(password);
// return {
//   salt,
//   hash,
// };
//userId };

module.exports = {
  login,
  // register,
};
