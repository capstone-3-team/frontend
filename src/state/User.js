import { atom } from "recoil";

export default atom({
    key: 'User',
    default: {
        token: "thinklikeloggedin",
        googleName: "alphaorderly",
        googleId: "alphasession",
        profilePicture: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png",
    }
})