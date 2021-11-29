import React from "react";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
function newMeetup() {
  const router = useRouter();
  async function addMeetupHandler(formObject) {
    console.log(formObject);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(formObject),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  return (
    <div>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </div>
  );
}

export default newMeetup;
