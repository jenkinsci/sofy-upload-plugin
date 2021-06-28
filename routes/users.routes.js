const router = require('express').Router();

const {
  auth: { login, createSampleUser },
} = require('../controller');

router.post('create-sample', async (req, res) => {
  try {
    const user = await createSampleUser(req.body);
    res.json(user);
  } catch (error) {
    debugger;
  }
});

router.get('login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    res.json(user);
  } catch (error) {
    debugger;
  }
});

// Register a new user
router.post('/register', (req, res) => {
  // const saltHash = utils.genPassword(req.body.password);
  // const salt = saltHash.salt;
  // const hash = saltHash.hash;
  // const newUser = new User({
  //   username: req.body.username,
  //   hash: hash,
  //   salt: salt,
  // });
});

module.exports = router;
