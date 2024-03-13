const express = require("express");
const Model = require("../models/PreModel");
const eventModel = require("../models/EventModel");
const teamModel = require("../models/TeamModel");

const router = express.Router();

// PRE-REGISTRATIONS
router.post("/post", async (req, res) => {
  try {
    const emailExists = await Model.findOne({ email: req.body.email });
    if (emailExists)
      return res.status(400).json({ message: "Email Already Exists" });
    const data = new Model({
      name: req.body.name,
      age: req.body.age,
      contact: req.body.contact,
      email: req.body.email,
      college: req.body.college,
      state: req.body.state,
      city: req.body.city,
      gender: req.body.gender,
      year: req.body.year,
      accommodation: req.body.accommodation,
      events : req.body.events,
    });

    const dataToSave = await data.save();
    res.status(200).json({ message: "Pre-Registered Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id
    const data = await Model.findByIdAndDelete(id);
    res.send(`User with ${data.name} has been deleted ...`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put('/updateUser/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Model.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    await user.save();
    res.send(`User with ${user.name} has been updated ...`);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// EVENTS
router.post("/addEvent", async (req, res) => {
  try {
    const eventExists = await eventModel.findOne({ name: req.body.name });
    if (eventExists)
      return res.status(400).json({ message: "Event Already Exists" });
    const data = new eventModel({
      name: req.body.name,
      description : req.body.description,
      photoURL: req.body.photoURL,
      brochureURL: req.body.brochureURL,
      prize: req.body.prize,
      prize_money : req.body.prize_money,
    });
    const dataToSave = await data.save();
    res.status(200).json({ message: "Event Added Successfully Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/updateAll", async (req,res) =>{
  try {
    await eventModel.updateMany({}, { prize_money: 0 });

    res.status(200).json({ message: 'Field updated for all users' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

router.get("/getAllEvent", async (req, res) => {
  try {
    const data = await eventModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/deleteEvent/:id", async (req, res) => {
  try {
    const id = req.params.id
    const data = await eventModel.findByIdAndDelete(id);
    res.send(`User with ${data.name} has been deleted ...`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/updateEvent/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await eventModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    await user.save();
    res.send(`User with ${user.name} has been updated ...`);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//TEAM
router.get("/getAllTeam", async (req, res) => {
  try {
    const data = await teamModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/addTeam", async (req, res) => {
  try {
    const memberExists = await teamModel.findOne({ mailURL: req.body.mailURL });
    if (memberExists)
      return res.status(400).json({ message: "Member Already Exists" });
    const data = new teamModel({
      name: req.body.name,
      photoURL: req.body.photoURL,
      gitURL: req.body.gitURL,
      IgURL: req.body.IgURL,
      mailURL: req.body.mailURL,
      designation: req.body.designation,
    });
    const dataToSave = await data.save();
    res.status(200).json({ message: "Member Added Successfully Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete("/deleteMember/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await teamModel.findByIdAndDelete(id);
    res.send(`User with ${data.name} has been deleted ...`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/updateMember/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await teamModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    await user.save();
    res.send(`User with ${user.name} has been updated ...`);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
