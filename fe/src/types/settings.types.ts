export interface Settings {
  general: {
    store_name: string
    store_email: string
    store_phone?: string
    store_address?: string
    logo_url?: string
  }
  payment?: {
    methods: string[]
    [key: string]: any
  }
  shipping?: {
    methods: any[]
    rates: any[]
    [key: string]: any
  }
}

