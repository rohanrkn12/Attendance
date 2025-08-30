// db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
   host: 'localhost',
  user: 'root',
  password: 'ROHANNAYAK',
  database: 'CollegeAttendanceSystem',
});

// Test connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('❌ DB Connection Error:', err.message);
  }
})();
export default pool;