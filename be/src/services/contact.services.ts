import databaseServices from './database.services'

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

class ContactService {
  async submit(payload: ContactPayload) {
    try {
      console.log('[ContactService] Submitting contact:', { name: payload.name, email: payload.email })
      
      const doc = {
        name: payload.name,
        email: payload.email,
        phone: payload.phone || '',
        subject: payload.subject || 'Liên hệ từ khách hàng',
        message: payload.message,
        status: 'new',
        created_at: new Date()
      }
      
      console.log('[ContactService] Inserting to database...')
      // Lưu vào DB
      const result = await databaseServices.contacts.insertOne(doc)
      console.log('[ContactService] Insert successful:', result.insertedId)

      // Trả về response ngay
      return {
        message: 'Gửi liên hệ thành công',
        data: {
          id: result.insertedId?.toString() || '',
          name: doc.name,
          email: doc.email,
          created_at: doc.created_at.toISOString()
        }
      }
    } catch (error) {
      console.error('[ContactService] Error submitting contact:', error)
      throw error
    }
  }

  private escape(str: string) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }
}

export default new ContactService()
