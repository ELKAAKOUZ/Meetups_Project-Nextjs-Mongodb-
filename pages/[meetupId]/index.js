import React, { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function meetupIdDetails(props) {
  return (
    <MeetupDetail
      description={props.meetupData.description}
      address={props.meetupData.address}
      title={props.meetupData.title}
      img={props.meetupData.image}
    />
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Kano0o:PA$sw0rd21399333@cluster0.c9sa9.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupcollections = db.collection("meetups");
  const meetups = await meetupcollections.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  //fetch data
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://Kano0o:PA$sw0rd21399333@cluster0.c9sa9.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupcollections = db.collection("meetups");
  const selectedMeetup = await meetupcollections.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  console.log(meetupId);
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}
export default meetupIdDetails;
