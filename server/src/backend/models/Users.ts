import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    username: String,
    password: String
});

export default model('User', UserSchema);
