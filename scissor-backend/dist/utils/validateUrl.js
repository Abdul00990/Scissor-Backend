import { URL } from 'url';
export const isValidUrl = (urlString) => {
    try {
        new URL(urlString);
        return true;
    }
    catch (_a) {
        return false;
    }
};
