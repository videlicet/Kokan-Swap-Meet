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

export interface RequestInterface {
    _id: number,
    kokans: number,
    asset_id : string | any, // "any" in case the asset_id is overwritten with a fetched object // still relevant? -> aggregation
    asset_data: any // TODO typing
    requester: string | any, // "any" in case the requester is overwritten with a fetched object
    requestee: string | any, // "any" in case the requestee is overwritten with a fetched object 
    created: string,
    status: string,
    requestees_username: string[],
    requester_username: string,
    requester_kokans: number
  }