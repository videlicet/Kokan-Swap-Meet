import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import date from 'date-and-time'

/* import styles */
import './User.css'

/* import context */
import { UserContext } from '../routes/1_App'

/* import types */
import { UserInterface } from '../types/types'

/* import components */
import ProfileAvatar from './ProfileAvatar'
import { NavLink } from 'react-router-dom'

/* types */
interface Props {
  userProps: UserInterface
  index: number
}

const User: React.FC<Props> = (props: Props) => {
  return (
    <div className='user' key={props.userProps.username}>
      <div className='top'>
        <NavLink to={`/users/${props.userProps.username}`}>
          <ProfileAvatar user={props.userProps}></ProfileAvatar>
        </NavLink>
      </div>
      <div className='bottom'>
        <NavLink to={`/users/${props.userProps.username}`}>
          <div>{props.userProps.username}</div>
        </NavLink>
      </div>
    </div>
  )
}
export default User
