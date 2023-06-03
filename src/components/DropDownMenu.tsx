import { useNavigate } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

/* import styles */
import '../styles/1_App.css'
import './DropDownMenu.css'

/* types */
import { UserInterface } from '../types/types'
import { PersonIcon } from '@radix-ui/react-icons'

/* types */
interface Props {
  user: UserInterface
}

export default (props: Props) => {
  const navigate = useNavigate()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className='DropDownMenuTrigger' asChild>
        <div>
          <PersonIcon className='login-icon' />
          <span className='profile-username'>{props.user?.username}</span>
          {(props.user?.requests_incoming_count_pending > 0 ||
            props.user?.requests_outgoing_count_pending > 0) && (
            <div id='new-counter'></div>
          )}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className='DropDownMenuContent'>
          <DropdownMenu.Item
            className='DropdownMenuItem'
            onSelect={(e) => navigate(`user/${props.user?.username}/profile`)}
          >
            Profile
          </DropdownMenu.Item>
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
            onSelect={(e) => navigate('/logout')}
          >
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
