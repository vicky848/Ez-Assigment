const initializeFileTable = async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS File (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_name TEXT NOT NULL,
      file_type TEXT NOT NULL,
      uploaded_by INTEGER NOT NULL,
      encrypted_url TEXT NOT NULL,
      uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(uploaded_by) REFERENCES User(id)
    );
  `);
  console.log("File table initialized!");
};

module.exports = initializeFileTable;
