const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, db) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.run(
      "INSERT INTO User (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role]
    );
    res.status(201).send("User registered successfully!");
  } catch (err) {
    res.status(500).send("Error registering user.");
  }
};

exports.login = async (req, res, db) => {
  const { email, password } = req.body;

  const user = await db.get("SELECT * FROM User WHERE email = ?", [email]);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id }, "your_jwt_secret", { expiresIn: "1h" });
    res.status(200).json({ token });
  } else {
    res.status(401).send("Invalid credentials!");
  }
};

