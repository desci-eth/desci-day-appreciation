const fs = require('fs');


export default function handler(req, res) {
  return res.status(200).json({ message: 'nice' })
  // if (req.method !== 'POST') {
  //   return res.status(400).json({ data: `Please send a POST request` }) 
  // }
  // let success = true;

  // const name = req.body.name;
  // const address = req.body.address;
  // const location = req.body.location;
  // const message = req.body.message;

  // console.log('body: ', req.body)

  // if (!name || !address || !location || !message) {
  //   success = false
  // }

  // let msgStr;
  // try {
  //   // messages = fs.readFileSync('./messages.txt', 'utf8');
  //   msgStr = fs.readFileSync('./messages.json', 'utf8');
  // }
  // catch (err) {
  //   success = false
  //   console.log(err)
  // }
  // const messages = JSON.parse(msgStr.toString())

  // // let messages = []

  // const newMessage = {
  //   "name": name,
  //   "address": address,
  //   "location": location,
  //   "message": message
  // }
  // messages.push(newMessage)
  // const content = JSON.stringify(messages)
  // // const content = `${name} from ${location} said: ${message}\n\n---------------`
  // try {
  //   // fs.appendFileSync('./messages.txt', content);
  //   fs.writeFileSync('./messages.json', content);
  // }
  // catch (err) {
  //   success = false
  //   console.log(err)
  // }
  
  // if (success) {
  //   console.log(`Successfully recorded the following message from ${name} (${address})... ${message}`)
  //   return res.status(200).json({ data: `Successfully recorded message from ${name}` })
  // }
  // else {
  //   console.log(`Failed to record message from ${name} (${address})...`)
  //   return res.status(400).json({ data: `Failed to record message from ${name}` })
  // }
}
