import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLID } from 'graphql';
import Location from '../backend/models/Location';
import Employee from '../backend/models/Employee';

export const EmployeeType = new GraphQLObjectType({
    name: 'Employees',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        password: {type: GraphQLID},
        location: {
            type: LocationType,
            async resolve(parent, args): Promise<unknown> {
                return await Location.findById(parent.location);
            }
        }
    })
});

export const LocationType = new GraphQLObjectType({
    name: 'Locations',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        pincode: { type: GraphQLInt },
        employees: {
            type: new GraphQLList(EmployeeType),
            async resolve(parent, args): Promise<unknown> {
                return await Employee.find({
                    location: parent.id
                });
            }
        }
    })
});

export const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        token: { type: GraphQLString },
    })
});
