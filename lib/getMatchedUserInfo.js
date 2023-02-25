const getMatchedUserInfo = (users, userLoggedIn) => {
    const newUser = { ...users };
    delete newUsers [userLoggedIn];

    const [id, user]= Object.entries(newUsers).flat();

    return {id, ...user};
};

export default getMatchedUserInfo;