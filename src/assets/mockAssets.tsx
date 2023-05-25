export interface AssetInterface {
    _id: string,
    title: string,
    kokans: number,
    created: string,
    creator: string,
    owners: [string],
    onOffer: boolean,
    type: [string],
    description_short: string,
    description_long: string,
    licence: string,
    aliases: {owners: [string], creator: string}
  }