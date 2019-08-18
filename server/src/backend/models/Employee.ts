import { model, Schema } from 'mongoose';

const EmployeeScheme = new Schema({
    id: Number,
    name: String,
    location: Number,
    age: Number,
    password: String
});

export default model('Employee', EmployeeScheme);