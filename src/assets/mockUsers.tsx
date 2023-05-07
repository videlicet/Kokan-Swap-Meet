import profile_picture from './profile_picture.png'  // TD replace with pic

export const mockUserLoggedIn = {
    user_id: 'user_id', // TD should be a number, but a string for testing purposes bc it's used in a comparison in the user_requests routes where it's compared with a string
    loggedIn: true,
    username: "username",
    name:'name',
    newCounter: 5,
    kokans: 35,
    pictureURL: profile_picture
  }
  
export const mockUserLoggedOut = {
    user_id: 'user_id', // TD should be a number, but a string for testing purposes bc it's used in a comparison in the user_requests routes where it's compared with a string
    loggedIn: false,
    username: "username",
    name: 'name',
    newCounter: 5,
    pictureURL: './profile_picture.png'
  }

  export interface UserInterface {
    user_id: string,
    loggedIn: boolean,
    username: string,
    name: string,
    newCounter: number,
    kokans: number,
    pictureURL: string
  }