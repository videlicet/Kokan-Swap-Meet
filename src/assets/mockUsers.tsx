import profile_picture from './profile_picture.png'  // TD replace with pic

export const mockUserLoggedIn = {
    loggedIn: true,
    username: "username",
    name:'name',
    newCounter: 5,
    kokans: 35,
    pictureURL: profile_picture
  }
  
export const mockUserLoggedOut = {
    loggedIn: false,
    username: "username",
    name: 'name',
    newCounter: 5,
    pictureURL: './profile_picture.png'
  }