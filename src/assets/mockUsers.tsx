import profile_picture from './profile_picture.png'  // TD replace with pic

export const mockUserLoggedIn = {
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
    username: string,
    password: string,
    email: string,
    first_name: string,
    last_name: string,
    kokans: number,
    pictureURL: string,
    created: string
  }