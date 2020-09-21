import { defaultState } from "./defaultState";
import "./connect-db";
import User from "./models/userModel";
import Place from "./models/placeModel";
import Visit from "./models/visitModel";
import Booked from "./models/bookedModel";
import Guide from "./models/guideModel";
import Rating from "./models/ratingModel";
import Language from "./models/languageModel";
import State from "./models/stateModel";
import City from "./models/cityModel";
import Image from "./models/imageModel";

async function initializeDB() {
  const Preuser = await User.findOne({ username: "test" });
  if (!Preuser) {
    for (const user in defaultState.users) {
      const newUser = new User(defaultState.users[user]);
      await newUser.save();
    }
    for (const place in defaultState.places) {
      const newPlace = new Place(defaultState.places[place]);
      await newPlace.save();
    }
    for (const visit in defaultState.visits) {
      const newVisit = new Visit(defaultState.visits[visit]);
      await newVisit.save();
    }
    for (const book in defaultState.booked) {
      const newBook = new Booked(defaultState.booked[book]);
      await newBook.save();
    }
    for (const guide in defaultState.guides) {
      const newGuide = new Guide(defaultState.guides[guide]);
      await newGuide.save();
    }
    for (const rating in defaultState.ratings) {
      const newRating = new Rating(defaultState.ratings[rating]);
      await newRating.save();
    }
    for (const langauge in defaultState.languages) {
      const newLanguage = new Language(defaultState.languages[langauge]);
      await newLanguage.save();
    }
    for (const state in defaultState.state) {
      const newState = new State(defaultState.state[state]);
      await newState.save();
    }
    for (const city in defaultState.city) {
      const newCity = new City(defaultState.city[city]);
      await newCity.save();
    }
    for (const image in defaultState.images) {
      const newImage = new Image(defaultState.images[image]);
      await newImage.save();
    }
  }
}
initializeDB();
