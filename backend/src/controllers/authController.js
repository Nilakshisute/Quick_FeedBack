const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: "User registered", user });
  } catch {
    res.status(400).json({ message: "Email already exists" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 🔐 Hardcoded Admin Login
  const ADMIN_EMAIL = "admin@example.com";
  const ADMIN_PASSWORD = "admin123";

  if (email === ADMIN_EMAIL) {
    if (password !== ADMIN_PASSWORD) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // Admin login success
    const token = jwt.sign({ id: "admin123", role: "admin" }, process.env.JWT_SECRET);
    return res.json({
      token,
      user: {
        id: "admin123",
        name: "Admin",
        role: "admin",
      },
    });
  }

  // 🧑 Customer Login
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


