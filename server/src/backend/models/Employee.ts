import { model, Schema } from 'mongoose';

const EmployeeScheme = new Schema({
    name: String,
    location: String,
    age: Number,
    password: String
});

export default model('Employee', EmployeeScheme);
