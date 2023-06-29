/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFile } from "fs";

let html = "";

readFile("./index.html", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    logger.error(err);
    return;
  }
  html = data;
});

initializeApp();

type Hours = { day: string; range: { from: string; to: string } };
const REPLACE_STR = "<!-- APPOINTMENT_DETAILS -->";

const mapDetailsToString = (detailsMap: Map<string, string>) => {
  let detailsString = "";
  detailsMap.forEach((value, key) => {
    detailsString += `<tr><td>${key}:</td> <td>${value}</td></tr>`;
  });
  return detailsString;
};

const convertToTime = (time: number | string) => {
  if (typeof time === "string") {
    const hour = parseInt(time.slice(0, 2));
    const minute = time.slice(3, 5);
    return `${hour > 12 ? hour - 12 : hour}:${minute}`;
  }
  let suffix = "pm";
  if (time > 12) return time - 12 + suffix;
  if (time == 12) return time + suffix;
  suffix = "am";
  if (time == 0) return 12 + suffix;
  return time + suffix;
};

const writeDay = (day: string): string => {
  return day.slice(0, 1).toUpperCase() + day.slice(1, 3);
};

const writeHours = (from: string, to: string): string => {
  return convertToTime(from) + " - " + convertToTime(to);
};

const parseAvailability = (availability: string) => {
  const json = JSON.parse(availability) as Hours[];
  let availabilityString = "";
  json.forEach((value: Hours) => {
    availabilityString += `${writeDay(value.day)}: ${writeHours(
      value.range.from,
      value.range.to
    )}<br>`;
  });
  return availabilityString;
};

exports.sendAppointmentRequest = onRequest(async (req, res) => {
  // res.set("Access-Control-Allow-Origin", "https://www.vincentlam.dev");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  logger.info(req.body);
  const reqBody = req.body;
  const isRep = reqBody.representative === "on";
  const patientName = reqBody.firstName + " " + reqBody.lastName;
  const repName = isRep
    ? reqBody.repFirstName + " " + reqBody.repLastName
    : "N/A";
  const fullName = isRep ? repName : patientName;
  const detailMap = new Map<string, string>([
    ["Patient Name", patientName],
    ["Representative Name", repName],
    ["Email", reqBody.email],
    ["Phone Number", reqBody.tel],
    ["DOB", new Date(reqBody.dob.toString()).toLocaleDateString()],
    ["ZIP Code", reqBody.zip],
    ["Appointment Type", reqBody.appointment],
    ["Reoccuring Patient", reqBody.reoccuring === "on" ? "Yes" : "No"],
    ["Times Preffered", parseAvailability(reqBody.availbilties)],
  ]);

  logger.info(Object.fromEntries(detailMap));

  html.replace(REPLACE_STR, mapDetailsToString(detailMap));

  getFirestore()
    .collection("mail")
    .add({
      to: "vincentthanhlam@gmail.com",
      message: {
        subject: "New Appointment Request from " + fullName + ".",
        html,
      },
    })
    .then(() => {
      res.status(200).send("Messaged recieved");
    })
    .catch((error: Error) => {
      console.log(error);
      res.status(400).send(`An Error occured: ${error.message}`);
    });
});
// # sourceMappingURL=index.js.map
