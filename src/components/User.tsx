import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'

/* import styles */
import './Asset.css'

/* import context */
import { UserContext } from '../routes/1_App'

/* import types */
import { UserInterface } from '../types/types'

/* import components */

/* types */
interface Props {
  userProps: UserInterface
  index: number
}

const User: React.FC<Props> = (props: Props) => {

  return (
    <div className='asset' key={props.userProps.username}>
    </div>
  )
}
export default User
