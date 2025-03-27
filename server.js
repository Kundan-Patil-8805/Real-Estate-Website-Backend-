import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectdb from './config/mongodb.js';
import userrouter from './routes/UserRoute.js';
import transporter from "./config/nodemailer.js";
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());




app.use('/api/users', userrouter);

app.get('/test-email', async (req, res) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email.',
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result);
    res.status(200).send("Test email sent successfully.");
  } catch (error) {
    console.error("Email Test Error:", error.message);
    res.status(500).send("Failed to send test email.");
  }
});





// Database connection
connectdb()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit if database connection fails
  });

// Root route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> Urban-Nest  API Status</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
          .container { background: #f9fafb; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          h1 { color: #2563eb; }
          .status { color: #16a34a; font-weight: bold; }
          .info { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          .footer { margin-top: 30px; font-size: 0.9rem; color: #6b7280; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1> Urban-Nest  API</h1>
          <p>Status: <span class="status">Online</span></p>
          <p>Server Time: ${new Date().toLocaleString()}</p>
          
          <div class="info">
            <p>The Urban-Nest  API is running properly. This backend serves property listings, user authentication, 
            and AI analysis features for the BuildEstate property platform.</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()}  Urban-Nest . All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
