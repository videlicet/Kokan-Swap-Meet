import { NavLink, useNavigate } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import '../styles/1_App.css'
import './DropDownMenu.css'

import { UserInterface } from '../assets/mockUsers'
import { PersonIcon } from '@radix-ui/react-icons'

interface propsInterface {
  user: UserInterface
}

export default (props: propsInterface) => {
  const navigate = useNavigate()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon className='login_icon' />
          <span>{props.user?.username}</span>
          <div id='newCounter'></div>{' '}
          {/* TD Contition to check whether there are new messages */}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className='DropDownMenuContent'>
          <DropdownMenu.Item
            className='DropdownMenuItem'
            onSelect={(e) => navigate(`user/${props.user?.username}/assets`)}
          >
            Assets
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className='DropdownMenuItem'
            onSelect={(e) =>
              navigate(`user/${props.user?.username}/requests/incoming`)
            }
          >
            Requests
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className='DropdownMenuItem'
            onSelect={(e) => navigate(`user/${props.user?.username}/settings`)}
          >
            Settings
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className='DropdownMenuItem'
            onSelect={(e) => navigate('/logout')}
          >
            Logout
          </DropdownMenu.Item>

          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
