import mongoose from "mongoose";
import Tips, { ITip } from "../models/tips";
import Users, { IUser } from "../models/users";

const userData = [
  {
  username: "Admin",
  email: "admin@TrioMélange.com",
  password: "YJ#4x=tB",
  bio: "Our names are Conor, Michael and Catherine, and we created this app to help General Assembly students to get the most out of their courses.",
  isAdmin: true
  },
  {
  username: "Catherine Brett",
  email: "catherine@TrioMélange.com",
  password: "P@ssword1!",
  bio: "My name is Catherine and I am currently studying software engineering. I am part of the SEB-78 cohort, and so far I am particularly enjoying the back-end."
  },
  {
  username: "Conor Hamilton",
  email: "conor@TrioMélange.com",
  password: "P@ssword2!",
  bio: "I'm Conor and I'm in the SEB-78 cohort. I have enjoyed all aspects of the bootcamp so far and have a particular interest in the front-end."
  },
  {
  username: "Michael Broadbent",
  email: "michael@TrioMélange.com",
  password: "P@ssword3!",
  bio: "Hi there! My name is Michael and I am a member of the SEB-78 cohort which runs from January to April 2024. I'm interested in both the front and back end, so am currently figuring out which I'd prefer to specialise in!"
  },
]

const tipData = [
  {
    name: "Catherine Brett",
    cohort: "SEB-78",
    emoji: "study-tips",
    heading: "Daily Reviews",
    tip: "Try to find the time each evening to review that day's class material. It will make your evening lab much easier, and prepare you for the following day too.",
  },
  {
    name: "Conor Hamilton",
    cohort: "SEB-78",
    emoji: "staying-motivated",
    heading: "Time flies!",
    tip: "Twelve weeks can seem like forever when things are tough in week one, but it will get easier and the time will absolutely fly by!",
  },
  {
    name: "Michael Broadbent",
    cohort: "SEB-78",
    emoji: "self-care",
    heading: "Daylight",
    tip: "Try to get outside during daylight hours every day! You need that vitamin D.",
  },
  {
    name: "Catherine Brett",
    cohort: "SEB-78",
    emoji: "comic-relief",
    heading: "Stop pointing",
    tip: "Stop pointing at your screen when you're discussing your code - even if you're sharing your screen, nobody can see what you're pointing at 😆",
  },
   {
    name: "Michael Broadbent",
    cohort: "SEB-78",
    emoji: "staying-motivated",
    heading: "Don't panic!",
    tip: "Learning to program is not a linear process. You will find some days easier than others. Don't panic!",
  },
   {
    name: "Conor Hamilton",
    cohort: "SEB-78",
    emoji: "misc",
    heading: "Project notes",
    tip: "While you're doing your projects, make a note of what you've done each day as you go along - it will help you do your README at the end!",
  },
   {
    name: "Catherine Brett",
    cohort: "SEB-78",
    emoji: "self-care",
    heading: "Stay hydrated",
    tip: "Keep some water on your desk. You will find it much easier to concentrate if you're not dehydrated.",
  },
   {
    name: "Michael Broadbent",
    cohort: "SEB-78",
    emoji: "study-tips",
    heading: "MDN Web Docs",
    tip: "MDN Web Docs is an invaluable resource.",
  },
];

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/tipsdb");
  console.log("We are connected to the database!")
  await mongoose.connection.db.dropDatabase();
  console.log("Removed existing data.")
  const users = await Users.create(userData);
  console.log(users)

  // CB: Used "any" as placeholder types here. Ideally would use ITip and IUser, but they are currently failing the type checker - not sure why. Come back to this?
  tipData.forEach((tip: any) => {
    const user = users.find((user: any) => {
      return user.username === tip.name
    });
    tip.user = user;
  });
  const tips = await Tips.create(tipData);
  console.log("Here are the tips I have seeded the database with:")
  console.log(tips)
  console.log("Disconnecting...")
  await mongoose.disconnect();
}

seed();
