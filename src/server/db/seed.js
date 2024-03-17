const db = require("./client");
const { createUser } = require("./users");

const users = [
  {
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "securepass",
  },
  {
    name: "Liu Wei",
    email: "liu@example.com",
    password: "strongpass",
  },
  {
    name: "Isabella García",
    email: "bella@example.com",
    password: "pass1234",
  },
  {
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    password: "mysecretpassword",
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
  },
  // Add more user objects as needed
];

const dropTables = async () => {
  try {
    await db.query(`
        DROP TABLE IF EXISTS orders_records;
        DROP TABLE IF EXISTS records;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
        `);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )`);
  } catch (err) {
    throw err;
  }
};

const createRecordsTables = async () => {
  try {
    await db.query(`
      CREATE TABLE records(
          id SERIAL PRIMARY KEY,
          artist VARCHAR(255) DEFAULT 'name',
          albumname VARCHAR (225) UNIQUE NOT NULL,
          genre TEXT,
          year INT NOT NULL,
          imageurl TEXT,
          price DECIMAL
      )`);
  } catch (err) {
    throw err;
  }
};

const createOrdersTable = async () => {
  try {
    await db.query(`
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      orderdate DATE,
      shippingaddress VARCHAR(225),
      status BOOL
    )
    `);
  } catch (err) {
    throw err;
  }
};

const createOrdersRecords = async () => {
  try {
    await db.query(`
    CREATE TABLE orders_records(
      id SERIAL PRIMARY KEY,
      order_id INT REFERENCES orders(id),
      records_id INT REFERENCES records(id),
      quantity INT NOT NULL
    )
    `);
  } catch (err) {
    throw err;
  }
};

async function testOrder() {
  await db.query(`
  INSERT INTO orders (user_id, orderdate, shippingaddress, status)
  VALUES (1, '2024-03-15', '123 Easy St', true),
  (2, '2024-03-15', '456 Easy St', true),
  (3, '2024-03-15', '789 Easy St', true),
  (3, '2024-03-15', '789 Easy St', true)
  `);
}

async function testOrdersRecords() {
  await db.query(`
  INSERT INTO orders_records (order_id, records_id, quantity)
  VALUES (1, 1, 2),
  (2, 2, 1),
  (2, 1, 1),
  (3, 3, 3)
  `);
}

async function testRecord() {
  await db.query(`
  INSERT INTO records (artist, albumname, genre, year, imageurl, price)
  VALUES ('Prince', 'Purple Rain', 'Soul', 1984, 'https://f4.bcbits.com/img/a2776528301_10.jpg', 12.99 ),
  ('Queen', 'Flash Gordon Soundtrack', 'Rock', 1980, 'https://upload.wikimedia.org/wikipedia/en/c/cc/Queen_Flash_Gordon.png', 15.99 ),
  ('Coldplay', 'Parachutes', 'Rock/Punk', 2000, 'https://upload.wikimedia.org/wikipedia/en/f/fd/Coldplay_-_Parachutes.png', 10.99 ),
  ('Big Garden', 'To The Rind', 'Rock', 2023, 'https://f4.bcbits.com/img/a1058465060_65', 20.00),
  ('Thou', 'Inconsolable', 'Quiet', 2018, 'https://f4.bcbits.com/img/a2458719443_10.jpg', 15.00),
  ('J.R.C.G', 'Ajo Sunshine', 'Psych/Punk', 2021, 'https://f4.bcbits.com/img/a2709749750_65', 20.00),
  ('Fiona Apple', 'When The Pawn', 'Alt Rock', 1999, 'https://media.pitchfork.com/photos/6596f3a1cf7bb5fb106222ab/master/pass/Fiona-Apple.jpg5', 24.99)
  `);
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await createRecordsTables();
    await testRecord();
    await createOrdersTable();
    await createOrdersRecords();
    await testOrder();
    await testOrdersRecords();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();
