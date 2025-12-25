import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Product } from '@/types/product.types'
import { formatPrice } from '@/utils/formatters'
import { ROUTES } from '@/utils/constants'

interface ProductCardProps {
  product: Product
  index?: number
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const productUrl = ROUTES.PRODUCT_DETAIL(
    typeof product.slug === 'string' ? product.slug : ''
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="group cursor-pointer"
    >
      <Link to={productUrl}>
        <motion.div
          className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4 bg-gray-100 dark:bg-gray-800"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute top-3 right-3"
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className="bg-white/90 dark:bg-black/60 p-2 rounded-full shadow-sm hover:bg-primary hover:text-white"
              aria-label="Add to favorites"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="material-symbols-outlined text-lg">favorite</span>
            </motion.button>
          </motion.div>
          {product.price_before_discount && product.price_before_discount > product.price && (
            <motion.div
              className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              SALE
            </motion.div>
          )}
        </motion.div>
        <motion.h3
          className="text-text-main dark:text-white text-lg font-bold group-hover:text-primary transition-colors"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          {product.name}
        </motion.h3>
        {product.colors && product.colors.length > 0 && (
          <p className="text-text-sub dark:text-gray-400 text-sm">
            {product.colors.join(' / ')}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <motion.p
            className="text-text-main dark:text-white font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {formatPrice(product.price)}
          </motion.p>
          {product.price_before_discount && product.price_before_discount > product.price && (
            <motion.p
              className="text-text-sub dark:text-gray-400 text-sm line-through"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {formatPrice(product.price_before_discount)}
            </motion.p>
          )}
        </div>
        {product.rating && (
          <motion.div
            className="flex items-center gap-1 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="material-symbols-outlined text-yellow-400 text-sm">
              star
            </span>
            <span className="text-sm text-text-sub dark:text-gray-400">
              {product.rating.toFixed(1)}
            </span>
          </motion.div>
        )}
      </Link>
    </motion.div>
  )
}

export default ProductCard

