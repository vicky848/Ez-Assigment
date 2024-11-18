const initializeUserTable = async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('Ops User', 'Client User')) NOT NULL,
      email_verified INTEGER DEFAULT 0
    );
  `);
  console.log("User table initialized!");
};

module.exports = initializeUserTable;
