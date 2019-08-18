import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import Location from "../backend/models/Location";
import Employee from "../backend/models/Employee";

export const EmployeeType = new GraphQLObjectType({
    name: 'Employees',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        password: {type: GraphQLString},
        location: {
            type: LocationType,
            async resolve(parent, args) {
                return await Location.findOne({
                    id: parent['location']
                })
            }
        }
    })
});

export const LocationType = new GraphQLObjectType({
    name: 'Locations',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        pincode: { type: GraphQLInt },
        employees: {
            type: new GraphQLList(EmployeeType),
            async resolve(parent, args) {
                return await Employee.find({
                    location: parent['id']
                });
            }
        }
    })
});
