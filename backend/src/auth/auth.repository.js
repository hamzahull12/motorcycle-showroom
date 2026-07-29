import pool from '../config/database.js';

const findByEmail = async (email) => {
  const query = `
    SELECT
      id,
      username,
      email,
      password_hash,
      role,
      is_active,
      last_login_at
    FROM users
    WHERE email = $1;
  `;

  const { rows } = await pool.query(query, [email]);

  return rows[0];
};

const findById = async (id) => {
  const query = `
    SELECT
      id,
      username,
      email,
      role,
      is_active,
      last_login_at,
      created_at,
      updated_at
    FROM users
    WHERE id = $1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

const updateLastLogin = async (id) => {
  const query = `
    UPDATE users
    SET
      last_login_at = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1;
  `;

  await pool.query(query, [id]);
};

const createRefreshToken = async ({
  userId,
  token,
  expiresAt,
}) => {
  const query = `
    INSERT INTO refresh_tokens
    (
      user_id,
      token,
      expires_at
    )
    VALUES
    (
      $1,
      $2,
      $3
    )
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    userId,
    token,
    expiresAt,
  ]);

  return rows[0];
};

const findRefreshToken = async (
  token,
) => {
  const query = `
    SELECT *
    FROM refresh_tokens
    WHERE token = $1;
  `;

  const { rows } = await pool.query(query, [
    token,
  ]);

  return rows[0];
};

const deleteRefreshToken = async (
  token,
) => {
  const query = `
    DELETE
    FROM refresh_tokens
    WHERE token = $1;
  `;

  await pool.query(query, [token]);
};

const deleteUserRefreshTokens =
  async (userId) => {
    const query = `
      DELETE
      FROM refresh_tokens
      WHERE user_id = $1;
    `;

    await pool.query(query, [userId]);
  };

export default {
  findByEmail,
  findById,
  updateLastLogin,

  createRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteUserRefreshTokens,
};