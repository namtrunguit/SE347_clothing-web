                                                                                                                                                                                                                            /**
 * Seed Data Script
 * 
 * Nguồn dữ liệu: Lấy từ UI files (ui/trangchu.html, ui/categories.html, ui/product.html)
 * 
 * Cách chạy:
 *   - Từ thư mục be: npm run db:seed
 *   - Hoặc: npx ts-node -r tsconfig-paths/register src/utils/seed.ts
 * 
 * Default Admin Credentials:
 *   - Email: admin@yori.com (hoặc từ env ADMIN_EMAIL)
 *   - Password: admin123 (hoặc từ env ADMIN_PASSWORD)
 * 
 * Test User Credentials:
 *   - customer1@test.com / 123456
 *   - customer2@test.com / 123456
 *   - customer3@test.com / 123456
 * 
 * Lưu ý:
 *   - Script sẽ chỉ seed data nếu chưa tồn tại (không xóa data cũ)
 *   - Categories, Products, Banners: chỉ seed nếu collection rỗng
 *   - Users: chỉ tạo nếu email chưa tồn tại
 */

import databaseServices from '../services/database.services'
import Category from '../models/schemas/Category.schema'
import Product, { ProductStatus } from '../models/schemas/Product.schema'
import Banner from '../models/schemas/Banner.schema'
import User from '../models/schemas/Users.schema'
import { hashPassword } from './crypto'
import { UserRole, UserVerifyStatus } from '../constants/enums'
import { config } from 'dotenv'
import { validateAllSeedData } from './validate-seed-data'

config()

/**
 * Categories Seed Data
 * Nguồn: ui/trangchu.html, ui/categories.html
 */
