import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

import { authenticationRoute } from "./authenticateRoute";
import { initialRoute } from "./initialState";
import Visit from "./models/visitModel";
import Booked from "./models/bookedModel";
import Guide from "./models/guideModel";
import Rating from "./models/ratingModel";
import "./connect-db.js";
import { log } from "console";

const port = process.env.PORT || 7777;
const app = express();

console.log("ENV vars:=" , process.env);

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.listen(port, console.log("Server is listening at port ", port));

initialRoute(app);

authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
  app.use(express.static(path.resolve(__dirname, "../../dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}

app.post("/guide/available", async (req, res) => {
  const { date, placeId } = req.body;
  const booked = await Booked.find({});
  let availableGuide = [];
  let f = 0;
  const guides = await Guide.find({ placeId: placeId }).exec();
  // check whether a guide available or not
  for (const guide in guides) {
    f = 0;
    for (const book in booked) {
      for (const bookedGuide in booked[book].guideIds) {
        if (
          booked[book].guideIds[bookedGuide] === guides[guide].id &&
          booked[book].date === date
        ) {
          f = 1;
          break;
        }
      }
      if (f === 1) break;
    }
    if (f == 0) {
      availableGuide = [...availableGuide, guides[guide]];
    }
  }
  res.send(availableGuide);
});

app.post("/booking/add", async (req, res) => {
  const { NewBooking } = req.body;
  const newBooking = new Booked(NewBooking);
  await newBooking.save();
  console.info("New book, id", newBooking.id);
  res.status(200).send(newBooking);
});

app.post("/booked/update", async (req, res) => {
  const { bookId, progress } = req.body;
  await Booked.updateOne({ id: bookId }, { progress: progress }, function (
    err
  ) {
    if (err) {
      console.error(err);
      res.status(500);
    }
  });
  const book = await Booked.findOne({ id: bookId });

  console.info("Rating submitted, id ", book.id);

  await res.status(200).send(book);
});

app.post("/booked/delete", async (req, res) => {
  const { bookId } = req.body;
  await Booked.deleteOne({ id: bookId }, function (err) {
    if (err) {
      console.error(err);
      res.status(500);
    }
  });
  console.info("book deleted, id ", bookId);
  res.status(200);
});

app.post("/visit/add", async (req, res) => {
  const { NewVisit } = req.body;
  const newVisit = new Visit(NewVisit);
  await newVisit.save();
  console.info("new visit, id ", newVisit.id);
  res.status(200).send(newVisit);
});

app.post("/rating/add", async (req, res) => {
  const { NewRating } = req.body;
  const newRating = new Rating(NewRating);
  await newRating.save();
  console.info("new rating, id ", newRating.id);
  res.status(200).send(newRating);
});

app.post("/rating/submit", async (req, res) => {
  const { ratingId, score } = req.body;
  await Rating.updateOne(
    { id: ratingId },
    { isSubmit: true, score: score },
    function (err) {
      if (err) {
        console.error(err);
        res.status(500);
      }
    }
  );
  const rating = await Rating.findOne({ id: ratingId });

  console.info("Rating submitted, id ", rating.id);

  await res.status(200).send(rating);
});
