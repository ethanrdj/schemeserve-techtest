import { Crime } from "../types/crime"

export const mockOngoingCrime: Crime = {
  category: "anti-social-behaviour",
  location_type: "Force",
  location: {
    latitude: "51.475012",
    street: {
      id: 1653171,
      name: "On or near Petrol Station",
    },
    longitude: "-0.392307",
  },
  context: "",
  outcome_status: null,
  persistent_id: "",
  id: 116089427,
  location_subtype: "",
  month: "2024-01",
}

export const mockOutcomeCrime: Crime = {
  category: "anti-social-behaviour",
  location_type: "Force",
  location: {
    latitude: "51.475012",
    street: {
      id: 7687588,
      name: "On or near Petrol Station",
    },
    longitude: "-0.392307",
  },
  context: "",
  outcome_status: { category: "Under investigation", date: "" },
  persistent_id: "",
  id: 116089427,
  location_subtype: "",
  month: "2024-01",
}
