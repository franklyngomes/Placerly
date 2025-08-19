export interface BannerResponse {
  data: {
    createdAt: string,
    description: string,
    primaryImage: string,
    secondaryImage: string,
    status: boolean,
    subtitle: string,
    updatedAt?: string,
    __v?: number,
    title: string,
    _id: string,
  }
}
export interface AboutResponse {
  data: {
    createdAt: string,
    descriptionOne: string,
    descriptionTwo: string,
    image: string,
    mission: string,
    status: boolean,
    title: string,
    updatedAt: string,
    values: [string],
    __v: number,
    _id: string
  }
}
