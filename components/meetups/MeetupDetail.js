import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";

function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <img src={props.img} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <h4>{props.description}</h4>
    </section>
  );
}

export default MeetupDetail;
