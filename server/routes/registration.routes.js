const express = require("express");
const User = require("../models/registration.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ error: "Email Already Exists" });

  //   hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const namePrefix = req.body.name.substring(0, 3).toUpperCase();
  const contactSuffix = req.body.contact.substring(req.body.contact.length - 3).toUpperCase();
  const referenceId = `${namePrefix}-${contactSuffix}`;

  // create
  const user = new User({
    name: req.body.name,
    contact: req.body.contact,
    email: req.body.email,
    college_name: req.body.college_name,
    college_city: req.body.college_city,
    college_state: req.body.college_state,
    password: hashedPassword,
    reference_id: referenceId,
  });
  // save
  try {
    const saveduser = await user.save();
    res.status(200).json({
      success: "Registered Successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: "Not Registered",
    });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Email Not Found" });

  const checkPass = await bcrypt.compare(req.body.password, user.password);
  if (!checkPass)
    return res.status(400).json({ error: "Password is incorrect" });
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("auth-token", token).json({
    token: token,
    success: "Logged in successfully!",
  });
});

router.post("/getUser", async (req, res) => {
  const token = req.body.token;
  const id = jwt.verify(token, process.env.JWT_SECRET)._id;
  const user = await User.findOne({
    _id: id,
  });
  res.status(200).json(user);
});

router.get("/getAll", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id
    const data = await User.findByIdAndDelete(id);
    res.send(`User with ${data.name} has been deleted ...`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put('/updateUser/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Split the comma-separated string into an array
    if (req.body.events && Array.isArray(req.body.events)) {
      user.events = req.body.events.map(event => event.toLowerCase().trim());
    } else if (typeof req.body.events === 'string') {
      user.events = req.body.events.toLowerCase().split(',').map(event => event.trim());
    }
    else{
      user.events = []
    }

    // Update other fields if needed
    Object.keys(req.body).forEach((key) => {
      if (key !== 'events') {
        user[key] = req.body[key];
      }
    });

    await user.save();
    res.send(`User with ${user.name} has been updated ...`);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});





module.exports = router;
