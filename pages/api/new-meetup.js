import { MongoClient } from 'mongodb';
//  /api/new-meetup
// POST req only

async function handler(req, res)
{
    if (req.method === 'POST')
    {
        const data = req.body;
        const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://niravdamor:nick1234@cluster0.wpqlz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message:'Meetup Inserted'});
    }
}

export default handler;