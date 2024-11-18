import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

// Create a connection pool to the database
const db = mysql.createPool({
  host: 'localhost', // Your database host
  user: 'root', // Your database username
  password: 'password', // Your database password
  database: 'hospital', // Your database name
});

export async function post({ request }) {
  const { username, password } = await request.json();

  try {
    // Fetch user from the database
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [
      username,
    ]);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
      });
    }

    const user = rows[0];

    // Check if the provided password matches the stored hash
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
      });
    }

    // On successful login, return a success response
    return new Response(
      JSON.stringify({ message: 'Login successful', user: { id: user.id, username: user.username } }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Database error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request.' }),
      { status: 500 }
    );
  }
}
