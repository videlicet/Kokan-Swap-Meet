export const mockRequests = [
    {
        transaction_id: 1,
        asset_id : 'asset_id',
        requester: 'user_id',
        requestee: 'user_id',
        transaction_created: 'DD/MM/YYYY',
        owners: ['user_id'],
        status: 'pending' // 'pending', 'declined', 'accepted'
    },
    {
        transaction_id: 2,
        asset_id : 'asset_id',
        requester: 'user_id',
        requestee: 'user_id',
        transaction_created: 'DD/MM/YYYY',
        owners: ['user_id'],
        status: 'pending' // 'pending', 'declined', 'accepted'
    },
    {
        transaction_id: 3,
        asset_id : 'asset_id',
        requester: 'user_id',
        requestee: 'user_id',
        transaction_created: 'DD/MM/YYYY',
        owners: ['user_id'],
        status: 'declined' // 'pending', 'declined', 'accepted'
    },
    {
        transaction_id: 4,
        asset_id : 'asset_id',
        requester: 'user_id',
        requestee: 'user_id',
        transaction_created: 'DD/MM/YYYY',
        owners: ['user_id'],
        status: 'accept' // 'pending', 'declined', 'accepted'
    }
]

export interface RequestInterface {
    transaction_id: number,
    asset_id : string,
    requester: string,
    requestee: string,
    transaction_created: string,
    owners: string[],
    status: string
  }