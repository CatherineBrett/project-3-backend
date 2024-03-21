import mongoose from "mongoose";
import Tips from "../models/tips";
import Users from "../models/users";

const admin = {
  username: "admin",
  email: "admin@TrioMélange.com",
  password: "YJ#4x=tB",
};

const adviceData = [{
    name: "test",
    cohort: "test",
    vibe: "test",
    keyword: "test",
    description: "test"

}
]

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/games");
  await mongoose.connection.db.dropDatabase();
  const user = await Users.create(admin);
  adviceData.forEach((game: any) => (game.user = user));
  const tip = await Tips.create(adviceData);
  await mongoose.disconnect();
}

seed()