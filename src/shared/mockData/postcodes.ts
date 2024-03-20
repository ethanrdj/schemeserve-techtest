import { MatchType, Postcode } from "../types/postcode"

export const mockPostcode: Postcode = {
  status: "match",
  match_type: MatchType.UNIT_POSTCODE,
  input: "TW5 9RL",
  data: {
    postcode: "TW5 9RL",
    status: "live",
    usertype: "small",
    easting: 510364,
    northing: 176971,
    positional_quality_indicator: 1,
    country: "England",
    latitude: "51.480938",
    longitude: "-0.412088",
    postcode_no_space: "TW59RL",
    postcode_fixed_width_seven: "TW5 9RL",
    postcode_fixed_width_eight: "TW5  9RL",
    postcode_area: "TW",
    postcode_district: "TW5",
    postcode_sector: "TW5 9",
    outcode: "TW5",
    incode: "9RL",
  },
  copyright: [
    "Contains OS data (c) Crown copyright and database right 2024",
    "Contains Royal Mail data (c) Royal Mail copyright and database right 2024",
    "Contains National Statistics data (c) Crown copyright and database right 2024",
  ],
}
