// Product types
export interface Product {
  _id: string
  name: string
  slug: string
  image: string
  images?: string[]
  description?: string
  category: Category | string
  price: number
  price_before_discount?: number
  quantity: number
  sold?: number
  view?: number
  rating?: number
  colors?: string[]
  sizes?: string[]
  is_featured?: boolean
  created_at?: string
  updated_at?: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image?: string
  description?: string
  is_featured?: boolean
  created_at?: string
  updated_at?: string
}

export interface ProductVariant {
  color?: string
  size?: string
}

export interface ProductFilters {
  page?: number
  limit?: number
  category_slug?: string
  name?: string
  sort_by?: 'price' | 'createdAt' | 'created_at' | 'sold' | 'view' | 'rating'
  order?: 'asc' | 'desc'
  price_min?: number
  price_max?: number
  rating_filter?: number
  is_featured?: boolean
}

export interface Banner {
  _id?: string
  id?: string | number
  title?: string
  subtitle?: string
  image: string
  image_url?: string
  link?: string
  cta_text?: string
  position?: string
  is_active?: boolean
  order?: number
  created_at?: string
  updated_at?: string
}

