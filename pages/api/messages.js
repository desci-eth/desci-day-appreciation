// const fs = require('fs');
import fs from 'fs';
require('dotenv').config()


export default function handler(req, res) {
  return res.status(200).json({ message: 'nice' })
  // if (req.method !== 'GET') {
  //   return res.status(400).json({ data: `Please send a GET request` }) 
  // }
  // if (req.headers['x-auth-token'] != process.env.AUTH_TOKEN) {
  //   return res.status(400).json({ data: `Invalid auth token` }) 
  // }
  // let success = true;

  // let msgStr = '';
  // try {
  //   // messages = fs.readFileSync('./messages.txt', 'utf8');
  //   msgStr = fs.readFileSync('./messages.json', 'utf8');
  // }
  // catch (err) {
  //   success = false
  //   console.log(err)
  // }
  // const messages = JSON.parse(msgStr.toString())
  // // let messagesArray = messages.split(`\n\n---------------`); 
  // // messagesArray = messagesArray.map(message => message.trim())
  
  // if (success) {
  //   console.log(`Successfully read messages.json. Returning now.`)
  //   return res.status(200).json({ messages: messages })
  // }
  // else {
  //   return res.status(400).json({ messages: `Failed to read messages.json.` })
  // }
}
