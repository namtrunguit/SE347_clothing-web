import { useState } from 'react'

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-gray-400">
          image
        </span>
      </div>
    )
  }

  const mainImage = images[selectedImageIndex] || images[0]

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={mainImage}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImageIndex(index)}
              className={`
                flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                ${
                  index === selectedImageIndex
                    ? 'border-primary'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductImageGallery

