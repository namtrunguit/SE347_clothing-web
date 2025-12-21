import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

const locationsPath = path.resolve('src/data/locations.json')
const locationsData = JSON.parse(fs.readFileSync(locationsPath, 'utf-8'))

export const getProvincesController = (req: Request, res: Response) => {
  const provinces = locationsData.map((p: any) => ({
    id: p.id,
    name: p.name,
    code: p.code
  }))
  return res.json({
    message: 'Get provinces successfully',
    result: provinces
  })
}

export const getDistrictsController = (req: Request, res: Response) => {
  const { province_id } = req.params
  const province = locationsData.find((p: any) => p.id === province_id)

  if (!province) {
    return res.status(404).json({ message: 'Province not found' })
  }

  const districts = province.districts.map((d: any) => ({
    id: d.id,
    name: d.name,
    province_id: province.id
  }))

  return res.json({
    message: 'Get districts successfully',
    result: districts
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
    return res.status(404).json({ message: 'District not found' })
  }

  const wards = foundDistrict.wards.map((w: any) => ({
    id: w.id,
    name: w.name,
    district_id: foundDistrict.id
  }))

  return res.json({
    message: 'Get wards successfully',
    result: wards
  })
}
