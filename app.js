const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mailgun = require('mailgun-js');
require('dotenv').config();


const app = express();

// Set up Mailgun
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST route for newsletter subscription
app.post('/newsletter', (req, res) => {
  const { email } = req.body;

  const data = {
    from: 'Newsletter <newsletter@yourdomain.com>', // Use your verified Mailgun domain
    to: email,
    subject: 'Welcome to the Newsletter!',
    text: 'Thank you for subscribing to our newsletter!',
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email.');
    }
    console.log('Email sent:', body);
    return res.status(200).send('Welcome email sent successfully.');
  });
});

// Start backend server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
