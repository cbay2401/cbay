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
        DROP TABLE IF EXISTS records;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
        `)
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )`)
    }
    catch(err) {
        throw err;
    }
}

const createRecordsTables = async () => {
  try{
      await db.query(`
      CREATE TABLE records(
          id SERIAL PRIMARY KEY,
          artist VARCHAR(255) DEFAULT 'name',
          albumname VARCHAR (225) UNIQUE NOT NULL,
          genre VARCHAR(255) UNIQUE NOT NULL,
          year INT NOT NULL,
          imageurl TEXT,
          price DECIMAL
      )`)
  }
  catch(err) {
      throw err;
  }
}

const createOrdersTable = async () => {
  try {
    await db.query(`
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      FOREIGN KEY (id) REFERENCES users(id),
      orderdate DATE,
      shippingaddress VARCHAR(225) UNIQUE NOT NULL,
      status BOOL
    )
    `)
  } catch(err) {
    throw err;
  }
}

const createOrdersProducts = async () => {
  try {
    await db.query(`
    CREATE TABLE orders_products(
      FOREIGN KEY (id) REFERENCES orders(id),
      FOREIGN KEY (id) REFERENCES records(id),
      quantity INT NOT NULL
    )
    `)
  } catch(err) {
    throw err
  }
}


async function testRecord(){
  await db.query(`
  INSERT INTO records (artist, albumname, genre, year, imageurl, price)
  VALUES ('Prince', 'Purple Rain', 'Soul', 1984, 'https://f4.bcbits.com/img/a2776528301_10.jpg', 12.99 )`)


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
        await createOrdersProducts()
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse();
