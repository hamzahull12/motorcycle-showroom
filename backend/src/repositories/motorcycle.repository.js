import pool from '../config/database.js';

const findAll = async ({
  page,
  limit,
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
  const offset = (page - 1) * limit;

  const conditions = [];
  const values = [];

  if (brand) {
    values.push(brand);
    conditions.push(`b.slug = $${values.length}`);
  }

  if (category) {
    values.push(category);
    conditions.push(`m.category = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`m.status = $${values.length}`);
  }

  if (search) {
    values.push(`%${search}%`);

    conditions.push(`
      (
        m.title ILIKE $${values.length}
        OR b.name ILIKE $${values.length}
      )
    `);
  }

  if (minPrice !== undefined) {
    values.push(minPrice);
    conditions.push(`m.price >= $${values.length}`);
  }

  if (maxPrice !== undefined) {
    values.push(maxPrice);
    conditions.push(`m.price <= $${values.length}`);
  }

  if (minYear !== undefined) {
    values.push(minYear);
    conditions.push(`m.year >= $${values.length}`);
  }

  if (maxYear !== undefined) {
    values.push(maxYear);
    conditions.push(`m.year <= $${values.length}`);
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

  // Whitelist sorting
  const sortFields = {
    price: 'm.price',
    year: 'm.year',
    mileage: 'm.mileage_km',
    created_at: 'm.created_at',
  };

  const sortColumn = sortFields[sortBy] || 'm.created_at';
  const order = sortOrder || 'desc';

  const limitIndex = values.length + 1;
  const offsetIndex = values.length + 2;

  values.push(limit);
  values.push(offset);

  const dataQuery = `
  SELECT
    m.id,
    m.title,
    m.slug,
    m.category,
    m.engine_stroke,
    m.transmission,
    m.engine_capacity_cc,
    m.color,
    m.year,
    m.mileage_km,
    m.price,
    m.tax_expired_at,
    m.status,
    m.location,
    m.description,
    m.created_at,
    m.updated_at,

    json_build_object(
      'id', b.id,
      'name', b.name,
      'slug', b.slug
    ) AS brand,

    CASE
      WHEN mi.id IS NOT NULL THEN
        json_build_object(
          'id', mi.id,
          'image_url', mi.image_url,
          'sort_order', mi.sort_order
        )
      ELSE NULL
    END AS primary_image

  FROM motorcycles m

  INNER JOIN brands b
    ON b.id = m.brand_id

  LEFT JOIN motorcycle_images mi
    ON mi.motorcycle_id = m.id
    AND mi.is_primary = true

  ${whereClause}

  ORDER BY ${sortColumn} ${order.toUpperCase()}

  LIMIT $${limitIndex}
  OFFSET $${offsetIndex};
`;

  const countQuery = `
    SELECT COUNT(*)::int AS total
    FROM motorcycles m
    INNER JOIN brands b
      ON b.id = m.brand_id

    ${whereClause};
  `;

  const countValues = values.slice(0, values.length - 2);

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, values),
    pool.query(countQuery, countValues),
  ]);

  return {
    data: dataResult.rows,
    total: countResult.rows[0].total,
  };
};

const findById = async (id) => {
  const result = await pool.query(
    `
      SELECT
        m.id,
        m.title,
        m.slug,
        m.category,
        m.engine_stroke,
        m.transmission,
        m.engine_capacity_cc,
        m.color,
        m.year,
        m.mileage_km,
        m.price,
        m.tax_expired_at,
        m.status,
        m.location,
        m.description,
        m.created_at,
        m.updated_at,

        json_build_object(
          'id', b.id,
          'name', b.name,
          'slug', b.slug
        ) AS brand,

        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'id', mi.id,
                'image_url', mi.image_url,
                'is_primary', mi.is_primary,
                'sort_order', mi.sort_order
              )
              ORDER BY mi.sort_order ASC
            )
            FROM motorcycle_images mi
            WHERE mi.motorcycle_id = m.id
          ),
          '[]'::json
        ) AS images

      FROM motorcycles m
      INNER JOIN brands b
        ON b.id = m.brand_id

      WHERE m.id = $1;
    `,
    [id],
  );

  return result.rows[0];
};

const create = async ({
  id,
  brandId,
  title,
  slug,
  category,
  engineStroke,
  transmission,
  engineCapacityCc,
  color,
  year,
  mileageKm,
  price,
  taxExpiredAt,
  status,
  location,
  description,
}) => {
  const query = `
    INSERT INTO motorcycles (
      id,
      brand_id,
      title,
      slug,
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
      description
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15,
      $16
    )
    RETURNING
      id,
      brand_id,
      title,
      slug,
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
      created_at,
      updated_at;
  `;

  const values = [
    id,
    brandId,
    title,
    slug,
    category,
    engineStroke,
    transmission,
    engineCapacityCc,
    color,
    year,
    mileageKm,
    price,
    taxExpiredAt,
    status,
    location,
    description,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const findBySlug = async (slug) => {
  const query = `
    SELECT id
    FROM motorcycles
    WHERE slug = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [slug]);

  return result.rows[0] || null;
};

const update = async ({
  id,
  brandId,
  title,
  slug,
  category,
  engineStroke,
  transmission,
  engineCapacityCc,
  color,
  year,
  mileageKm,
  price,
  taxExpiredAt,
  status,
  location,
  description,
}) => {
  const fields = [];
  const values = [];

  const addField = (column, value) => {
    if (value !== undefined) {
      values.push(value);
      fields.push(`${column} = $${values.length}`);
    }
  };

  addField('brand_id', brandId);
  addField('title', title);
  addField('slug', slug);
  addField('category', category);
  addField('engine_stroke', engineStroke);
  addField('transmission', transmission);
  addField('engine_capacity_cc', engineCapacityCc);
  addField('color', color);
  addField('year', year);
  addField('mileage_km', mileageKm);
  addField('price', price);
  addField('tax_expired_at', taxExpiredAt);
  addField('status', status);
  addField('location', location);
  addField('description', description);

  fields.push('updated_at = NOW()');

  values.push(id);

  const idIndex = values.length;

  const query = `
    UPDATE motorcycles
    SET ${fields.join(', ')}
    WHERE id = $${idIndex}
    RETURNING
      id,
      brand_id,
      title,
      slug,
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
      created_at,
      updated_at;
  `;

  const result = await pool.query(query, values);

  return result.rows[0];
};

const remove = async (id) => {
  const query = `
    DELETE FROM motorcycles
    WHERE id = $1
    RETURNING id;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

export default {
  findAll,
  findById,
  create,
  findBySlug,
  update,
  remove
};