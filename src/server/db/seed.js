// server/db/client.js

const db = require("./client");
const { createUser } = require("./users");

const users = [
  {
    name: "Admin Account",
    email: "admin@example.com",
    password: "securepass",
    role: "admin"
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

  {
    name: "Guest",
    email: "null@example.com",
    password: "null",
  },

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
    console.log("Creating users table...")
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(20) DEFAULT 'user'
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
  ('Feid', 'Feliz Cumpleanos Ferxxo Te Pirateamos el Album', 'Reggaeton', 2022,'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Feliz_Cumplea%C3%B1os_Ferxxo_Te_Pirateamos_el_%C3%81lbum.jpg/220px-Feliz_Cumplea%C3%B1os_Ferxxo_Te_Pirateamos_el_%C3%81lbum.jpg', 12.99),
  ('Peso Pluma','Genesis', 'Regional Mexican', 2023, 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Peso_Pluma_-_Genesis.png/220px-Peso_Pluma_-_Genesis.png', 13.99),
  ('Post Malone', 'Stoney', 'Hip-Hop', 2016, 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Stoneyalbum.jpg/220px-Stoneyalbum.jpg', 10.99), 
  ('Midland', 'On the Rocks', 'Country', 2017,'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Midland_on_the_rocks.jpg/220px-Midland_on_the_rocks.jpg', 9.99),
  ('Weather Report', 'Heavy Weather', 'Jazz Fusion', 1977, 'https://upload.wikimedia.org/wikipedia/en/6/66/Weather_Report-Heavy_Weather.jpg', 13.99),
  ('Miles Davis', 'Kinda Blue', 'Jazz', 1959, 'https://upload.wikimedia.org/wikipedia/en/9/9c/MilesDavisKindofBlue.jpg', 15.00),
  ('Pat Matheny', 'From This Place', 'Jazz Fsion', 2020, 'https://upload.wikimedia.org/wikipedia/en/b/b5/From_This_Place.jpg', 12.99 ),
  ('Snarky Puppy', 'Immigrance', 'Jazz Fusion', 2019, 'https://www.thejazzmann.com/images/uploads/cover_art/immigrance.jpg', 11.00 ),
  ('Blink-182', 'Blink-182', 'Rock/Punk', 2003, 'https://i.scdn.co/image/ab67616d0000b2730538b48c180256e0bdd8363f', 15.99 ),
  ('Sublime', 'Sublime', 'Rock/Punk', 1996, 'https://upload.wikimedia.org/wikipedia/en/9/94/Sublime_Self-Titled.jpg', 10.99 ),
  ('Eminem', 'The Marshall Mathers LP', 'Rap', 2000, 'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-146432-6b725a8c7cad1a0414c5a33f06299e9d2730ae2e.jpg', 13.99 ),
  ('Logic', 'The Incredible True Story', 'Rap', 2015, 'https://upload.wikimedia.org/wikipedia/en/e/ea/TheIncredibleTrueStory.jpg', 18.99 ),
  ('Fall Out Boy', 'Take This to Your Grave', 'Rock/Punk', 2003, 'https://i.scdn.co/image/ab67616d0000b273b3e13979bf4f6515020fbaea', 10.99 ),
  ('Big Garden', 'To The Rind', 'Rock', 2023, 'https://f4.bcbits.com/img/a1058465060_65', 20.00),
  ('Thou', 'Inconsolable', 'Quiet', 2018, 'https://f4.bcbits.com/img/a2458719443_10.jpg', 15.00),
  ('J.R.C.G', 'Ajo Sunshine', 'Psych/Punk', 2021, 'https://f4.bcbits.com/img/a2709749750_65', 20.00),
  ('Fiona Apple', 'When The Pawn', 'Alt Rock', 1999, 'https://media.pitchfork.com/photos/6596f3a1cf7bb5fb106222ab/master/pass/Fiona-Apple.jpg5', 24.99),
  ('Billie Eilish', 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', 'Pop', 2019, 'https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce', 24.99),
  ('Olivia Rodrigo', 'SOUR', 'Pop', 2021, 'https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png', 19.99),
  ('Paramore', 'Brand New Eyes', 'Alt Rock', 2009, 'https://upload.wikimedia.org/wikipedia/en/9/9b/Paramore_-_Brand_New_Eyes.png', 12.99),
  ('J. Cole', '2014 Forest Hills Drive', 'Rap', 2014, 'https://upload.wikimedia.org/wikipedia/en/2/2a/2014ForestHillsDrive.jpg', 14.99),
  ('Evanescence', 'Fallen', 'Alt Rock', 2003, 'https://upload.wikimedia.org/wikipedia/en/2/25/Evanescence_-_Fallen.png', 12.99),
  ('Beyonce', 'Lemonade', 'Pop/Hip Hop', 2016, 'https://upload.wikimedia.org/wikipedia/en/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png', 24.99),
  ('*NSYNC', 'No Strings Attached', 'Pop', 2000, 'https://www.billboard.com/wp-content/uploads/media/nsync-no-strings-attached-2000-album-cover-billboard-650-hero.jpg?w=650', 12.99),
  ('Drake', 'Take Care (Deluxe)', 'Rap', 2011, 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Drake_-_Take_Care_cover.jpg/220px-Drake_-_Take_Care_cover.jpg', 19.99),
  ('Lin-Manuel Miranda', 'Hamilton (Original Broadway Cast Recording)', 'Show Tunes', 2015, 'https://upload.wikimedia.org/wikipedia/en/5/5b/Hamilton_cast_recording_cover.jpeg', 14.99),
  ('Aminé', 'Limbo', 'Hip Hop', 2020, 'https://m.media-amazon.com/images/I/71KPxCqrWjL._UF1000,1000_QL80_.jpg', 19.99), 
  ('Grupo Frontera', 'El Comienzo', 'Regional Mexican', 2023,'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/72/31/00/7231009e-bae9-23d4-cb3f-c8e60203502d/cover.jpg/316x316bb.webp', 16.99),
  ('Mora', 'Paraiso', 'Reggaeton', 2022,'https://static.qobuz.com/images/covers/8b/3z/t4dsafcg33z8b_600.jpg', 14.99),
  ('Morgan Wallen', 'If I Know Me', 'Country', 2018,'https://m.media-amazon.com/images/I/518u-bE1k8L._SX300_SY300_QL70_FMwebp_.jpg', 13.99),
  ('Joyner Lucas', 'ADHD', 'Rap', 2020,'https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Joyner_Lucas_-_ADHD.jpg/220px-Joyner_Lucas_-_ADHD.jpg', 15.99),
  ('Linkin Park', 'Hybrid Theory', 'Rock', 2000,'https://m.media-amazon.com/images/I/61XbzKcJqNL._SX300_SY300_QL70_FMwebp_.jpg', 11.99),
  ('X-Ray Spex', 'Germ Free Adolescents', 'Punk', 1978, 'https://upload.wikimedia.org/wikipedia/en/f/f3/X-Ray_Spex_-_Germfree_Adolescents_album_cover.jpg', 15.00),
  ('Danny Brown', 'Atrocity Exhibition', 'Hip Hop', 2016, 'https://upload.wikimedia.org/wikipedia/en/b/ba/AtrocityExhibition.jpg', 25.99),
  ('Busmans Holiday', 'Good Songs', 'Indie', 2022, 'https://f4.bcbits.com/img/a3387053468_65', 12.99),
  ('Busmans Holiday', 'Popular Cycles', 'Indie', 2016, 'https://f4.bcbits.com/img/a3234474471_65', 13.99),
  ('Gorillaz', 'Gorillaz', 'Hip Hop', 2001, 'https://upload.wikimedia.org/wikipedia/en/4/41/GorillazAlbum.jpg', 23.99)

  `);
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role || "user"
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
