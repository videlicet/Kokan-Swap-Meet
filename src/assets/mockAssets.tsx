export interface AssetInterface {
    _id: string,
    title: string,
    gitHub_repo: string,
    kokans: number,
    created: string,
    creator: string,
    creator_username: string
    owners: [string],
    owners_usernames: [string],
    onOffer: boolean,
    type: [string],
    description_short: string,
    description_long: string,
    licence: string,
    transaction_created: string,
    transaction_status: string
  }