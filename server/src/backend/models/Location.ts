import { model, Schema } from 'mongoose';

const LocationScheme = new Schema({
    name: String,
    pincode: Number,
    id: Number,
});

export default model('Location', LocationScheme);