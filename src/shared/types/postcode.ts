export type GeoData = {
  postcode: string
  status: string
  usertype: string
  easting: number
  northing: number
  positional_quality_indicator: number
  country: string
  latitude: string
  longitude: string
  postcode_no_space: string
  postcode_fixed_width_seven: string
  postcode_fixed_width_eight: string
  postcode_area: string
  postcode_district: string
  postcode_sector: string
  outcode: string
  incode: string
}

export type Copyright = string[]

export type Postcode = {
  status: string
  match_type: MatchType
  input: string
  data: GeoData
  copyright: Copyright
}

export enum MatchType {
  UNIT_POSTCODE = "unit_postcode",
  POSTCODE_DISTRICT = "postcode_district",
}
