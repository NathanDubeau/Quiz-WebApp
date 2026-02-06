/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/
import connectToDatabase from '../../db';

   export default async function handler(req, res) {
       if (req.method === 'POST') {
           const { question, answer } = req.body;

           try {
               const db = await connectToDatabase();
               const collection = db.collection('quiz'); // Replace with your collection name

               await collection.insertOne({ question, answer });
               res.status(200).json({ message: 'Quiz question added successfully' });
           } catch (error) {
               res.status(500).json({ error: 'Failed to add quiz question' });
           }
       } else {
           res.status(405).json({ error: 'Method not allowed' });
       }
   }
