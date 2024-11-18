const crypto = require("crypto");

exports.uploadFile = async (req, res, db) => {
  const { originalname, mimetype, path } = req.file;
  const encryptedUrl = crypto.randomBytes(16).toString("hex");

  try {
    await db.run(
      "INSERT INTO File (file_name, file_type, uploaded_by, encrypted_url) VALUES (?, ?, ?, ?)",
      [originalname, mimetype, req.user.id, encryptedUrl]
    );
    res.status(201).send("File uploaded successfully!");
  } catch (err) {
    res.status(500).send("Error uploading file.");
  }
};

exports.listFiles = async (req, res, db) => {
  const files = await db.all("SELECT * FROM File WHERE uploaded_by = ?", [req.user.id]);
  res.status(200).json(files);
};

exports.downloadFile = async (req, res, db) => {
  const { id } = req.params;

  const file = await db.get("SELECT * FROM File WHERE id = ?", [id]);
  if (file) {
    res.download(file.encrypted_url);
  } else {
    res.status(404).send("File not found!");
  }
};
