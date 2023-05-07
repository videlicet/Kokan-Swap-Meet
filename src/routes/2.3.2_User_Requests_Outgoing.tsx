import { useState, ChangeEvent, FormEvent } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/2.3.1–2_User_Requests.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import RequestOutgoing from '../components/RequestOutgoing.tsx'

import { mockRequests } from '../assets/mockRequests.tsx'
import { mockUserLoggedIn } from '../assets/mockUsers.tsx'

const alertDialogRequestContent = {
  title: 'Please confirm your withdrawel',
  description: 'Your swap request will be deleted. You can request the asset again after withdrawel.',
  button: {
    button: 'withdraw',
    confirm: 'withdraw',
    cancel: 'cancel'
  }
}

/* function component */
function UserRequestsIncoming(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('sdfsf')
  const [password, setPassword] = useState('')
  const [requests, setRequests] = useState(
    mockRequests.filter(
      (request) =>
        request.status == 'pending' &&
        request.requester == mockUserLoggedIn.user_id,
    ),
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    /*axios.post(
                "https://api.imgflip.com/caption_image",
                {
                    form: {
                        template_id: '181913649',
                        username: 'USERNAME',
                        password: 'PASSWORD',
                        text0: 'text0',
                        text1: 'text1',
                    },
                }
            )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });*/
    setUsername('')
    setPassword('')
  }

  function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  return (
    <div id='requests'>
      {requests.map((item, index) => (
        <RequestOutgoing requestProps={item} index={index} alertDialogRequestContent={alertDialogRequestContent}></RequestOutgoing>
      ))}
    </div>
  )
}

export default UserRequestsIncoming
