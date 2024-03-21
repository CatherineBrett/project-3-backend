import mongoose, { Schema } from "mongoose"

// TODO: ITip interface and add it in the necessary places below

const tipSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    cohort: { type: String, required: true },
    emoji: { type: String, required: true },
    heading: { type: String },
    advice: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, re: "User", required: true }

})

export default mongoose.model("Tip", tipSchema)