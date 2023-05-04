import React from 'react'
import * as Avatar from '@radix-ui/react-avatar'
import './Avatar.css'

interface profilePicture {
  src: string
  name: string
}

const ProfileAvatar: React.FC<profilePicture> = (props: profilePicture) => (
  <div style={{ display: 'flex', gap: 20 }}>
    <Avatar.Root className='AvatarRoot'>
      <Avatar.Image className='AvatarImage' src={props.src} alt={props.name} />
      <Avatar.Fallback className='AvatarFallback' delayMs={600}>
        TD_FALLBACK{/* here abbreviation of firstname and lastname*/}
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
)

export default ProfileAvatar
