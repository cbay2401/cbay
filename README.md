Cbay

Cbay is a web application for managing and selling vinyl records. It allows users to browse a collection of vinyl records and purchase them. The application also includes an admin dashboard for administrators to view and manage users and records, add new records to the inventory, delete records, and manage user accounts.

Features

User Authentication: Users can sign up, log in, and log out securely.
Record Management: Admins can add new vinyl records to the inventory, delete records, and view existing records.
User Management: Admins can view all users, including their details such as name, email, and role.
Search Functionality: Users can search for records by artist and album name. Users can also filter between price, genre, and year released.
Responsive Design: The application is responsive and works well on desktop and mobile devices.


Technologies Used

Frontend: React.js, Axios, CSS
Backend: Node.js, Express.js, PostgreSQL
Database: PostgreSQL
Authentication: JSON Web Tokens (JWT)


Installation

Clone the repository: git clone <https://github.com/cbay2401/cbay>
Navigate to the project directory: cd vinyl-records-store
Install dependencies for the server: npm install
Navigate to the client directory: cd client
Install dependencies for the client: npm install


Configuration

Set up a PostgreSQL database and configure the connection string in server/db/client.js.
Configure environment variables for JWT secret key and other sensitive information.
Update any necessary API endpoint URLs in the client-side code (client/src/api).


Usage

Start the server: npm start (from the root directory)
Start the client: npm start (from the client directory)
Access the application in your web browser: http://localhost:3000


Contributors

Carly Zimmerman (https://github.com/carlyzimm)
Erik Rodriguez (https://github.com/erik2757)
Jonathan Bushapa (https://github.com/JSBushapa)
Mitch Wells (https://github.com/mitchwellss)
John Perkins (https://github.com/Perkinsj831)




