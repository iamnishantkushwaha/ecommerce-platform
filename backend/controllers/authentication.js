const { generatetoken } = require("./auth");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const isValidPhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber);

async function handleSignup(req, res) {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    // Input validation
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Phone number must be exactly 10 digits" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({ message: `${role} created successfully` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  try {
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
      return res.status(401).json({ message: "Invalid credentials" });

    // Check vendor approval status
    if (user.role === "VENDOR") {
      if (user.approvalStatus !== "APPROVED")
        return res
          .status(403)
          .json({ message: "Your account is not approved yet" });
    }

    const token = generatetoken(user);
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax",
    // }); for local

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});


    return res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { handleLogin, handleSignup };
