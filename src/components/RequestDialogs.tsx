export const alertDialogRequestContentAccept = {
  title: 'Please confirm the swap request of your asset',
  description: 'Your asset will be co-owned by you and the requester.',
  button: {
    button: 'accept',
    confirm: 'accept',
    cancel: 'cancel',
  },
}

export const alertDialogRequestContentDecline = {
  title: 'Please confirm you want to declien this swap request',
  description: 'The requester may request the asset again.',
  button: {
    button: 'decline',
    confirm: 'decline',
    cancel: 'cancel',
  },
}

export const alertDialogRequestContentDelete = {
  title: 'Please confirm your withdrawel',
  description:
    'Your swap request will be deleted. You can request the asset again after withdrawel.',
  button: {
    button: 'withdraw',
    confirm: 'withdraw',
    cancel: 'cancel',
  },
}