const categories = [
  {
    name: 'Áo',                                         
    slug: 'ao',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD32BwQOKSMpvyvvDstxM5q9o58VWBO4M7-MFry-5svPJM5ZywFlScSUVb_hbpWOxCiI97XcbD0XPbISq721SmN8aRYESZuWOqdOKyxb-eNZd1GsSSSrMJmtIa4hIjWHBquuS0q8zc2ztRwHoZpls2qiL4H0CnBIv5xuYiWb8FKrl4-nwcVQQQUBooKv-m2LXv6ZcFVcoZMIHrmBBPyOW5Jf0R5KdgAvQQWF4KOovFg0gQOBTBklznNwSv18fqJ6wbYKGySGHaxH-g',
    description: 'Cotton thoáng mát cho mọi ngày',
    is_featured: true
  },
  {
    name: 'Quần',
    slug: 'quan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkPLHK_HNG4jCTkVYqsVwfjJoCL8-UvRUo5hAqFf94fMAcyvVtoottzeQFlNn485V6UNWtIxbZSx4kDQnpbKm11jqjWA5fxYiAWqMF42ZGjQX5H8aCer6BoT-wPfrai2pJlNJiRIx9ZMsmVh5jFgwxlTLb-tEuh0RwJtjt_N7JgWvc8PYeShbCwNxMFcEr9t08LojGLBlPe_6vXxyPZkF4hpIwWH50TLMAkwG2ICx60yvRkmS3KsjnUHEjgQT0kvTaJy2JY7M_4A4',
    description: 'Kiểu dáng vừa vặn, tối giản',
    is_featured: true
  },
  {
    name: 'Áo khoác',
    slug: 'ao-khoac',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIvlHRsF7TPQg_OSUOj-WKFR6qpr7ELfxG8maqgSz7MNvTTjVVR17m-Jk3Axts_c_PxN4_VNvvQg-fYC1ugKsUPUOGPZV2NxNv9-UY_hWp_436KXYy9QDkEx2jWID6xqLhEMLP6B0B4lK_IBIsAk4u9kPgVz1cWqDA8iYlOsPnXkYz9OkcZNaXcu94QAPG6ukqfyn2bIT699lLvBvViGtBDSzw_kkf2zuuVWEcdt7VoryzLiW1I7qwqT0DAgSv5YLhm55C_PLZ16I',
    description: 'Lớp bảo vệ phong cách',
    is_featured: true
  },
  {
    name: 'Đồ Len & Dệt Kim',
    slug: 'do-len-det-kim',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Lm7D1D1o3GUSaDSunJ2gOZxjeZ-odAMibuS7BpqAz2bNkvdaga74ni_BjQnSXRZ0qIrCQLAMu3_rXgjDkzwvFuClJvPpxxvJFVPe3ezVZFWOTD3BshXI8jIM5Tg8QYc3ETGvuzFG0Qb3UJt3Fk3p_6RtCWyuC_RgzMkkC7RjM25MN_LffPEMQHaMjQm5tonOuSgTod31DF4zAyQZClgkuQvJOgC3xa4UAJ-OTmHGFEt8k3xsiq5rmbVIAAbXioxT12bHNfYM0k0',
    description: 'Ấm áp và thoải mái',
    is_featured: false
  },
  {
    name: 'Denim Tối Giản',
    slug: 'denim-toi-gian',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJe-7ApiUsPoFCgiHguEHxxhqylhrdYn8sCAGcfaN3Tn5LwfGTldpUzbVtnmtCVlVPeAEIwPX2EbVqL7PZskI5jov7xrvtHUSvzTpaoUArNNhD0YYZD9FoQpIswHeEZ07BdAuPIuWqAUyOBbnIz8p59LKtLVel7zL7MyqO0kOSDCqVikgPuj-c9a76m6Pr17sO6IY1kEaUJTRcJeneNeYvsKYHFXxSoJTpfUd44c6ooVuATOvL7aDk5oXQvApCrn3Es8UKSgw2gpU',
    description: 'Phong cách denim tối giản',
    is_featured: false
  },
  {
    name: 'Phụ Kiện',
    slug: 'phu-kien',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdYcL7jlW8EOdgxZe_djIC4aQRFoOhZskaFAKCdxReWiP8HtheLwXUAeEwLNKeF64i6tTzD5-Mz1YC-v4VpRakSgY8RnmYoxs97pTOZ5PZVtyCWKemk7xJ1Mfjzsti7me5wJsj3q0K6B7Fk3-W3fLSe4lqLeqPn9Fk9B4ZDzpAwkMMBmV5Bv4l8vUVNtvu-l08qnW8Vmpjlorgnr4WeAQZuHdj-gkNOWT-xDOBUzszEEMUj1gd_5KO27RQcvzOCPR3Thaz_X3IeK0',
    description: 'Phụ kiện hoàn thiện phong cách',
    is_featured: false
  }
]

/**
 * Products Seed Data
 * Nguồn: ui/trangchu.html, ui/product.html, ui/categories.html
 * 
 * Products được lấy từ:
 *   - Featured products section (trangchu.html)
 *   - Best sellers section (trangchu.html)
 *   - Product listings (product.html, categories.html)
 */
