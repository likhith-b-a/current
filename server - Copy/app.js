const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
const port = 3500;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post('/generateResponse',async (req,res)=>{
  const {prompt} = req.body;
  const response = (await model.generateContent(prompt)).response.text();
  res.json({response});
})

app.listen(port,()=>{
  console.log("Server running on port 3500");
})