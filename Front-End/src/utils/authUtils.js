import Cookies from 'js-cookie';

export const getUser = () => {
    try {
        return JSON.parse(Cookies.get("user") || "{}");
    } catch {
        return {};
    }
};

export const getToken = () => Cookies.get("token");

export const logout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
};
