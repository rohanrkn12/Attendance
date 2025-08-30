import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import pool from "./db.js"; // Ensure db.js is correctly configured with your database connection

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Update this URL to match your frontend URL
app.use(bodyParser.json()); // Parses incoming JSON requests

/**
 * Student Login Route
 */
app.post("/api/student-login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Check if the student exists
    const [rows] = await pool.query("SELECT * FROM students WHERE registration_number = ?", [identifier]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid registration number or password." });
    }

    const student = rows[0];

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid registration number or password." });
    }

    // Send student details
    res.json({
      success: true,
      student: {
        id: student.id,
        name: student.name,
        attendance: {
          subject1: student.subject1_attendance,
          subject2: student.subject2_attendance,
          subject3: student.subject3_attendance,
          subject4: student.subject4_attendance,
          subject5: student.subject5_attendance,
        },
      },
    });
  } catch (err) {
    console.error("Error during student login:", err.message);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

/**
 * Teacher Login Route
 */
app.post("/api/teacher-login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Check if the teacher exists
    const [rows] = await pool.query("SELECT * FROM teachers WHERE teacher_id = ?", [identifier]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid teacher ID or password." });
    }

    const teacher = rows[0];

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, teacher.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid teacher ID or password." });
    }

    // Send teacher details
    res.json({
      success: true,
      teacher: {
        id: teacher.id,
        name: teacher.name,
        subject: teacher.subject,
      },
    });
  } catch (err) {
    console.error("Error during teacher login:", err.message);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

/**
 * Health Check Route
 */
app.get("/", (req, res) => {
  res.send("Welcome to the College Attendance System API!");
});
/**
 * Fetch All Students
 */
app.get('/api/students', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, registration_number, subject1_attendance, subject2_attendance, subject3_attendance, subject4_attendance, subject5_attendance FROM students'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching students:', err.message);
    res.status(500).json({ error: 'Failed to fetch students.' });
  }
});

/**
 * Update Attendance
 */
app.post('/api/update-attendance', async (req, res) => {
  const { teacherId, subject, updates } = req.body;

  if (!['subject1', 'subject2', 'subject3', 'subject4', 'subject5'].includes(subject)) {
    return res.status(400).json({ error: 'Invalid subject.' });
  }

  try {
    for (const studentId in updates) {
      const attendanceValue = Number(updates[studentId]);
      if (attendanceValue < 0 || attendanceValue > 100) {
        console.warn(`Skipping invalid attendance value for student ID: ${studentId}`);
        continue;
      }
      await pool.query(`UPDATE students SET ${subject}_attendance = ? WHERE id = ?`, [attendanceValue, studentId]);
    }
    res.json({ success: true, message: 'Attendance updated successfully.' });
  } catch (err) {
    console.error('Error updating attendance:', err.message);
    res.status(500).json({ error: 'Failed to update attendance.' });
  }
});

/**
 * Fetch Notices
 */
app.get('/api/notices', async (req, res) => {
  try {
    const [notices] = await pool.query('SELECT * FROM notices');
    res.json(notices);
  } catch (err) {
    console.error('Error fetching notices:', err.message);
    res.status(500).json({ error: 'Failed to fetch notices.' });
  }
});

/**
 * Fetch Holidays
 */
app.get('/api/holidays', async (req, res) => {
  try {
    const [holidays] = await pool.query('SELECT * FROM holidays');
    res.json(holidays);
  } catch (err) {
    console.error('Error fetching holidays:', err.message);
    res.status(500).json({ error: 'Failed to fetch holidays.' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
