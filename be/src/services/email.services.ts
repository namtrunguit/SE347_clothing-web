import nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()

export const sendEmail = async (to: string, subject: string, html: string) => {
  // Kiểm tra xem có config SMTP không
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP not configured, skipping email send')
    return null
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    connectionTimeout: 5000, // 5s timeout cho connection
    greetingTimeout: 5000, // 5s timeout cho greeting
    socketTimeout: 10000, // 10s timeout cho socket
  })

  try {
    const info = await Promise.race([
      transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME || 'YORI Fashion'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html // html body
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email timeout after 10s')), 10000)
      )
    ]) as any
    
    console.log('Message sent: %s', info.messageId)
    return info
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
