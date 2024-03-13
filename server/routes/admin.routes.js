const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin.model");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = await adminModel.create({
      email: req.body.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ success: true, data: { user, token } });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

router.post("/login", async (req, res) => {
    // check if email doesn't exist
    const user = await adminModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Email Not Found" });
    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass)
      return res.status(400).json({ error: "Password is incorrect" });
    const token = jwt.sign({ _id: user._id }, "ajahfladshflkjashdflkjahsdfjklahdsjf");
    res.header("auth-token", token).json({
      token: token,
      success: "Logged in successfully!",
    });
  });

module.exports = router
