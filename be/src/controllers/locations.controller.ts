import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import HTTP_STATUS from '~/constants/httpStatus'

const locationsPath = path.resolve('src/data/locations.json')
const locationsData = JSON.parse(fs.readFileSync(locationsPath, 'utf-8'))

export const getProvincesController = (req: Request, res: Response) => {
  const provinces = locationsData.map((p: any) => ({
    id: p.id,
    name: p.name,
    code: p.code
  }))
  return res.status(HTTP_STATUS.OK).json({
    message: 'Get provinces successfully',
    data: provinces
  })
}

export const getDistrictsController = (req: Request, res: Response) => {
  const { province_id } = req.params
  const province = locationsData.find((p: any) => p.id === province_id)

  if (!province) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Province not found' })
  }

  const districts = province.districts.map((d: any) => ({
    id: d.id,
    name: d.name,
    province_id: province.id,
    code: d.code
  }))

  return res.status(HTTP_STATUS.OK).json({
    message: 'Get districts successfully',
    data: districts
  })
}

export const getWardsController = (req: Request, res: Response) => {
  const { district_id } = req.params

  let foundDistrict: any = null

  // Search for district in all provinces
  for (const province of locationsData) {
    const district = province.districts.find((d: any) => d.id === district_id)
    if (district) {
      foundDistrict = district
      break
    }
  }

  if (!foundDistrict) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'District not found' })
  }

  const wards = foundDistrict.wards.map((w: any) => ({
    id: w.id,
    name: w.name,
    district_id: foundDistrict.id,
    code: w.code
  }))

  return res.status(HTTP_STATUS.OK).json({
    message: 'Get wards successfully',
    data: wards
  })
}
