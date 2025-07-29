const express = require('express');
const connectDB=require('./config/db')
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

connectDB()
const PORT=process.env.PORT || 8000

app.listen(PORT,()=>{
  console.log("✅ Server Started!")
})