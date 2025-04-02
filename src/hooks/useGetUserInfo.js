export const useGetUserInfo = () => {
    const authData = localStorage.getItem("auth");

    // Ensure authData is not null before parsing
    const parsedAuth = authData ? JSON.parse(authData) : {};

    const { name = "", profilePhoto = "", userId = "", isAuth = false } = parsedAuth;

    return { name, profilePhoto, userId, isAuth };
};
