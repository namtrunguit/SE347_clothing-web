/**
 * Validation functions for seed data
 */

interface ProductSeed {
  name: string
  slug: string
  category_slug: string
  price: number
  price_before_discount?: number
  images: string[]
  colors: string[]
  sizes: string[]
  rating: number
}

interface CategorySeed {
  name: string
  slug: string
}

/**
 * Validate that all products have valid categories
 */
export function validateProductCategories(
  products: ProductSeed[],
  categories: CategorySeed[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const categorySlugs = new Set(categories.map((c) => c.slug))

  products.forEach((product, index) => {
    if (!categorySlugs.has(product.category_slug)) {
      errors.push(`Product ${index + 1} "${product.name}" has invalid category_slug: "${product.category_slug}"`)
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validate that all slugs are unique and URL-friendly
 */
export function validateSlugs(
  items: Array<{ name: string; slug: string }>,
  itemType: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const seenSlugs = new Set<string>()

  items.forEach((item, index) => {
    // Check uniqueness
    if (seenSlugs.has(item.slug)) {
      errors.push(`${itemType} ${index + 1} "${item.name}" has duplicate slug: "${item.slug}"`)
    }
    seenSlugs.add(item.slug)

    // Check URL-friendly format (lowercase, alphanumeric, hyphens only)
    const urlFriendlyPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!urlFriendlyPattern.test(item.slug)) {
      errors.push(
        `${itemType} ${index + 1} "${item.name}" has invalid slug format: "${item.slug}". Slugs must be lowercase, alphanumeric, and use hyphens only.`
      )
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validate that prices are positive numbers
 */
export function validatePrices(products: ProductSeed[]): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  products.forEach((product, index) => {
    if (product.price <= 0) {
      errors.push(`Product ${index + 1} "${product.name}" has invalid price: ${product.price}. Price must be positive.`)
    }

    if (product.price_before_discount !== undefined && product.price_before_discount <= 0) {
      errors.push(
        `Product ${index + 1} "${product.name}" has invalid price_before_discount: ${product.price_before_discount}. Price must be positive.`
      )
    }

    if (
      product.price_before_discount !== undefined &&
      product.price_before_discount <= product.price
    ) {
      errors.push(
        `Product ${index + 1} "${product.name}" has price_before_discount (${product.price_before_discount}) <= price (${product.price}). Discount price should be less than original price.`
      )
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validate that image URLs are valid format (basic check)
 */
export function validateImageUrls(products: ProductSeed[]): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const urlPattern = /^https?:\/\/.+/

  products.forEach((product, index) => {
    if (!product.images || product.images.length === 0) {
      errors.push(`Product ${index + 1} "${product.name}" has no images.`)
    } else {
      product.images.forEach((url, imgIndex) => {
        if (!urlPattern.test(url)) {
          errors.push(
            `Product ${index + 1} "${product.name}" image ${imgIndex + 1} has invalid URL format: "${url}"`
          )
        }
      })
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validate that colors and sizes arrays are not empty
 */
export function validateColorsAndSizes(products: ProductSeed[]): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  products.forEach((product, index) => {
    if (!product.colors || product.colors.length === 0) {
      errors.push(`Product ${index + 1} "${product.name}" has no colors.`)
    }

    if (!product.sizes || product.sizes.length === 0) {
      errors.push(`Product ${index + 1} "${product.name}" has no sizes.`)
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validate that ratings are in range 0-5
 */
export function validateRatings(products: ProductSeed[]): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  products.forEach((product, index) => {
    if (product.rating < 0 || product.rating > 5) {
      errors.push(
        `Product ${index + 1} "${product.name}" has invalid rating: ${product.rating}. Rating must be between 0 and 5.`
      )
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validate all seed data
 */
export function validateAllSeedData(
  categories: CategorySeed[],
  products: ProductSeed[]
): { valid: boolean; errors: string[] } {
  const allErrors: string[] = []

  // Validate category slugs
  const categorySlugValidation = validateSlugs(categories, 'Category')
  if (!categorySlugValidation.valid) {
    allErrors.push(...categorySlugValidation.errors)
  }

  // Validate product slugs
  const productSlugValidation = validateSlugs(products, 'Product')
  if (!productSlugValidation.valid) {
    allErrors.push(...productSlugValidation.errors)
  }

  // Validate product categories
  const categoryValidation = validateProductCategories(products, categories)
  if (!categoryValidation.valid) {
    allErrors.push(...categoryValidation.errors)
  }

  // Validate prices
  const priceValidation = validatePrices(products)
  if (!priceValidation.valid) {
    allErrors.push(...priceValidation.errors)
  }

  // Validate image URLs
  const imageValidation = validateImageUrls(products)
  if (!imageValidation.valid) {
    allErrors.push(...imageValidation.errors)
  }

  // Validate colors and sizes
  const colorsSizesValidation = validateColorsAndSizes(products)
  if (!colorsSizesValidation.valid) {
    allErrors.push(...colorsSizesValidation.errors)
  }

  // Validate ratings
  const ratingValidation = validateRatings(products)
  if (!ratingValidation.valid) {
    allErrors.push(...ratingValidation.errors)
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors
  }
}

