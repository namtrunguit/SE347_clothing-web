import databaseServices from '~/services/database.services'

/**
 * Initialize database indexes for optimal query performance
 * Should be called once when the application starts
 */
export const initializeIndexes = async () => {
  try {
    console.log('Initializing database indexes...')

    // Users collection indexes
    await databaseServices.users.createIndex({ email: 1 }, { unique: true })
    await databaseServices.users.createIndex({ role: 1 })
    console.log('✓ Users indexes created')

    // Refresh tokens collection indexes
    await databaseServices.refreshTokens.createIndex({ token: 1 }, { unique: true })
    await databaseServices.refreshTokens.createIndex({ user_id: 1 })
    await databaseServices.refreshTokens.createIndex({ created_at: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 }) // 30 days TTL
    console.log('✓ Refresh tokens indexes created')

    // Categories collection indexes
    await databaseServices.categories.createIndex({ slug: 1 }, { unique: true })
    await databaseServices.categories.createIndex({ is_featured: 1 })
    console.log('✓ Categories indexes created')

    // Products collection indexes
    await databaseServices.products.createIndex({ slug: 1 }, { unique: true })
    await databaseServices.products.createIndex({ category: 1 })
    await databaseServices.products.createIndex({ status: 1 })
    await databaseServices.products.createIndex({ is_featured: 1 })
    await databaseServices.products.createIndex({ price: 1 })
    await databaseServices.products.createIndex({ rating: -1 })
    await databaseServices.products.createIndex({ created_at: -1 })
    // Text index for search (already created in seed.ts, but ensure it exists)
    try {
      await databaseServices.products.createIndex({ name: 'text', description: 'text' })
    } catch (e: any) {
      // Index might already exist, ignore error
      if (!e.message?.includes('already exists')) {
        console.warn('Text index creation warning:', e.message)
      }
    }
    console.log('✓ Products indexes created')

    // Carts collection indexes
    await databaseServices.carts.createIndex({ user_id: 1 }, { unique: true })
    console.log('✓ Carts indexes created')

    // Orders collection indexes
    await databaseServices.orders.createIndex({ user_id: 1 })
    await databaseServices.orders.createIndex({ order_code: 1 }, { unique: true })
    await databaseServices.orders.createIndex({ status: 1 })
    await databaseServices.orders.createIndex({ created_at: -1 })
    await databaseServices.orders.createIndex({ user_id: 1, created_at: -1 }) // Compound index for user orders
    console.log('✓ Orders indexes created')

    // Contacts collection indexes
    await databaseServices.contacts.createIndex({ email: 1 })
    await databaseServices.contacts.createIndex({ created_at: -1 })
    console.log('✓ Contacts indexes created')

    console.log('✓ All database indexes initialized successfully')
  } catch (error) {
    console.error('Error initializing database indexes:', error)
    // Don't throw - indexes might already exist
  }
}

