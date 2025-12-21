import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'

export const getBannersController = async (req: Request, res: Response) => {
  const { position } = req.query

  // Mock data based on docs/TrangChu.md
  const banners = [
    {
      id: 1,
      title: 'Tinh thần tối giản\nVẻ đẹp bền vững',
      subtitle: 'Phong cách Thu Đông 2024',
      image_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB2SKUoOEQliT6zI5_2rUgEFrVSvWQPcD3cjHRFtCDzaVNMXWwVfV94R2o12djBf5mzW4zAzSdCQrMNSnhG1rSlVpMLjiYT_9oc5kLFYFhNPVHpACM-lezQ7UP6jbg_Ixpf6z9gL01Aym8plLHL4kz3dP-gYG_KGANfjTrffUpOZkcf0BabuyLegxJc7uc5Uxn_3xE88nhqgcf3D8gssYbmFxf5t24KiW7uAJlrMuURGJ24TSZpHTgs6j2s-bIZXfbiTq-gGNI1aVo',
      alt_text: 'Minimalist Japanese fashion model',
      cta_text: 'Khám Phá Ngay',
      cta_link: '/collections/autumn-2024',
      order: 1,
      position: 'home_hero'
    }
  ]

  const result = position ? banners.filter((b) => b.position === position) : banners

  return res.status(HTTP_STATUS.OK).json({
    message: 'Get banners success',
    data: result
  })
}
