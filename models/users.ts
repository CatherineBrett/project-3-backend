import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import hidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'

export interface IUser {
    username: string,
    email: string,
    password: string,
    bio: string
    isAdmin?: boolean
}

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    bio: { type: String, required: true, },
    isAdmin: {type: Boolean }
})

userSchema.plugin(hidden, { hidden: { _id: true, password: true, email: true } } as any) // TODO: Do we need to hide bio/anything else?

userSchema.pre('save', function hashPassword(next) {
    console.log(this.password)
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    console.log(this.password)
    next()
})

userSchema.plugin(
    hidden({ defaultHidden: { password: true } })
)

userSchema.plugin(uniqueValidator)

export function validatePassword(loginPlaintextPassword: string, originalHashedPassword: string) {
    return bcrypt.compareSync(loginPlaintextPassword, originalHashedPassword)
}

export default mongoose.model('User', userSchema)