const express = require('express');
const {User,validateUser} = require("../models/user");
const router = express.Router();

router.get('/', async (req, res, next) => {
  const users = await User.find().sort('_id')
  res.send(users);
});

router.post('/', async (req, res, next) => {
  const {error} = validateUser(req.body)
  if (error)
    return res.status(400).send(error.message)
  const {firstName,lastName,email,gender} = req.body
  const match = await User.findOne({email})
  if (match)
    return res.status(400).send('email must be unique!')

  const user = new User({
    firstName,
    lastName,
    email,
    gender
  })
  await user.save()
  res.status(201).send(user);
});

router.put('/:id', async (req, res, next) => {
  const {error} = validateUser(req.body)
  if (error)
    return res.status(400).send(error.message)
  const {firstName,lastName,email,gender} = req.body
  const user = await User.findByIdAndUpdate(req.params.id,{
    firstName,
    lastName,
    email,
    gender
  },{
    new: true
  })
  res.send(user);
});

router.delete('/:id', async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user)
    return res.status(404).send('Object not found!')
  res.send(user);
});

module.exports = router;
