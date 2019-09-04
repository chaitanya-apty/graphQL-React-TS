import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLScalarType, GraphQLNonNull } from 'graphql';
import { EmployeeType, LocationType } from '../../types/graphql-schema';
import Employee from '../../backend/models/Employee';
import Location from '../../backend/models/Location';
import { Document, DocumentQuery } from 'mongoose';

const isValid = (type: GraphQLScalarType) => new GraphQLNonNull(type);

export const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                name: { type: isValid(GraphQLString) },
                location: { type: isValid(GraphQLID) },
                age: { type: isValid(GraphQLInt) },
                password: { type: GraphQLString }
            },
            async resolve(source, args): Promise<Document> {
                const employee = new Employee({ ...args });
                return await employee.save();
            }
        },
        addLocation: {
            type: LocationType,
            args: {
                name: { type: isValid(GraphQLString) },
                pincode: { type: isValid(GraphQLInt) },
            },
            async resolve(source, args, context): Promise<Document> {
                const location = new Location({ ...args });
                return await location.save();
            }
        },
        deleteEmployee: {
            type: EmployeeType,
            args: {
                id: { type: isValid(GraphQLID) },
            },
            resolve(source, args): DocumentQuery<Document, Document, {}> {
                return Employee.findByIdAndDelete(args.id);
            }
        }
    }
});
