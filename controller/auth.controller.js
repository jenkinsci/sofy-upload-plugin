const sql = require("mssql");

const utils = require("../lib/utils");

const login = async (email, password) => {
  const {
    recordset,
  } = await sql.query`select * from Users where Email = 'taham+2@devfactori.com'`;

  if (!recordset.length) {
    throw Error("User not found");
  }

  let user = recordset[0];

  const isValid = utils.validPassword(
    password,
    "a73e05bab614d0496e4a534a2ec7f44883e1fcdd40aef99ec963faf77ca94667adcfd8e571abc62ee74f8e892d0166c1e9d42f7626e71f21469074c4269fe211",
    "61f5094e3f38fe00238c9e0f3b0fa2a380bba8b25134a7190c533377db847dca"
  );

  if (!isValid) {
    throw Error("Invalid credentials");
  }

  const { token } = utils.issueJWT({
    _id: 1,
    name: "taha",
  });

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