const products = [
  {
    name: 'Áo sơ mi Linen',
    slug: 'ao-so-mi-linen',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBoFyER9pdtDnuaC0PscjJSKfsUyEntOiNej1YkSDM4vBrl78GdLlpo7eaYzyNckVwkHXny9bgTnwEAaekW8GK8OVM_gbqMYK5011a6LiM02ksL6OJLwJc8_Hg33UpUrppxwT5tJbmjURSsZksQKlKvNdQJ4rKkUJaEE57-JzQw7vtFr0LWLsIhgcitjsi-P_dtHjYorVU1w2uMeDICutBJON1fpuFr63edw4YvaQ3-Vrj_j6PTJ2NxDYxBjdyi0ZfaxRIs1bvm-VY',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBoFyER9pdtDnuaC0PscjJSKfsUyEntOiNej1YkSDM4vBrl78GdLlpo7eaYzyNckVwkHXny9bgTnwEAaekW8GK8OVM_gbqMYK5011a6LiM02ksL6OJLwJc8_Hg33UpUrppxwT5tJbmjURSsZksQKlKvNdQJ4rKkUJaEE57-JzQw7vtFr0LWLsIhgcitjsi-P_dtHjYorVU1w2uMeDICutBJON1fpuFr63edw4YvaQ3-Vrj_j6PTJ2NxDYxBjdyi0ZfaxRIs1bvm-VY'
    ],
    description: 'Relaxed Fit - Áo sơ mi linen thoáng mát, phù hợp cho mọi dịp',
    category_slug: 'ao',
    price: 850000,
    quantity: 100,
    sold: 20,
    view: 150,
    rating: 4.8,
    colors: ['Beige', 'Trắng'],
    sizes: ['S', 'M', 'L', 'XL'],
    is_featured: true,
    status: ProductStatus.Active
  },
  {
    name: 'Quần ống rộng Taki',
    slug: 'quan-ong-rong-taki',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAyOuuoER_GQZsnHfUk3TCiQNOUhZqBxgCceAgnYNdoCbza2klQq7zMAY4bXnZ1wJghVG4c7x1X2WqZ5fHgjmMpkI0AJOYtMvO9pvF6CW1mJft9QDdQ-mE7ClxX4cLhVn-V_9RV3Ax-zcHH325v06q1y3oDQAOx-wnv8xDrZoyfjW8iB-QDioE-LYDzNJZr1aZangd2CZwABZFJQqJ31BwEaZU9i1BSWU0ehssQbK5uN5ZphkniB7k1b3y0Mei2K_05lBxcCgzms5g',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAyOuuoER_GQZsnHfUk3TCiQNOUhZqBxgCceAgnYNdoCbza2klQq7zMAY4bXnZ1wJghVG4c7x1X2WqZ5fHgjmMpkI0AJOYtMvO9pvF6CW1mJft9QDdQ-mE7ClxX4cLhVn-V_9RV3Ax-zcHH325v06q1y3oDQAOx-wnv8xDrZoyfjW8iB-QDioE-LYDzNJZr1aZangd2CZwABZFJQqJ31BwEaZU9i1BSWU0ehssQbK5uN5ZphkniB7k1b3y0Mei2K_05lBxcCgzms5g'
    ],
    description: 'Regular Fit - Quần ống rộng phong cách tối giản',
    category_slug: 'quan',
    price: 650000,
    quantity: 80,
    sold: 15,
    view: 120,
    rating: 4.5,
    colors: ['Xám khói'],
    sizes: ['S', 'M', 'L', 'XL'],
    is_featured: false,
    status: ProductStatus.Active
  },
  {
    name: 'Váy suông Sumi',
    slug: 'vay-suong-sumi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbGSBBi5WNENPdxM45p08Sp6niq8pUeKmqIxT6KGdr1DAxDGk33lInZUZExYVTKhH0FSbMsCK_RpUIr7tnxblDBVxQwPMDqTpwYoF16f5gjCdKhlbMXwDxCLEpzAwjfSQrAlUV9AwmsL5wNAf_1HUgNVBIVY_lPJfHqeIUFwU0Lh0jc0mrfsVrV0rk1qizti1MW7uCd1ERyDJN8nbCQn9uwGWCqolFdH-BccGDhCdha--i-tXvirTHmO7En1eOJlwFOF_Cs7kwegs',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbGSBBi5WNENPdxM45p08Sp6niq8pUeKmqIxT6KGdr1DAxDGk33lInZUZExYVTKhH0FSbMsCK_RpUIr7tnxblDBVxQwPMDqTpwYoF16f5gjCdKhlbMXwDxCLEpzAwjfSQrAlUV9AwmsL5wNAf_1HUgNVBIVY_lPJfHqeIUFwU0Lh0jc0mrfsVrV0rk1qizti1MW7uCd1ERyDJN8nbCQn9uwGWCqolFdH-BccGDhCdha--i-tXvirTHmO7En1eOJlwFOF_Cs7kwegs'
    ],
    description: 'Regular Fit - Váy suông phong cách tối giản',
    category_slug: 'quan',
    price: 790000,
    quantity: 60,
    sold: 10,
    view: 100,
    rating: 4.6,
    colors: ['Đen tuyền'],
    sizes: ['S', 'M', 'L'],
    is_featured: false,
    status: ProductStatus.Active
  },
  {
    name: 'Áo thun Cotton Basic',
    slug: 'ao-thun-cotton-basic',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcP1SM3mfwFBoquuBWoz__0nrOLtN8RxRjRAmigdnqdsePVEqi9MLO889mNylT7KhG6BEIdygbM_5YNXAGaessHG8MtULsFEhyp76VcXU_J6zyHRG9HmkFvjLI1rOdDL5OEFd0M5ANizVNRRZ5JLHgme61a84GtNjPSZdjX1R_NqbjQAVW_Bwv4RTde_lTR6MaFMplfEa0WRP_e7r8kJD06YMtc3_p_iCUCLznB7-apIoxPhpnPsfZKhCZ2uYqzaeD5H46Cvoq6Jc',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcP1SM3mfwFBoquuBWoz__0nrOLtN8RxRjRAmigdnqdsePVEqi9MLO889mNylT7KhG6BEIdygbM_5YNXAGaessHG8MtULsFEhyp76VcXU_J6zyHRG9HmkFvjLI1rOdDL5OEFd0M5ANizVNRRZ5JLHgme61a84GtNjPSZdjX1R_NqbjQAVW_Bwv4RTde_lTR6MaFMplfEa0WRP_e7r8kJD06YMtc3_p_iCUCLznB7-apIoxPhpnPsfZKhCZ2uYqzaeD5H46Cvoq6Jc'
    ],
    description: 'Regular Fit - Áo thun cotton cơ bản, thoải mái',
    category_slug: 'ao',
    price: 350000,
    quantity: 200,
    sold: 50,
    view: 300,
    rating: 4.4,
    colors: ['Trắng tinh khôi'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    is_featured: false,
    status: ProductStatus.Active
  },
  {
    name: 'Áo khoác Blazer Kaki',
    slug: 'ao-khoac-blazer-kaki',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFMqAqtNTQKSUSwn4wix2mVgoVRd0H24ZEL8mc-KahVYugPMwUyyO7acy5iv4EzQ-tvQ9OUyoMz8mnKcphyFVmXhpB2n8cUNNIHfTI9MysQheU-VIkaDS5U-Phv4-Z5sW6jNi5i8rYAgeqUqd0kbeW0PHieIBS6Y4E6p2grqtReh3Ck1wG3mR6KXZbqzgPF4rd1AwDEvnZD63roPHKp61vx0vu8PBDVH2gFx3hDuJlBuxMhkDT_iYDbq4wxnxhlxxC8umoelfUetA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFMqAqtNTQKSUSwn4wix2mVgoVRd0H24ZEL8mc-KahVYugPMwUyyO7acy5iv4EzQ-tvQ9OUyoMz8mnKcphyFVmXhpB2n8cUNNIHfTI9MysQheU-VIkaDS5U-Phv4-Z5sW6jNi5i8rYAgeqUqd0kbeW0PHieIBS6Y4E6p2grqtReh3Ck1wG3mR6KXZbqzgPF4rd1AwDEvnZD63roPHKp61vx0vu8PBDVH2gFx3hDuJlBuxMhkDT_iYDbq4wxnxhlxxC8umoelfUetA'
    ],
    description: 'Regular Fit - Áo khoác blazer kaki thanh lịch',
    category_slug: 'ao-khoac',
    price: 950000,
    quantity: 50,
    sold: 25,
    view: 200,
    rating: 4.9,
    colors: ['Xám', 'Navy', 'Đen'],
    sizes: ['46', '48', '50', '52'],
    is_featured: true,
    status: ProductStatus.Active
  },
  {
    name: 'Sơ mi lụa Muji',
    slug: 'so-mi-lua-muji',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiwItxtH0JJmLvWVXoODE6wkscbDzatT8b7Il1L-9P1I_JN9BrXw07qzumYONf9AaFPf-aIm_XKp6HhXRDc1XhH3h4p6FVwyTZawOIDiQpz-PR82_h6U3lKf_yyrDMVVNhK1clksKb9njYud52BSQIR7lL4juvVL5fRJGYlU76AxEdTFXOUrCRPHjsRY0hrXLYqVmp6msDdop_Y2P0onTTa7s3mpbyyNgyKJvEw_FnFWz2NidUhik3odMMaRWkB1dsP9bH0CC6o6I',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiwItxtH0JJmLvWVXoODE6wkscbDzatT8b7Il1L-9P1I_JN9BrXw07qzumYONf9AaFPf-aIm_XKp6HhXRDc1XhH3h4p6FVwyTZawOIDiQpz-PR82_h6U3lKf_yyrDMVVNhK1clksKb9njYud52BSQIR7lL4juvVL5fRJGYlU76AxEdTFXOUrCRPHjsRY0hrXLYqVmp6msDdop_Y2P0onTTa7s3mpbyyNgyKJvEw_FnFWz2NidUhik3odMMaRWkB1dsP9bH0CC6o6I'
    ],
    description: 'Regular Fit - Sơ mi lụa mềm mại, thanh lịch',
    category_slug: 'ao',
    price: 720000,
    quantity: 70,
    sold: 30,
    view: 180,
    rating: 4.7,
    colors: ['Trắng', 'Beige', 'Hồng nhạt'],
    sizes: ['S', 'M', 'L', 'XL'],
    is_featured: true,
    status: ProductStatus.Active
  },
  {
    name: 'Túi Canvas YORI',
    slug: 'tui-canvas-yori',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC-ULQ1fn1N92CgMQuFBE3K2VBPFu-e1984VF1YoyLi0MhvGIYF4dxCN1Dynu7G0GtpP7kqi8OTKOqHs7tWnDpwPbXPcKrB8vVOBDmM82xDiWbxPMhKUwRC9HvSyMeifC-TNLkwdBCxdHH-yWeAUIAS98nqdF0uyW1zTpdFfM58gAs8WX1GIbo1Zab4kR0G0Ad86LKmeZN9xRvVzcPV371lBxZ2PIJr3ozygfLxQsGFknkO8dthplr6jmttMQ1yqDE9f3b6n-Z1YtU',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC-ULQ1fn1N92CgMQuFBE3K2VBPFu-e1984VF1YoyLi0MhvGIYF4dxCN1Dynu7G0GtpP7kqi8OTKOqHs7tWnDpwPbXPcKrB8vVOBDmM82xDiWbxPMhKUwRC9HvSyMeifC-TNLkwdBCxdHH-yWeAUIAS98nqdF0uyW1zTpdFfM58gAs8WX1GIbo1Zab4kR0G0Ad86LKmeZN9xRvVzcPV371lBxZ2PIJr3ozygfLxQsGFknkO8dthplr6jmttMQ1yqDE9f3b6n-Z1YtU'
    ],
    description: 'Túi canvas bền chắc, phong cách tối giản',
    category_slug: 'phu-kien',
    price: 250000,
    quantity: 150,
    sold: 40,
    view: 250,
    rating: 4.6,
    colors: ['Beige', 'Đen', 'Navy'],
    sizes: ['One Size'],
    is_featured: true,
    status: ProductStatus.Active
  },
  {
    name: 'Quần Tây Chinos',
    slug: 'quan-tay-chinos',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIp8PONZrBzQJOTWmY-NR225RYmAOK5k-NuTw1DkF9YflRcECoy9QTLF9tDWsbKuO0M6dn3f6kkCG8x3Eg9Z_AkYbSIFWHVMQJ9I88yE1Qx65IzrOt6NPEKNY0tmXrZ77e5tOydYA-UNib7qGTtgTWAv-kkXdauSKorOGVUInTQfqXHXueB5YuwLoFzIZMPUdoz2ckNdZvRYa3ek-zlmZX-mCoJQF2Q13sCey7qXtLm7C6A3jDPRB5MwVpyLdfcrHAd2O11jfgkA8',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIp8PONZrBzQJOTWmY-NR225RYmAOK5k-NuTw1DkF9YflRcECoy9QTLF9tDWsbKuO0M6dn3f6kkCG8x3Eg9Z_AkYbSIFWHVMQJ9I88yE1Qx65IzrOt6NPEKNY0tmXrZ77e5tOydYA-UNib7qGTtgTWAv-kkXdauSKorOGVUInTQfqXHXueB5YuwLoFzIZMPUdoz2ckNdZvRYa3ek-zlmZX-mCoJQF2Q13sCey7qXtLm7C6A3jDPRB5MwVpyLdfcrHAd2O11jfgkA8'
    ],
    description: 'Regular Fit - Quần tây chinos lịch sự, đa dụng',
    category_slug: 'quan',
    price: 680000,
    quantity: 90,
    sold: 35,
    view: 220,
    rating: 4.8,
    colors: ['Navy', 'Xám', 'Beige'],
    sizes: ['S', 'M', 'L', 'XL'],
    is_featured: true,
    status: ProductStatus.Active
  },
  {
    name: 'Oversized Tee',
    slug: 'oversized-tee',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7JM5MXmHHhs4l1bezu6ioxRC_B7HmXIjc6zpvwqyAE4qSpEZkNistyVZ206sktIYNFrnVLgq_9VNBtRo9-C9wHAhX3_mREIzHXB1HZT8y0o_awsQeuphTC-tdPojndXAAg-7kkYhUNlZQk5gV9xOtJqLUNAQPr9aTvZpA2wzf0LbnH3IY5Ci_ug0ai9sziZngm-XTj8v9SDUvg91FvvsUVC42HCj55AsThEM3C_XfHatVVUBpBRRdTSuvJuMxKPnH5u30_9bu514',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7JM5MXmHHhs4l1bezu6ioxRC_B7HmXIjc6zpvwqyAE4qSpEZkNistyVZ206sktIYNFrnVLgq_9VNBtRo9-C9wHAhX3_mREIzHXB1HZT8y0o_awsQeuphTC-tdPojndXAAg-7kkYhUNlZQk5gV9xOtJqLUNAQPr9aTvZpA2wzf0LbnH3IY5Ci_ug0ai9sziZngm-XTj8v9SDUvg91FvvsUVC42HCj55AsThEM3C_XfHatVVUBpBRRdTSuvJuMxKPnH5u30_9bu514'
    ],
    description: 'Oversized Fit - Áo thun oversized thoải mái',
    category_slug: 'ao',
    price: 450000,
    price_before_discount: 600000,
    quantity: 200,
    sold: 50,
    view: 300,
    rating: 4.5,
    colors: ['White', 'Black', 'Navy', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    is_featured: false,
    status: ProductStatus.Active
  },
  {
    name: 'Casual Shorts',
    slug: 'casual-shorts',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkPLHK_HNG4jCTkVYqsVwfjJoCL8-UvRUo5hAqFf94fMAcyvVtoottzeQFlNn485V6UNWtIxbZSx4kDQnpbKm11jqjWA5fxYiAWqMF42ZGjQX5H8aCer6BoT-wPfrai2pJlNJiRIx9ZMsmVh5jFgwxlTLb-tEuh0RwJtjt_N7JgWvc8PYeShbCwNxMFcEr9t08LojGLBlPe_6vXxyPZkF4hpIwWH50TLMAkwG2ICx60yvRkmS3KsjnUHEjgQT0kvTaJy2JY7M_4A4',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkPLHK_HNG4jCTkVYqsVwfjJoCL8-UvRUo5hAqFf94fMAcyvVtoottzeQFlNn485V6UNWtIxbZSx4kDQnpbKm11jqjWA5fxYiAWqMF42ZGjQX5H8aCer6BoT-wPfrai2pJlNJiRIx9ZMsmVh5jFgwxlTLb-tEuh0RwJtjt_N7JgWvc8PYeShbCwNxMFcEr9t08LojGLBlPe_6vXxyPZkF4hpIwWH50TLMAkwG2ICx60yvRkmS3KsjnUHEjgQT0kvTaJy2JY7M_4A4'
    ],
    description: 'Regular Fit - Quần short casual thoải mái',
    category_slug: 'quan',
    price: 380000,
    quantity: 120,
    sold: 25,
    view: 150,
    rating: 4.3,
    colors: ['Beige', 'Navy', 'Đen'],
    sizes: ['S', 'M', 'L', 'XL'],
    is_featured: false,
    status: ProductStatus.Active
  },
  {
    name: 'Denim Jacket',
    slug: 'denim-jacket',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWL-oSxkESnYddTPSI30h7FSi_hGVoCfejRb998N167y00XgTQ8F9zrfQQeoLKYYya0phCvlTpXOEoyzRljEtrlZuLheT4ITOEUJH9dQxccspAGrbyiRS880grxdQ4XIvsuvitm5oJJoq-Nbs1icBH2S8DO1wM4f_utAZmw_EuhUdi_ly3P2WC4nqJNgueDCNme6JwQE7G6gwWECYvG5mJOwkDVbU-S7i5NJnO2-Ttl6uYeHrkPA3zGyzmLXqkUcP60JBrfzRxfTQ',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWL-oSxkESnYddTPSI30h7FSi_hGVoCfejRb998N167y00XgTQ8F9zrfQQeoLKYYya0phCvlTpXOEoyzRljEtrlZuLheT4ITOEUJH9dQxccspAGrbyiRS880grxdQ4XIvsuvitm5oJJoq-Nbs1icBH2S8DO1wM4f_utAZmw_EuhUdi_ly3P2WC4nqJNgueDCNme6JwQE7G6gwWECYvG5mJOwkDVbU-S7i5NJnO2-Ttl6uYeHrkPA3zGyzmLXqkUcP60JBrfzRxfTQ'
    ],
    description: 'Regular Fit - Áo khoác denim phong cách',
    category_slug: 'ao-khoac',
    price: 890000,
    quantity: 70,
    sold: 12,
    view: 110,
    rating: 4.4,
    colors: ['Light Blue', 'Indigo', 'Đen'],
    sizes: ['S', 'M', 'L', 'XL'],
    is_featured: false,
    status: ProductStatus.Active
  }
]

