const router = require("express").Router();

const { token: { BTTokenGeneration }, } = require("../controller");

router.get("/getClientToken/:userID", async (req, res) => {
  const userID = req.params.userID;
  try {
    const token = await BTTokenGeneration(userID);
    res.json(token);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
