import md5 from "md5";
import User from "./models/userModel";
import Visit from "./models/visitModel";
import Booked from "./models/bookedModel";

async function assembleUserState(user) {
  const visits = await Visit.find({ user: user.username }).exec();
  const booked = await Booked.find({ user: user.username }).exec();
  let guideVisits = [];
  let guideBooked = [];
  if (user.role === "guide") {
    guideVisits = await Visit.find({ guideIds: user.username }).exec();
    guideBooked = await Booked.find({ guideIds: user.username }).exec();
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
    const { email, password } = req.body;
    let query = { email: email };
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
        const state = await assembleUserState(user);
        return res.send({ state });
      }
    });
  });
  app.post("/user/new", async (req, res) => {
    const { name, username, password, email, phoneNo, role } = req.body;
    let query = { email: email };
    await User.findOne(query, async (err, user) => {
      if (err) {
        return res.send(err);
      } else {
        if (user) {
          return res.status(500).send({ massage: "User Already Found" });
        }
        const passwordHash = md5(password);
        let newUser = { name, username, passwordHash, email, phoneNo, role };
        newUser = new User(newUser);
        await newUser.save();
        const state = await assembleUserState(newUser);
        return res.send({ state });
      }
    });
  });
};
