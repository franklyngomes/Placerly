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

export interface PricingItem {
  createdAt: string,
  description: string,
  features: [string],
  planName: string,
  price: number,
  updatedAt: string,
  __v: number,
  _id: string
}
export interface PricingResponse {
  data: PricingItem[]
}
export interface ServiceItem {
  createdAt: string,
  description: string,
  image: string,
  title: string,
  updatedAt: string,
  url: string,
  __v: number
  _id: string
}
export interface ServiceResponse {
  data: ServiceItem[]
}
export interface TestimonialItem {
  author: string,
  comment: string,
  createdAt: string,
  designation: string,
  image: string,
  updatedAt: string,
  __v: number,
  _id: string
}
export interface TestimonialResponse {
  data: TestimonialItem[]
}
export interface FAQitem {
  answer: string,
  createdAt: string,
  question: string,
  updatedAt: string,
  __v: number,
  _id: string
}
export interface FAQResponse{
  data: FAQitem[]
}