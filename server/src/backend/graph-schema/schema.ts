import { compare } from 'bcryptjs';

import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import { EmployeeType, LocationType, User } from '../../types/graphql-schema';
import { Mutation } from './mutation';
import Employee from '../../backend/models/Employee';
import Location from '../../backend/models/Location';
import Users from '../../backend/models/Users';
import { graphQlErrors } from '../../utils/errors/graphQlErrors';
import { checkRequest } from '../../utils/env-helpers';

const RootQuery = new GraphQLObjectType({
    name: 'EmployeeLocation',
    fields: {
        employee: {
            type: EmployeeType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args, request) {
                if (checkRequest(request.reply)) {
                    throw graphQlErrors.UNAUTHORIZED_ERROR;
                }
                return Employee.findById(args.id);
            }
        },
        location: {
            type: LocationType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args, request) {
                if (checkRequest(request.reply)) {
                    throw graphQlErrors.UNAUTHORIZED_ERROR;
                }
                return await Location.findById(args.id);
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            async resolve(parent, args, context) {
                if (checkRequest(context.reply)) {
                    throw graphQlErrors.UNAUTHORIZED_ERROR;
                }

                return await Employee.find();
            }
        },
        locations: {
            type: new GraphQLList(LocationType),
            async resolve(parent, args, request) {
                if (checkRequest(request.reply)) {
                    throw graphQlErrors.UNAUTHORIZED_ERROR;
                }
                return await Location.find();
            }
        },
        login: {
            type: User,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, context) {
                // Check Chaitu exits
                const serverInstance = context.app;
                const user = await Users.findOne({ username: args['username'] });
                if (!user) { throw graphQlErrors.USER_NOT_FOUND.errorCode; }

                const validPassword = await compare(args['password'], user['password']);
                if (!validPassword) { throw graphQlErrors.INVALID_REQUEST.errorCode; }
                const token = serverInstance.jwt.sign({ user }, { expiresIn: '10h' });
                return { username: args['username'], token };
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
