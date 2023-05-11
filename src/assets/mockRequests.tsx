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
    asset_id : string,
    requester: string,
    requestee: string,
    created: string,
    status: string
  }