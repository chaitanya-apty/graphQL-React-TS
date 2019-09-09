import * as HttpStatus from 'http-status-codes';

export const  appErrors = {
    SERVER_ERROR: {
        errorCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Server Unavailable'
    },
    EXCEPTION_OCCURED: {
        errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed Request @ Server'
    },
    DATA_BASE_ERROR: {
        errorCode: HttpStatus.FAILED_DEPENDENCY,
        message: 'Database Failure'
    }
};
