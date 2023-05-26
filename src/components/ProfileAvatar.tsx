import React from 'react'
import * as Avatar from '@radix-ui/react-avatar'
import './ProfileAvatar.css'

interface profilePicture {
  otherUser?: any
  user?: {
    username: string
    first_name: string
    last_name: string
    pictureURL: string
  }
}

const ProfileAvatar: React.FC<profilePicture> = (props: profilePicture) => {
  return (
  <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
    <Avatar.Root className='AvatarRoot'>
      <Avatar.Image
        className='AvatarImage'
        src={props.otherUser?.pictureURL || props.user?.pictureURL}
        alt={props.otherUser?.username || props.user?.username}
      />
      <Avatar.Fallback className='AvatarFallback'>
        <div>
        {props.otherUser?.first_name[0] + props.otherUser?.last_name[0] ||
            props.user?.first_name[0] + props.user?.last_name[0]}
        </div>
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
)}

export default ProfileAvatar
