export const handleApiError = (err: any): string => {
    if (err.code === 'ECONNABORTED') {
        return 'Request timed out';
    } else if (err.code === 'ERR_BAD_REQUEST') {
        return 'Bad Request';
    } else if (err.code === 'ERR_INVALID_URL') {
        return 'Invalid URL';
    } else {
        return err.message || 'An unknown error occurred';
    }
};
