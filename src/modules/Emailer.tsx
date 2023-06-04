export async function sendVerificationEmail(username: string, email: string) {
  try {
    await fetch(`${import.meta.env.VITE_SERVER_URL}emails/signup/submit`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({
        username: username,
        email: email,
      }),
    })
  } catch (err) {
    // TODO ERROR HANDLING
  }
}
