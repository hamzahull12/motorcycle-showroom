import pool from '../config/database.js';

const findByMotorcycleId = async (motorcycleId) => {
  const query = `
    SELECT
      id,
      motorcycle_id,
      image_url,
      is_primary,
      sort_order,
      created_at,
      updated_at
    FROM motorcycle_images
    WHERE motorcycle_id = $1
    ORDER BY sort_order ASC, created_at ASC;
  `;

  const { rows } = await pool.query(query, [motorcycleId]);

  return rows;
};

const findById = async (id) => {
  const query = `
    SELECT
      id,
      motorcycle_id,
      image_url,
      is_primary,
      sort_order,
      created_at,
      updated_at
    FROM motorcycle_images
    WHERE id = $1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

const create = async ({
  id,
  motorcycleId,
  imageUrl,
  isPrimary,
  sortOrder,
}) => {
  const query = `
    INSERT INTO motorcycle_images (
      id,
      motorcycle_id,
      image_url,
      is_primary,
      sort_order
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      motorcycle_id,
      image_url,
      is_primary,
      sort_order,
      created_at,
      updated_at;
  `;

  const values = [
    id,
    motorcycleId,
    imageUrl,
    isPrimary,
    sortOrder,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

const unsetPrimaryImages = async (motorcycleId) => {
  const query = `
    UPDATE motorcycle_images
    SET
      is_primary = false,
      updated_at = CURRENT_TIMESTAMP
    WHERE motorcycle_id = $1
      AND is_primary = true;
  `;

  await pool.query(query, [motorcycleId]);
};

const update = async (
  id,
  fields,
) => {
  const values = [];
  const updates = [];

  Object.entries(fields).forEach(
    ([column, value]) => {
      values.push(value);

      updates.push(
        `${column} = $${values.length}`,
      );
    },
  );

  values.push(id);

  const query = `
    UPDATE motorcycle_images
    SET
      ${updates.join(', ')},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $${values.length}
    RETURNING
      id,
      motorcycle_id,
      image_url,
      is_primary,
      sort_order,
      created_at,
      updated_at;
  `;

  const { rows } = await pool.query(
    query,
    values,
  );

  return rows[0];
};

const countPrimaryImages = async (motorcycleId) => {
  const query = `
    SELECT COUNT(*)::int AS total
    FROM motorcycle_images
    WHERE motorcycle_id = $1
      AND is_primary = true;
  `;

  const { rows } = await pool.query(query, [
    motorcycleId,
  ]);

  return rows[0].total;
};

const remove = async (id) => {
  const query = `
    DELETE FROM motorcycle_images
    WHERE id = $1
    RETURNING
      id,
      motorcycle_id,
      image_url,
      is_primary;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};
const findReplacementPrimary = async (
  motorcycleId,
  excludeId,
) => {
  const query = `
    SELECT
      id
    FROM motorcycle_images
    WHERE motorcycle_id = $1
      AND id != $2
    ORDER BY sort_order ASC, created_at ASC
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [
    motorcycleId,
    excludeId,
  ]);

  return rows[0];
};

const setPrimaryImage = async (id) => {
  const query = `
    UPDATE motorcycle_images
    SET
      is_primary = true,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1;
  `;

  await pool.query(query, [id]);
};

export default {
  findByMotorcycleId,
  findById,
  create,
  unsetPrimaryImages,
  update,
  countPrimaryImages,
  remove,
  findReplacementPrimary,
  setPrimaryImage
};