/**
 * Banners Seed Data
 * Nguồn: ui/trangchu.html - Hero section
 */
const banners = [
  {
    title: 'Tinh thần tối giản\nVẻ đẹp bền vững',
    subtitle: 'Phong cách Thu Đông 2024',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2SKUoOEQliT6zI5_2rUgEFrVSvWQPcD3cjHRFtCDzaVNMXWwVfV94R2o12djBf5mzW4zAzSdCQrMNSnhG1rSlVpMLjiYT_9oc5kLFYFhNPVHpACM-lezQ7UP6jbg_Ixpf6z9gL01Aym8plLHL4kz3dP-gYG_KGANfjTrffUpOZkcf0BabuyLegxJc7uc5Uxn_3xE88nhqgcf3D8gssYbmFxf5t24KiW7uAJlrMuURGJ24TSZpHTgs6j2s-bIZXfbiTq-gGNI1aVo',
    alt_text: 'Minimalist Japanese fashion model in autumn outfit walking in a serene park',
    cta_text: 'Khám Phá Ngay',
    cta_link: '/products',
    order: 1,
    position: 'home_hero',
    is_active: true
  }
]

/**
 * Users Seed Data
 * 
 * Admin User:
 *   - Email: admin@yori.com (hoặc từ env ADMIN_EMAIL)
 *   - Password: admin123 (hoặc từ env ADMIN_PASSWORD)
 *   - Role: Admin
 * 
 * Test Customer Users:
 *   - customer1@test.com / 123456
 *   - customer2@test.com / 123456
 *   - customer3@test.com / 123456
 */
