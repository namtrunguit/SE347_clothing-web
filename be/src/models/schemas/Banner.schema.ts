import { ObjectId } from 'mongodb'

interface BannerType {
  _id?: ObjectId
  title: string
  subtitle?: string
  image_url: string
  alt_text?: string
  cta_text?: string
  cta_link?: string
  order?: number
  position: string
  is_active?: boolean
  created_at?: Date
  updated_at?: Date
}

export default class Banner {
  _id?: ObjectId
  title: string
  subtitle: string
  image_url: string
  alt_text: string
  cta_text: string
  cta_link: string
  order: number
  position: string
  is_active: boolean
  created_at: Date
  updated_at: Date

  constructor(banner: BannerType) {
    this._id = banner._id
    this.title = banner.title
    this.subtitle = banner.subtitle || ''
    this.image_url = banner.image_url
    this.alt_text = banner.alt_text || ''
    this.cta_text = banner.cta_text || ''
    this.cta_link = banner.cta_link || ''
    this.order = banner.order || 0
    this.position = banner.position
    this.is_active = banner.is_active !== undefined ? banner.is_active : true
    this.created_at = banner.created_at || new Date()
    this.updated_at = banner.updated_at || new Date()
  }
}

