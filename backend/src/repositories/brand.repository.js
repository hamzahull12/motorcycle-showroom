import pool from '../config/database.js';
import { ConflictError } from '../utils/errors.js';

const findAll = async () => {
  const result = await pool.query(`
    SELECT
      id,
      name,
      slug,
      created_at,
      updated_at
    FROM brands
    ORDER BY name ASC `);

  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query(`
    SELECT id, name, slug, created_at, updated_at
    FROM brands WHERE id = $1`, [id]);
  return result.rows[0];
};

const create = async ({ name, slug }) => {
  try {
    const result = await pool.query(
      `
        INSERT INTO brands (name, slug)
        VALUES ($1, $2)
        RETURNING *
      `,
      [name, slug],
    );

    return result.rows[0];
  } catch (error) {
    if (error.code === '23505') {
      throw new ConflictError('Brand already exists');
    }

    throw error;
  }
};

const update = async (id, { name, slug }) => {
  try {
    const result = await pool.query(
      `
        UPDATE brands
        SET
          name = $1,
          slug = $2,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *
      `,
      [name, slug, id],
    );

    return result.rows[0];
  } catch (error) {
    if (error.code === '23505') {
      throw new ConflictError('Brand already exists');
    }

    throw error;
  }
};

const remove = async (id) => {
  try {
    const result = await pool.query(
      `
        DELETE FROM brands
        WHERE id = $1
        RETURNING id
      `,
      [id],
    );

    return result.rows[0];
  } catch (error) {
    if (error.code === '23503') {
      throw new ConflictError(
        'Cannot delete brand because it is still used by motorcycles',
      );
    }

    throw error;
  }
};

export default {
  findAll,
  findById,
  create,
  update,
  remove
};