const users = [
  {
    first_name: 'Admin',
    last_name: 'YORI',
    email: process.env.ADMIN_EMAIL || 'admin@yori.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: UserRole.Admin,
    verify: UserVerifyStatus.Verified
  },
  {
    first_name: 'Customer',
    last_name: 'Test 1',
    email: 'customer1@test.com',
    password: '123456',
    role: UserRole.Customer,
    verify: UserVerifyStatus.Verified
  },
  {
    first_name: 'Customer',
    last_name: 'Test 2',
    email: 'customer2@test.com',
    password: '123456',
    role: UserRole.Customer,
    verify: UserVerifyStatus.Verified
  },
  {
    first_name: 'Customer',
    last_name: 'Test 3',
    email: 'customer3@test.com',
    password: '123456',
    role: UserRole.Customer,
    verify: UserVerifyStatus.Verified
  }
]

async function seedCategories() {
  console.log('📦 Seeding categories...')
  const categoryCount = await databaseServices.categories.countDocuments()
  if (categoryCount === 0) {
    const categoryDocs = categories.map((cat) => new Category(cat))
    await databaseServices.categories.insertMany(categoryDocs)
    console.log('✅ Seed categories successfully!')
  } else {
    console.log('⏭️  Categories already exist. Skipping seed categories.')
  }
}

