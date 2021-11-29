import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "1",
//     title: "First Meetups",
//     image:
//       "https://media.istockphoto.com/photos/historic-city-of-wrzburg-franconia-bavaria-germany-picture-id526215661",
//     address: "Wuerzburg",
//     description: "this is a first meetup",
//   },
//   {
//     id: "2",
//     title: "Second Meetups",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/6/6c/Aerial_view_of_Berlin_%2832881394137%29.jpg",
//     address: "Berlin",
//     description: "this is a second meetup",
//   },
// ];
function Homepage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export default Homepage;
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Kano0o:PA$sw0rd21399333@cluster0.c9sa9.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupcollections = db.collection("meetups");
  const meetups = await meetupcollections.find().toArray();
  client.close();
  return {
    revalidate: 1,
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        id: meetup._id.toString(),
        image: meetup.image,
        addresss: meetup.address,
      })),
    },
  };
}
