// // src/pages/api/register.js
// import mysql from 'mysql2/promise';
// import bcrypt from 'bcrypt';

// // Database connection pool
// const db = mysql.createPool({
//   host: 'localhost', // Your database host
//   user: 'root', // Your database username
//   password: 'password', // Your database password
//   database: 'hospital', // Your database name
// });

// export async function post({ request }) {
//   const { username, password } = await request.json();

//   if (!username || !password) {
//     return new Response(
//       JSON.stringify({ error: 'Username and password are required.' }),
//       { status: 400 }
//     );
//   }

//   try {
//     // Check if the username already exists
//     const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [
//       username,
//     ]);

//     if (rows.length > 0) {
//       return new Response(
//         JSON.stringify({ error: 'Username is already taken.' }),
//         { status: 409 }
//       );
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert new user into the database
//     await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [
//       username,
//       hashedPassword,
//     ]);

//     return new Response(
//       JSON.stringify({ message: 'Registration successful' }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Database error:', error);
//     return new Response(
//       JSON.stringify({ error: 'An error occurred while processing your request.' }),
//       { status: 500 }
//     );
//   }
// }