async function seedProducts() {
  console.log('📦 Seeding products...')
  const productCount = await databaseServices.products.countDocuments()
  if (productCount === 0) {
    const categoryDocs = await databaseServices.categories.find().toArray()
    const productDocs = products.map((prod) => {
      const category = categoryDocs.find((c) => c.slug === prod.category_slug)
      if (!category) {
        throw new Error(`Category not found for product ${prod.name}`)
      }
      return new Product({
        ...prod,
        category: category._id as any
      })
    })
    await databaseServices.products.insertMany(productDocs)
    console.log('✅ Seed products successfully!')

    // Create Text Index for Search
    try {
      await databaseServices.products.createIndex({ name: 'text', description: 'text' })
      console.log('✅ Create text index for products successfully!')
    } catch (e: any) {
      if (!e.message?.includes('already exists')) {
        console.warn('⚠️  Text index creation warning:', e.message)
      }
    }
  } else {
    console.log('⏭️  Products already exist. Skipping seed products.')
  }
}

async function seedBanners() {
  console.log('📦 Seeding banners...')
  const bannerCount = await databaseServices.banners.countDocuments()
  if (bannerCount === 0) {
    const bannerDocs = banners.map((banner) => new Banner(banner))
    await databaseServices.banners.insertMany(bannerDocs)
    console.log('✅ Seed banners successfully!')
  } else {
    console.log('⏭️  Banners already exist. Skipping seed banners.')
  }
}

