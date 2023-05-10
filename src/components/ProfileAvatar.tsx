import React from 'react'
import * as Avatar from '@radix-ui/react-avatar'
import './ProfileAvatar.css'

interface profilePicture {
  user: {
    username: string,
    first_name: string;
    last_name: string;
    pictureURL: string;
  }
}

const ProfileAvatar: React.FC<profilePicture> = (props: profilePicture) => (
  <div style={{ display: 'flex', gap: 20 }}>
    <Avatar.Root className='AvatarRoot'>
    <Avatar.Image className='AvatarImage' src={props.user.pictureURL} alt={props.user.username} />
      <Avatar.Fallback className='AvatarFallback' delayMs={600}>
       <div>{props.user.first_name[0]+props.user.last_name[0]}</div>
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
)

export default ProfileAvatar
