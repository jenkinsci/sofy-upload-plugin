const sql = require("mssql");

const utils = require("../lib/utils");

const login = async (email, password) => {
  const {
    recordset,
  } = await sql.query`select * from Users where Email = ${email}`;

  if (!recordset.length) {
    throw Error("User not found");
  }

  let user = recordset[0];

  const isValid = user.Password === password;

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

  delete user.Password;

  return { user, token };
};

const register = async (password) => {
  const { salt, hash } = utils.genPassword(password);

  return {
    salt,
    hash,
  };
};

module.exports = {
  login,
  register,
};
