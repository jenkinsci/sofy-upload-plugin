(async () => {
  require('dotenv').config()
  await require("./config/db-connect")();
})();
