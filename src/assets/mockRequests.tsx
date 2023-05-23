export const mockRequests = [
    {
        _id: 1,
        asset_id : 'asset_id',
        requester: 'user_id',
        requestee: 'user_id',
        created: 'DD/MM/YYYY',
        status: 'pending' // 'pending', 'declined', 'accepted'
    },
    {
        _id: 2,
        asset_id : 'asset_id',
        requester: 'user_id',
        requestee: 'user_id',
        created: 'DD/MM/YYYY',
        status: 'pending' // 'pending', 'declined', 'accepted'
    },
    {
        _id: 3,
        asset_id : 'asset_id',
        requester: 'user_id',
        requestee: 'user_id',
        created: 'DD/MM/YYYY',
        status: 'declined' // 'pending', 'declined', 'accepted'
    },
    {
        _id: 4,
        asset_id : 'asset_id',
        requester: 'user_id',
        requestee: 'user_id',
        created: 'DD/MM/YYYY',
        status: 'accept' // 'pending', 'declined', 'accepted'
    }
]

export interface RequestInterface { //rename
    _id: number,
    asset_id : string | any, // "any" in case the asset_id is overwritten with a fetched object
    requester: string | any, // "any" in case the requester is overwritten with a fetched object
    requestee: string | any, // "any" in case the requestee is overwritten with a fetched object 
    created: string,
    status: string,
    requestees_username: string[],
    requester_username: string,
    asset_data: any // TD typing
  }