import mongoose, { Schema } from "mongoose"
// MB - possibly add mongoose unique validator

// MB - added a new ITip interface to address the TS linting errors in tipController.
interface ITip {
    name: string,
    cohort: string,
    emoji: string,
    heading: string,
    tip: string,
    user: mongoose.Schema.Types.ObjectId
}

const tipSchema: Schema<ITip> = new mongoose.Schema<ITip>({
    name: { type: String, required: true },
    cohort: { type: String, required: true },
    emoji: { type: String, required: true },
    heading: { type: String },
    tip: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

export default mongoose.model<ITip>("Tip", tipSchema)