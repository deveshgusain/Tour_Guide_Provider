import md5 from "md5";
import User from "./models/userModel";
import Visit from "./models/visitModel";
import Booked from "./models/bookedModel";

async function assembleUserState(user, username) {
  const visits = await Visit.find({ user: username }).exec();
  const booked = await Booked.find({ user: username }).exec();
  let guideVisits = [];
  let guideBooked = [];
  if (user.role === "guide") {
    guideVisits = await Visit.find({ guideIds: username }).exec();
    guideBooked = await Booked.find({ guideIds: username }).exec();
  }
  return {
    user,
    visits,
    booked,
    guideVisits,
    guideBooked,
  };
}

export const authenticationRoute = (app) => {
  app.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    let query = { username: username };
    await User.findOne(query, async (err, user) => {
      if (err) {
        return res.send(err);
      } else {
        if (user === null) {
          return res.status(500).send("User Not found");
        }
        if (md5(password) !== user.passwordHash) {
          return res.status(500).send("Password did not  match");
        }
        const state = await assembleUserState(user, username);
        return res.send({ state });
      }
    });
  });
};
