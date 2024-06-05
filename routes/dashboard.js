const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ message: `Welcome ${user.name}` });
});

module.exports = router;