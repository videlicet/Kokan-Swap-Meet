export async function getUserRequests(
  user: any,
  requests: any, // TD typing
  criterion: string,
  setLoading?: any,
) {
  // TD typing
  setLoading(true)
  let query: any = {} // TD typing
  /* getUserRequests is used by two client functions that query different documents */
  switch (criterion) {
    case 'requester':
      query = { query: 'requester', user: { _id: user._id } }
      break
    case 'requestee':
      query = { query: 'requestee', user: { _id: user._id } }
      break
  }
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}users/${user.username}/requests`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      },
    )
    if (res.status == 200) {
      const userRequest = await res.json()

      /* aggregate a transactions with the relevant usernames of requester and requestees and the gitHub repo name */
      let userRequestUpdated = await Promise.all(
        userRequest.map(async (request: any) => {
          const [aggregatedTransactions] = await aggregateTransactions(
            request._id,
          )
          return aggregatedTransactions
        }),
      )
      requests.current = userRequestUpdated
      setLoading(false)
    }
  } catch (error) {
    //errorHandling
  }
}

async function aggregateTransactions(transaction_id: any) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}transactions/test/users`,
      {
        // TD remove "test"
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ transaction_id: transaction_id }),
      },
    )
    let aggregatedTransaction = await res.json()
    return aggregatedTransaction
  } catch (err) {
    console.log('Aggregation failed')
  }
}
