const router = require("express").Router();
const passport = require("passport");
const utils = require("../lib/utils");
const { Request } = require("tedious");
const {
  auth: { login },
} = require("../controller");

router.get("login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    res.json(user);
  } catch (error) {
    debugger;
  }
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }
);

// Validate an existing user and issue a JWT
router.post("/login", function (req, res, next) {
  const isValid = utils.validPassword(
    "passwordpassword",
    "7425a075aa50beafcf4c5821dd198d5cc27bf1ed3cc62cbecfc6e61da8cbf7c3f66c11805f27fb53259e6829b907cbd3073d6c7896dec720ffa1a3bac4cf72d9",
    "5f75833aed44fd2aa1e5917723128909c0c06288a25b40620c0d6b829e8ff11d"
  );

  const request = new Request(
    "select * from Users where Email = 'taha@sofy.ai'",
    function (err, rowCount) {
      debugger;
    }
  );

  request.on("row", (columns) => {
    columns.forEach((column) => {
      if (column.value === null) {
        console.log("NULL");
      } else {
        console.log(column.value);
      }
    });
  });

  request.on("done", (rowCount) => {
    console.log("Done is called!");
  });

  request.on("doneInProc", (rowCount, more) => {
    console.log(rowCount + " rows returned");
  });

  global.dbConnection.execSql(request);

  debugger;
  const tokenObject = utils.issueJWT({
    _id: 1,
    name: "taha",
  });
  debugger;

  // User.findOne({ username: req.body.username })
  //   .then((user) => {
  //     if (!user) {
  //       res.status(401).json({ success: false, msg: "could not find user" });
  //     }

  //     // Function defined at bottom of app.js
  //     const isValid = utils.validPassword(
  //       req.body.password,
  //       user.hash,
  //       user.salt
  //     );

  //     if (isValid) {
  //       const tokenObject = utils.issueJWT(user);

  //       res.status(200).json({
  //         success: true,
  //         token: tokenObject.token,
  //         expiresIn: tokenObject.expires,
  //       });
  //     } else {
  //       res
  //         .status(401)
  //         .json({ success: false, msg: "you entered the wrong password" });
  //     }
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
});

// Register a new user
router.post("/register", function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
  });

  try {
    debugger;
    // newUser.save().then((user) => {
    //   res.json({ success: true, user: user });
    // });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
});

module.exports = router;
