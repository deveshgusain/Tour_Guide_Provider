import User from "./models/userModel";
import Place from "./models/placeModel";
import Guide from "./models/guideModel";
import Rating from "./models/ratingModel";
import Language from "./models/languageModel";
import State from "./models/stateModel";
import City from "./models/cityModel";
import Images from "./models/imageModel";
async function assembleState() {
  const places = await Place.find({});
  const guides = await Guide.find({});
  const ratings = await Rating.find({});
  const languageArray = await Language.find({});
  const stateArray = await State.find({});
  const cityArray = await City.find({});
  const users = await User.find({});
  const imageArray = await Images.find({});
  let images = {};
  for (const s in imageArray) {
    images[imageArray[s].placeId] = {
      header: imageArray[s].header,
      all: imageArray[s].all,
    };
  }
  let state = {};
  for (const s in stateArray) {
    state[stateArray[s].id] = stateArray[s].name;
  }
  let city = {};
  for (const s in cityArray) {
    city[cityArray[s].id] = {
      name: cityArray[s].name,
      stateId: cityArray[s].stateId,
    };
  }
  let languages = {};
  for (const s in languageArray) {
    languages[languageArray[s].id] = languageArray[s].name;
  }
  return {
    users,
    places,
    guides,
    ratings,
    languages,
    state,
    city,
    images,
  };
}

export const initialRoute = (app) => {
  app.post("/", async (req, res) => {
    const state = await assembleState();
    return res.send(state);
  });
};
