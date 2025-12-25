import multer from 'multer'
import { Request, Response, NextFunction } from 'express'

// Configure storage
const storage = multer.memoryStorage() // Store in memory, can be changed to diskStorage if needed

// File filter - only accept images
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept image files only
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only image files are allowed.'))
  }
}

// Configure multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
})

// Single file upload middleware for avatar (optional - can also accept avatar_url in body)
export const uploadAvatar = (req: Request, res: Response, next: NextFunction) => {
  // Only use multer if Content-Type is multipart/form-data
  if (req.headers['content-type']?.includes('multipart/form-data')) {
    return upload.single('avatar')(req, res, (err: any) => {
      // Ignore multer errors if no file is provided (fallback to avatar_url in body)
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          message: 'File size too large. Maximum size is 5MB'
        })
      }
      if (err) {
        return res.status(400).json({
          message: err.message || 'File upload error'
        })
      }
      next()
    })
  }
  // If not multipart/form-data, skip multer and continue
  next()
}

