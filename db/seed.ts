import mongoose from "mongoose";
import Tips from "../models/tips";
import Users from "../models/users";

const admin = {
  username: "admin",
  email: "admin@TrioMélange.com",
  password: "YJ#4x=tB",
  bio: "Our names are Conor, Michael and Catherine, and we created this app to help General Assembly students to get the most out of their courses."
};

const tipData = [
  {
    name: "test1",
    cohort: "test1",
    emoji: "test1",
    heading: "test1",
    tip: "test1",
  },
  {
    name: "test2",
    cohort: "test2",
    emoji: "test2",
    heading: "test2",
    tip: "test2",
  },

];

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/tipsdb");
  console.log("We are connected to the database!")
  await mongoose.connection.db.dropDatabase();
  console.log("Removed existing data.")
  const user = await Users.create(admin);
  console.log(user)

  tipData.forEach((tip: any) => (tip.user = user));
  const tips = await Tips.create(tipData);
  console.log("Here are the tips I have seeded the database with:")
  console.log(tips)
  console.log("Disconnecting...")
  await mongoose.disconnect();
}

seed();