async function seedUsers() {
  console.log('📦 Seeding users...')
  for (const userData of users) {
    const existingUser = await databaseServices.users.findOne({ email: userData.email })
    if (!existingUser) {
      const user = new User({
        ...userData,
        password: hashPassword(userData.password)
      })
      await databaseServices.users.insertOne(user)
      console.log(`✅ Created user: ${userData.email}`)
    } else {
      console.log(`⏭️  User ${userData.email} already exists. Skipping.`)
    }
  }
  console.log('✅ Seed users successfully!')
}

async function seed() {
  try {
    console.log('🌱 Starting seed process...\n')

    // Validate seed data before connecting to database
    console.log('🔍 Validating seed data...')
    const validation = validateAllSeedData(categories, products)
    if (!validation.valid) {
      console.error('❌ Seed data validation failed:')
      validation.errors.forEach((error) => console.error(`   - ${error}`))
      process.exit(1)
    }
    console.log('✅ Seed data validation passed!\n')

    await databaseServices.connect()

    // Seed in order
    await seedCategories()
    await seedProducts()
    await seedBanners()
    await seedUsers()

    console.log('\n✅ All seed data completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

// Run seed if executed directly
if (require.main === module) {
  seed()
}

export { seed, seedCategories, seedProducts, seedBanners, seedUsers }
