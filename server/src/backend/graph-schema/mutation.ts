import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLScalarType, GraphQLNonNull } from 'graphql';
import { EmployeeType, LocationType } from '../../types/graphql-schema';
import Employee from '../../backend/models/Employee';
import Location from '../../backend/models/Location';
import { Document } from 'mongoose';

const notNull = (type: GraphQLScalarType) => new GraphQLNonNull(type);

export const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                id: { type: notNull(GraphQLID) },
                name: { type: notNull(GraphQLString) },
                location: { type: notNull(GraphQLID) },
                age: { type: notNull(GraphQLInt) },
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
                id: { type: notNull(GraphQLID) },
                name: { type: notNull(GraphQLString) },
                pincode: { type: notNull(GraphQLInt) },
            },
            async resolve(source, args): Promise<Document> {
                const location = new Location({ ...args });
                return await location.save();
            }
        }
    }
});
