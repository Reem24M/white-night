// Supported booking event types
export const EventTypes = ["Foto Session", "Graduation Party", "Wedding", "Engagement"];

// Hall types for the white-night booking platform
export const HallTypes = ["Hall", "Organization_halls", "Roof", "Photosation"];

// Price range options
export const PriceRanges = ["low", "medium", "high"];

// Days of week
export const Days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

// Limits
export const LIMITS = {
  NAME_MIN: 3,
  NAME_MAX: 100,
  DESCRIPTION_MIN: 10,
  DESCRIPTION_MAX: 1000,
  GALLERY_PHOTOS: 10,
  HALL_TYPES: 4,
};

// Cuisine types - kept for validator backward compat
export const CuisineTypes = HallTypes;
