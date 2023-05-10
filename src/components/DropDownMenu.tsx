import { NavLink } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import '../styles/1_App.css'
import './DropDownMenu.css'

import { UserInterface } from '../assets/mockUsers'
import { PersonIcon } from '@radix-ui/react-icons'

interface propsInterface {
  user: UserInterface
}

export default (props: propsInterface) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <div style={{display: "flex", alignItems: "center"}}>
        <PersonIcon className='login_icon' />
        <span>{props.user?.username}</span>
        <div id='newCounter'></div> {/* TD Contition to check whether there are new messages */}
      </div>
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal style={{width: '100%'}}>
      <DropdownMenu.Content className='DropDownMenuContent'>
        <DropdownMenu.Item className='DropdownMenuItem'>
          <NavLink to={`user/${props.user?.username}/assets`}>Assets</NavLink>
        </DropdownMenu.Item>
        <DropdownMenu.Item className='DropdownMenuItem'>
          <NavLink to={`user/${props.user?.username}/requests/incoming`}>Requests</NavLink>
        </DropdownMenu.Item>
        <DropdownMenu.Item className='DropdownMenuItem'>
          <NavLink to={`user/${props.user?.username}/settings`}>Settings</NavLink>
        </DropdownMenu.Item>
        <DropdownMenu.Item className='DropdownMenuItem'>
          <NavLink to='/logout'>Logout</NavLink>
        </DropdownMenu.Item>

        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
)
