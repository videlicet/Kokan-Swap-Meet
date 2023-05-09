import profile_picture from './profile_picture.png'  // TD replace with pic

export const mockUserLoggedIn = {
    user_id: 'user_id', // TD should be a number, but a string for testing purposes bc it's used in a comparison in the user_requests routes where it's compared with a string
    loggedIn: true,
    username: "username",
    password: 'password',
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    kokans: 35,
    pictureURL: profile_picture,
    created: 'DDMMYYYY'
  }
  
export const mockUserLoggedOut = {
    user_id: 'user_id', // TD should be a number, but a string for testing purposes bc it's used in a comparison in the user_requests routes where it's compared with a string
    loggedIn: false,
    username: "username",
    password: 'password',
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    kokans: 35,
    pictureURL: './profile_picture.png',
    created: 'DDMMYYYY'
  }

  export interface UserInterface {
    user_id: string,
    loggedIn: boolean,
    username: string,
    password: string,
    email: string,
    first_name: string,
    last_name: string,
    kokans: number,
    pictureURL: string,
    created: string
  }