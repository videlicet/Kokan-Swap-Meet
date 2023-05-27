export interface RequestInterface { //rename
    _id: number,
    kokans: number,
    asset_id : string | any, // "any" in case the asset_id is overwritten with a fetched object
    asset_data: any // TD typing
    requester: string | any, // "any" in case the requester is overwritten with a fetched object
    requestee: string | any, // "any" in case the requestee is overwritten with a fetched object 
    created: string,
    status: string,
    requestees_username: string[],
    requester_username: string,
    requester_kokans: number
  }