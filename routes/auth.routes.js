const router = require("express").Router();

const {
  auth: { login, register },
} = require("../controller");

const { verifyGoogleIdToken } = require("../middlewares");

router.post("/social/google", verifyGoogleIdToken, (req, res) => {
  // TODO: handle session here
  res.json(req.user);
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Required fields missing" });
  }
  try {
    const data = await login(email, password);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const data = await register(password).catch(next);
  res.json(data);
});

module.exports = router;
