export interface UserInterface {
    username: string
    password: string
    email: string,
    email_verified: string
    first_name: string
    last_name: string
    kokans: number
    kokans_pending: number
    pictureURL: string
    created: string
    assets_count: number
    assets_count_offered: number
    requests_incoming_count_pending: number
    requests_outgoing_count_pending: number
  }
  
export interface AssetInterface {
    _id: string,
    title: string,
    tags: [string],
    gitHub_repo: string,
    kokans: number,
    created: string,
    creator: string,
    creator_username: string
    owners: [string],
    owners_usernames: [string],
    onOffer: boolean,
    description_short: string,
    description_long: string,
    licence: string,
    transaction_created: string,
    transaction_status: string
    transaction_requesters: string[]
}

export interface RequestInterface {
    _id: number,
    kokans: number,
    asset_id : string
    asset_data: AssetInterface
    requester: string
    requestee: string 
    created: string,
    status: string,
    requestees_username: string[],
    requester_username: string,
    requester_kokans: number
  }