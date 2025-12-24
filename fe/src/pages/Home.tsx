import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import ProductCard from '@/components/product/ProductCard'
import Spinner from '@/components/common/Spinner'
import Skeleton from '@/components/common/Skeleton'
import { getBanners } from '@/services/banners.service'
import { getProducts } from '@/services/products.service'
import { ROUTES } from '@/utils/constants'
import type { Banner, Product } from '@/types'

const Home = () => {
  const [banners, setBanners] = useState<Banner[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoadingBanners, setIsLoadingBanners] = useState(true)
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

  // Fetch banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoadingBanners(true)
        const data = await getBanners('home_hero')
        setBanners(data)
      } catch (err: any) {
        console.error('Error fetching banners:', err)
        setError('Không thể tải banners')
      } finally {
        setIsLoadingBanners(false)
      }
    }

    fetchBanners()
  }, [])

  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoadingProducts(true)
        const response = await getProducts({
          is_featured: true,
          limit: 8,
          page: 1,
        })
        setFeaturedProducts(response.products)
      } catch (err: any) {
        console.error('Error fetching featured products:', err)
        setError('Không thể tải sản phẩm nổi bật')
      } finally {
        setIsLoadingProducts(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  // Auto-rotate banner carousel
  useEffect(() => {
    if (banners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
    }, 5000) // Change banner every 5 seconds

    return () => clearInterval(interval)
  }, [banners.length])

  const handleBannerClick = (banner: Banner) => {
    if (banner.link) {
      window.location.href = banner.link
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Header />
      <main className="flex-grow">
        {/* Hero Section - Banner Carousel */}
        <div className="w-full px-4 lg:px-40 py-5 flex justify-center">
          <div className="w-full max-w-[1200px]">
            {isLoadingBanners ? (
              <Skeleton className="w-full h-[560px] rounded-xl" />
            ) : banners.length > 0 ? (
              <div className="relative overflow-hidden rounded-xl h-[560px] bg-cover bg-center group">
                {banners.map((banner, index) => (
                  <div
                    key={banner._id || banner.id || index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentBannerIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("${banner.image || banner.image_url}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end items-start p-10 lg:p-16">
                      <div className="flex flex-col gap-3 text-left max-w-xl">
                        {banner.title && (
                          <h2 className="text-white text-base md:text-lg font-medium tracking-wide uppercase opacity-90">
                            {banner.title}
                          </h2>
                        )}
                        <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] mb-4">
                          {banner.title?.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < banner.title!.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </h1>
                        {banner.link && (
                          <Link
                            to={banner.link}
                            className="mt-4 w-fit px-8 py-3 bg-primary hover:bg-[#159cc9] text-white rounded-lg text-base font-bold transition-all transform hover:translate-y-[-2px] hover:shadow-lg"
                          >
                            {banner.cta_text || 'Khám Phá Ngay'}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Banner Indicators */}
                {banners.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {banners.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentBannerIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentBannerIndex
                            ? 'w-8 bg-white'
                            : 'w-2 bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to banner ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-[560px] rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <p className="text-text-sub dark:text-gray-400">Không có banner</p>
              </div>
            )}
          </div>
        </div>

        {/* Brand Philosophy / Intro Section */}
        <div className="w-full px-4 lg:px-40 py-16 flex justify-center bg-white dark:bg-[#1a2c32]">
          <div className="max-w-[720px] text-center flex flex-col gap-4">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              Về YORI
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-text-main dark:text-white leading-snug">
              Tinh thần tối giản, cuộc sống cân bằng
            </h3>
            <p className="text-text-sub dark:text-gray-400 text-base leading-relaxed">
              YORI mang đến những thiết kế thời trang tối giản, bền vững, phù hợp với phong cách
              sống hiện đại. Mỗi sản phẩm được chế tác tỉ mỉ với chất liệu cao cấp, tôn vinh vẻ đẹp
              tự nhiên và sự thanh lịch vượt thời gian.
            </p>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="w-full px-4 lg:px-40 py-16 flex justify-center bg-background-light dark:bg-background-dark">
          <div className="w-full max-w-[1200px]">
            <div className="text-center mb-12">
              <span className="text-primary font-bold tracking-widest text-xs uppercase">
                Sản phẩm nổi bật
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white mt-4 mb-2">
                Bộ sưu tập mới nhất
              </h2>
              <p className="text-text-sub dark:text-gray-400">
                Khám phá những thiết kế độc đáo và tinh tế
              </p>
            </div>

            {isLoadingProducts ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <Skeleton className="w-full aspect-[3/4] rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#159cc9] transition-colors"
                >
                  Thử lại
                </button>
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text-sub dark:text-gray-400 mb-4">
                  Hiện chưa có sản phẩm nổi bật
                </p>
                <Link
                  to={ROUTES.PRODUCTS}
                  className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#159cc9] transition-colors"
                >
                  Xem tất cả sản phẩm
                </Link>
              </div>
            )}

            {/* View All Products Button */}
            {featuredProducts.length > 0 && (
              <div className="text-center mt-12">
                <Link
                  to={ROUTES.PRODUCTS}
                  className="inline-block px-8 py-3 bg-primary hover:bg-[#159cc9] text-white rounded-lg text-base font-bold transition-all transform hover:translate-y-[-2px] hover:shadow-lg"
                >
                  Xem tất cả sản phẩm
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
