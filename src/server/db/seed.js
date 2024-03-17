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
  ('Queen', 'Flash Gordon Soundtrack', 'Rock', 1980, 'https://f4.bcbits.com/img/a2776528301_10.jpg', 15.99 ),
  ('Coldplay', 'Parachutes', 'Rock/Punk', 2000, 'https://f4.bcbits.com/img/a2776528301_10.jpg', 10.99 ), 
  ('Feid', 'Feliz Cumpleanos Ferxxo Te Pirateamos el Album', 'Reggaeton', 2022,'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Feliz_Cumplea%C3%B1os_Ferxxo_Te_Pirateamos_el_%C3%81lbum.jpg/220px-Feliz_Cumplea%C3%B1os_Ferxxo_Te_Pirateamos_el_%C3%81lbum.jpg', 12.99),
  ('Peso Pluma','Genesis', 'Regional Mexican', 2023, 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Peso_Pluma_-_Genesis.png/220px-Peso_Pluma_-_Genesis.png', 13.99),
  ('Post Malone', 'Stoney', 'Hip-Hop', 2016, 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Stoneyalbum.jpg/220px-Stoneyalbum.jpg', 10.99), 
  ('Midland', 'On the Rocks', 'Country', 2017,'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Midland_on_the_rocks.jpg/220px-Midland_on_the_rocks.jpg', 9.99)
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
