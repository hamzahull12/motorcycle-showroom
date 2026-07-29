const validatePagination = ({ page, limit }) => {
  const errors = {};

  if (page !== undefined) {
    const parsedPage = Number(page);

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      errors.page = 'Page must be a positive integer';
    }
  }

  if (limit !== undefined) {
    const parsedLimit = Number(limit);

    if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
      errors.limit = 'Limit must be a positive integer';
    } else if (parsedLimit > 100) {
      errors.limit = 'Limit must not exceed 100';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validateFilters = ({
  brand,
  category,
  status,
  search,
  sortBy,
  sortOrder,
  minPrice,
  maxPrice,
  minYear,
  maxYear
}) => {
  const errors = {};

  if (search !== undefined) {
    if (
      typeof search !== 'string' ||
      search.trim().length === 0
    ) {
      errors.search = 'Search must be a non-empty string';
    } else if (search.trim().length < 2) {
      errors.search = 'Search must be at least 2 characters';
    } else if (search.trim().length > 100) {
      errors.search = 'Search must not exceed 100 characters';
    }
  }

  if (brand !== undefined) {
    if (typeof brand !== 'string' || brand.trim().length === 0) {
      errors.brand = 'Brand must be a non-empty string';
    }
  }

  const allowedCategories = [
    'matic',
    'sport',
    'naked',
    'cruiser',
    'adventure',
    'bebek',
  ];

  if (category !== undefined) {
    if (typeof category !== 'string' || category.trim().length === 0) {
      errors.category = 'Category must be a non-empty string';
    } else if (!allowedCategories.includes(category)) {
      errors.category = 'Invalid category';
    }
  }

  const allowedStatuses = [
    'available',
    'reserved',
    'sold',
  ];

  if (status !== undefined) {
    if (typeof status !== 'string' || status.trim().length === 0) {
      errors.status = 'Status must be a non-empty string';
    } else if (!allowedStatuses.includes(status)) {
      errors.status = 'Invalid status';
    }
  }

  const allowedSortFields = [
    'price',
    'year',
    'mileage',
    'created_at',
  ];

  if (sortBy !== undefined) {
    if (!allowedSortFields.includes(sortBy)) {
      errors.sortBy = 'Invalid sort field';
    }
  }

  const allowedSortOrders = [
    'asc',
    'desc',
  ];

  if (sortOrder !== undefined) {
    if (!allowedSortOrders.includes(sortOrder)) {
      errors.sortOrder = 'Sort order must be asc or desc';
    }
  }

  const validatePrice = (value) => {
    if (value === undefined) {
      return null;
    }

    if (!/^\d+$/.test(value)) {
      return 'Price must be a positive integer';
    }

    if (Number(value) < 0) {
      return 'Price must be a positive integer';
    }

    return null;
  };

  const minPriceError = validatePrice(minPrice);

  if (minPriceError) {
    errors.minPrice = minPriceError;
  }

  const maxPriceError = validatePrice(maxPrice);

  if (maxPriceError) {
    errors.maxPrice = maxPriceError;
  }

  if (
    minPrice !== undefined &&
    maxPrice !== undefined &&
    /^\d+$/.test(minPrice) &&
    /^\d+$/.test(maxPrice) &&
    Number(minPrice) > Number(maxPrice)
  ) {
    errors.minPrice = 'Min price must not be greater than max price';
  }

  const validateYear = (value) => {
    if (value === undefined) {
      return null;
    }

    if (!/^\d{4}$/.test(value)) {
      return 'Year must be a valid 4-digit year';
    }

    return null;
  };

  const minYearError = validateYear(minYear);

  if (minYearError) {
    errors.minYear = minYearError;
  }

  const maxYearError = validateYear(maxYear);

  if (maxYearError) {
    errors.maxYear = maxYearError;
  }

  if (
    minYear !== undefined &&
    maxYear !== undefined &&
    /^\d{4}$/.test(minYear) &&
    /^\d{4}$/.test(maxYear) &&
    Number(minYear) > Number(maxYear)
  ) {
    errors.minYear = 'Min year must not be greater than max year';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validateCreateMotorcycle = ({
  brand_id,
  title,
  category,
  engine_stroke,
  transmission,
  engine_capacity_cc,
  color,
  year,
  mileage_km,
  price,
  tax_expired_at,
  status,
  location,
  description,
}) => {
  const errors = {};

  if (brand_id === undefined) {
    errors.brand_id = 'Brand ID is required';
  } else if (typeof brand_id !== 'string') {
    errors.brand_id = 'Brand ID must be a string';
  }

  if (title === undefined) {
    errors.title = 'Title is required';
  } else if (typeof title !== 'string') {
    errors.title = 'Title must be a string';
  } else if (title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  } else if (title.trim().length > 150) {
    errors.title = 'Title must not exceed 150 characters';
  }

  const validCategories = [
    'matic',
    'sport',
    'naked',
    'cruiser',
    'adventure',
    'bebek',
    'classic',
    'electric',
  ];

  if (category === undefined) {
    errors.category = 'Category is required';
  } else if (!validCategories.includes(category)) {
    errors.category = 'Invalid category';
  }

  const validEngineStrokes = [
    '2_tak',
    '4_tak',
    'electric',
  ];

  if (engine_stroke === undefined) {
    errors.engine_stroke = 'Engine stroke is required';
  } else if (!validEngineStrokes.includes(engine_stroke)) {
    errors.engine_stroke = 'Invalid engine stroke';
  }

  const validTransmissions = [
    'manual',
    'matic',
    'semi_automatic',
  ];

  if (transmission === undefined) {
    errors.transmission = 'Transmission is required';
  } else if (!validTransmissions.includes(transmission)) {
    errors.transmission = 'Invalid transmission';
  }

  if (engine_capacity_cc === undefined) {
    errors.engine_capacity_cc = 'Engine capacity is required';
  } else if (
    !Number.isInteger(engine_capacity_cc) ||
    engine_capacity_cc < 0
  ) {
    errors.engine_capacity_cc =
      'Engine capacity must be a positive integer';
  }

  if (color === undefined) {
    errors.color = 'Color is required';
  } else if (typeof color !== 'string') {
    errors.color = 'Color must be a string';
  }

  if (year === undefined) {
    errors.year = 'Year is required';
  } else if (
    !Number.isInteger(year) ||
    year < 1900
  ) {
    errors.year = 'Year must be a valid integer';
  }

  if (mileage_km === undefined) {
    errors.mileage_km = 'Mileage is required';
  } else if (
    !Number.isInteger(mileage_km) ||
    mileage_km < 0
  ) {
    errors.mileage_km =
      'Mileage must be a positive integer';
  }

  if (price === undefined) {
    errors.price = 'Price is required';
  } else if (
    !Number.isInteger(price) ||
    price < 0
  ) {
    errors.price =
      'Price must be a positive integer';
  }

  if (tax_expired_at === undefined) {
    errors.tax_expired_at = 'Tax expired date is required';
  }

  const validStatuses = [
    'available',
    'reserved',
    'sold',
  ];

  if (status === undefined) {
    errors.status = 'Status is required';
  } else if (!validStatuses.includes(status)) {
    errors.status = 'Invalid status';
  }

  if (location === undefined) {
    errors.location = 'Location is required';
  } else if (typeof location !== 'string') {
    errors.location = 'Location must be a string';
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.description = 'Description must be a string';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validateUpdateMotorcycle = ({
  brand_id,
  title,
  category,
  engine_stroke,
  transmission,
  engine_capacity_cc,
  color,
  year,
  mileage_km,
  price,
  tax_expired_at,
  status,
  location,
  description,
}) => {
  const errors = {};

  // Minimal satu field harus dikirim
  const fields = [
    brand_id,
    title,
    category,
    engine_stroke,
    transmission,
    engine_capacity_cc,
    color,
    year,
    mileage_km,
    price,
    tax_expired_at,
    status,
    location,
    description,
  ];

  if (fields.every((field) => field === undefined)) {
    errors.body = 'At least one field is required';
  }

  // brand_id
  if (brand_id !== undefined) {
    if (typeof brand_id !== 'string') {
      errors.brand_id = 'Brand ID must be a string';
    }
  }

  // title
  if (title !== undefined) {
    if (typeof title !== 'string') {
      errors.title = 'Title must be a string';
    } else if (title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters';
    } else if (title.trim().length > 150) {
      errors.title = 'Title must not exceed 150 characters';
    }
  }

  // category
  if (category !== undefined) {
    const validCategories = [
      'matic',
      'sport',
      'bebek',
      'naked',
      'cruiser',
      'adventure',
      'offroad',
      'classic',
      'electric',
    ];

    if (!validCategories.includes(category)) {
      errors.category = 'Invalid category';
    }
  }

  // engine_stroke
  if (engine_stroke !== undefined) {
    const validEngineStrokes = ['2_tak', '4_tak'];

    if (!validEngineStrokes.includes(engine_stroke)) {
      errors.engine_stroke = 'Invalid engine stroke';
    }
  }

  // transmission
  if (transmission !== undefined) {
    const validTransmissions = ['manual', 'matic'];

    if (!validTransmissions.includes(transmission)) {
      errors.transmission = 'Invalid transmission';
    }
  }

  // engine_capacity_cc
  if (engine_capacity_cc !== undefined) {
    if (
      !Number.isInteger(engine_capacity_cc) ||
      engine_capacity_cc <= 0
    ) {
      errors.engine_capacity_cc =
        'Engine capacity must be a positive integer';
    }
  }

  // color
  if (color !== undefined) {
    if (typeof color !== 'string') {
      errors.color = 'Color must be a string';
    } else if (color.trim().length < 2) {
      errors.color = 'Color must be at least 2 characters';
    }
  }

  // year
  if (year !== undefined) {
    if (!Number.isInteger(year) || year < 1900) {
      errors.year = 'Year must be a valid integer';
    }
  }

  // mileage_km
  if (mileage_km !== undefined) {
    if (!Number.isInteger(mileage_km) || mileage_km < 0) {
      errors.mileage_km =
        'Mileage must be a positive integer';
    }
  }

  // price
  if (price !== undefined) {
    if (!Number.isInteger(price) || price <= 0) {
      errors.price =
        'Price must be a positive integer';
    }
  }

  // tax_expired_at
  if (tax_expired_at !== undefined) {
    if (typeof tax_expired_at !== 'string') {
      errors.tax_expired_at =
        'Tax expired date must be a string';
    }
  }

  // status
  if (status !== undefined) {
    const validStatuses = [
      'available',
      'reserved',
      'sold',
    ];

    if (!validStatuses.includes(status)) {
      errors.status = 'Invalid status';
    }
  }

  // location
  if (location !== undefined) {
    if (typeof location !== 'string') {
      errors.location = 'Location must be a string';
    } else if (location.trim().length < 2) {
      errors.location = 'Location must be at least 2 characters';
    }
  }

  // description
  if (description !== undefined) {
    if (typeof description !== 'string') {
      errors.description =
        'Description must be a string';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  validatePagination,
  validateFilters,
  validateCreateMotorcycle,
  validateUpdateMotorcycle
}