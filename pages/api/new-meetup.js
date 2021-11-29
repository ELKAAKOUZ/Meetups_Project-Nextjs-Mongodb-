import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://Kano0o:PA$sw0rd21399333@cluster0.c9sa9.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupcollections = db.collection("meetups");
    const result = await meetupcollections.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup Inserted" });
  }
}
export default handler;
