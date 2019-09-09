import * as HttpStatus from 'http-status-codes';

export const  graphQlErrors = {
    UNAUTHORIZED_ERROR: {
        errorCode: HttpStatus.UNAUTHORIZED,
        message: 'User Not Authenticated'
    },
    INVALID_REQUEST: {
        errorCode: HttpStatus.NOT_FOUND,
        message: 'Invalid Request Received'
    },
    USER_NOT_FOUND: {
        errorCode: HttpStatus.NOT_FOUND,
        message: 'User Not Found'
    }
};
