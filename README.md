# General Assembly Project 3: Bootcamp Buddy

## Description

At the end of the third of four modules, I worked in a group of three to build a full-stack (MERN) application. We built our own backend and frontend using MongoDB, Express, React and Node.js. We were given one week to complete the project. My teammates were Michael Broadbent and Conor Hamilton.

## Deployment Link

You can find our project [here](https://bootcamp-buddy.netlify.app/).

To access the full deployed project, please use the following login details:

**Email**: a.user@bootcampbuddy.com

**Password**: M@tb0okbike

## Getting Started/Code Installation

- Make sure you have [Node.js](https://nodejs.org/en/download) and [npm](https://www.npmjs.com/package/npm) installed
- You will also need [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-install-mdb-community-macos) installed and running
- Clone both the frontend and backend repos
- For each repo, run `npm install` in your terminal
- In the backend repo, there is a seed file that can be run with `npm run seed` to pre-populate the database
- In order to run locally, you will need to create a `.env` file in your frontend, containing the following: `VITE_APP_URL=/api`
- To start the frontend and backend, run `npm run dev` in each repo

## Technologies Used

- VS Code
- Git / GitHub
- Node.js
- Vite
- TypeScript / TSX
- React
- React Router
- Tailwind
- Express
- Mongoose
- MongoDB / Compass / Atlas
- Insomnia
- Netlify

## Brief

- Work in a team, using Git to code collaboratively.
- Build a full-stack application by making your own backend and your own frontend.
- Use an Express API with Mongoose to serve your data from a Mongo database.
- Consume your API with a separate frontend built with React.
- Build a complete product with multiple relationships and CRUD functionality.
- Implement thoughtful user stories/wireframes.
- Deploy your project online so it's publicly accessible.

## Planning

We began by discussing some ideas and decided to go with mine - an app for General Assembly students past and present to share advice on getting the most out of their courses. We discussed what a member/visitor would be able to do, and what our MVP would comprise vs. what were stretch goals. We produced a wireframe, firstly for the [frontend](https://github.com/CatherineBrett/project-3-frontend/blob/main/wireframe/frontend-wireframe.png), and then for the [backend](https://github.com/CatherineBrett/project-3-backend/blob/main/wireframe/backend-wireframe.png), and decided to use Trello to help organise ourselves, and a Zoom breakout room / Slack chat to stay in touch throughout the project.

## Build/Code Process

On Day One, I created the two repos with an initial commit of the starter code, and Conor and Michael cloned them. Together with me driving and the others navigating, we set up skeletons for both the frontend and backend, with the appropriate folders and files.

We then worked independently to produce some boilerplate for the backend. I took responsibility for the `tipController`, with functions for the endpoints we were going to need. As this relied on a model, I also wrote the tips model.

On Day Two we continued to work on separate parts of the app. I added imports, middleware etc. and a `start` function to the `index.ts`, and then successfully connected to and seeded the database via the seed file Conor had written the day before. As a group we then tested all the endpoints in Insomnia, and added a missing bio field for when the user signs up.

Later, we moved to the frontend, each of us taking a couple of components to flesh out. I wrote the `TipsList` component (minus styling for now), the `ITip` interface, and a first draft of the `Tip` component (minus styling, and minus the user’s bio information as we hadn’t yet agreed where to display it). We then had a “merge party” where we resolved some merge conflicts.

On Day Four (Sunday), I did some React revision to improve my confidence ahead of the upcoming week, reviewing bootcamp lectures and making notes/a diagram of how components typically relate to one another with imports, exports, props and rendering.

On Day Five, I added a route for Sign Up, updated the `CreateTip` component’s styling to match Michael’s forms, and created a `<select>` element for the user to pick a category for their advice:

```
<select
  {/* snip */}
>
  <option value="" disabled>
    - Pick a category -
  </option>
  <option value="study-tips">Study tips 📚</option>
  <option value="staying-motivated">Staying motivated 💪</option>
  <option value="self-care">Looking after yourself 🧘‍♀️</option>
  <option value="comic-relief">Comic relief! 🤣</option>
  <option value="misc">Miscellaneous 💡</option>
</select>
```

I then created an `IEmoji` interface, imported it into the `Tip` component, and created an `emojis` object whose keys matched the values I’d given to each of the `<select>` element’s options:

```
const emojis: IEmoji = {
  "study-tips": "📚",
  "staying-motivated": "💪",
  "self-care": "🧘‍♀️",
  "comic-relief": "🤣",
  "misc": "💡",
};
```

Using `emojis[emoji]`, I was then able to dynamically access the corresponding values – the emojis themselves – to render the correct one on each card, as its image. I also needed to update the emoji’s type in the `ITip` interface as it was no longer just a string, but one of five specific strings (the emoji object’s keys).

Next, I added character limits to the Bio and Your Advice fields, and also changed them from `<input>` elements to `<textarea>` elements. Then I updated the seed file to seed the database with me, Michael and Conor as users in addition to the original admin user. I also wrote 8 tips to seed the database with, as the styling had the advice cards in four columns, and therefore whenever we cleaned up the database after adding, removing or editing things during testing, we would always want to reinstate two rows of proper tips, so the page looked complete/tidy. I also associated each tip with its “creator”:

```
tipData.forEach((tip: any) => {
  const user = users.find((user: any) => {
    return user.username === tip.name;
  });
  tip.user = user;
});
```

To kick us off on Day Six, I suggested we go through the wireframe and make a fresh list of everything that still needed doing from an MVP perspective, what stretch goals remained, and any revisions we wanted to make to either. We then split off to work separately. I wrote some initial blurb for the homepage, which I gave to Conor who was doing its styling.

I added an `id` to all the inputs on the Sign Up and Log In forms. Next, I looked at adding a dynamic character counter to any fields with a character limit, and particularly enjoyed figuring out the logic for this (see “Wins” below).

Later, I wrote an `EditTip` component so that anyone who contributed a piece of advice also had the option to edit it. I then worked on fixing an issue with the delete button which was only meant to show for either the person who had created a piece of advice or the admin user, but was currently showing (although not functioning) for everyone. I did this by adding the user’s ID to the tip in the `getSingleTipById` function, and by commenting out the `getUsers` handler from the router file, as I could see from the console that it must be firing the (unused) function to get all users, and therefore returning all users instead of the specific one we wanted.

I then added a link through to the new “Edit Advice” page, which showed only for the tip’s creator:

```
{tip &&
  (user?._id === tip.user._id) && (
    <div className="mt-4"><Link
      to={"/advice/edit/" + tipId}
      className="bg-blue-500 text-white px-10 py-2 rounded-full hover:bg-red-400 text-sm"
    >
      Edit Tip
    </Link></div>
  )}
```

Lastly, I fixed an issue with the delete button, which wasn’t working as it should for the admin user. We had overlooked the fact that the admin user’s ID would change each time the database was reseeded, and so it wasn’t possible to hardcode their ID when allowing access to the delete button’s functionality. I therefore gave the admin user an `isAdmin: true` property and used this instead.

On the morning of Day Seven, after a group discussion about how best to spend our last day before deployment, I fixed a problem with the delete button, which still wasn’t working as it should for the admin user because I hadn’t updated the `deleteTip` function in the backend, so it was still attempting to use the admin user’s changeable ID as opposed to the new `isAdmin` boolean.

That afternoon we decided there was just about time to add a user account page, where a user could update some of their details. We began by mob programming, and then split off to work individually. We agreed that I would write the logic for the component as it would be fairly similar to the `EditTip` component I had already written. I would have it render similar TSX and the same styling as the `EditTip` component for the time being. Conor worked separately on styling the page slightly differently, with a view to incorporating that styling with my logic once he’d finished.

In the evening, I went through the app as a visitor/ordinary user/admin user to see if there were any obvious oversights, or any bugs or problems to fix ahead of deployment, and saw that the error handling was missing from some of the forms. With the time I had available, I managed to add it to the `CreateTip` component (see Wins).

## Challenges

Working with Git/GitHub as a group was quite challenging as this was new to us and we obviously encountered some merge conflicts. In order to minimise these conflicts while we were still learning, we tried each session to work in separate files, and to let each other know if we found we needed to work in files we hadn’t planned to. When we pushed our code, we had “merge parties” so that we could resolve any merge conflicts together.

## Wins

I particularly enjoyed figuring out how to add a dynamic character counter to any fields with a character limit. After looking for ideas online, I created some state for the count, and then used the `handleChange` function to set the count to the `e.target.value.length` so that it would update as the user was typing. At first, all the counters were increasing at the same time, regardless of which field was being updated. To make them work independently of each other, I targeted each one's `id` property.

```
<label
  htmlFor="tip"
  className="block text-sm font-medium text-gray-700"
>
  {`Your Advice (${adviceCharCount}/200)`}
</label>
```

```
const [adviceCharCount, setAdviceCharCount] = useState(0);
const [headingCharCount, setHeadingCharCount] = useState(0);
```

```
if (e.target.id === "heading") {
  setHeadingCharCount(e.target.value.length);
}
if (e.target.id === "tip") {
  setAdviceCharCount(e.target.value.length);
}
```

Adding error handling to the Give Advice page was also a win, as I struggled initially to get more than one error to show at a time on the page. To fix this issue, I created an empty `errors` object and then added properties to it as the user filled in the form, if they neglected to complete a field:

```
const errors: any = {};
const { name, cohort, emoji, heading, tip } = req.body;
if (!name) {
  errors.name = "Name is required";
}
if (!cohort) {
  errors.cohort = "Cohort is required";
}
if (!emoji) {
  errors.emoji = "Advice Category is required";
}
if (!heading) {
  errors.heading = "Heading is required";
}
if (!tip) {
  errors.tip = "Your Advice is required";
}
```

Then at the end, I used the `Object.keys` method on the `errors` object to determine if the object was still empty. If `Object.keys(errors).length` evaluated to true, then the `errors` object would be sent in the response, and the error data held in state in the `CreateTip` component – initially empty strings – would be updated in one go when the `handleSubmit` function was fired.

## Key Learnings/Takeaways

- This project helped me to feel more confident with React, and with how components typically relate to one another with imports, exports, props and rendering.

- That said, I particularly enjoyed the backend module leading up to this full-stack project, and working on the app reinforced my preference for the backend.

- Gaining a better understanding of Git would give me more confidence in future when working with others on the same code base.

## Bugs

- If a user omits the `https://` at the start of their LinkedIn profile link, then clicking on the logo currently opens up another Bootcamp Buddy tab, rather than their LinkedIn page.

## Future Improvements

Improvements I would make to this project include:

- Fixing the bug above

- Adding error handling in all the appropriate places, and unifying the existing error handling to match that of the `CreateTip` component. (This would also prevent users from submitting an edited tip without completing all the fields, which they are currently able to do.)

- Tidying up and simplifying/unifying some of the styling

- Adding the ability for a user to change their email address and password, and to delete their account
