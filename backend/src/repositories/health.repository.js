import pool from '../config/database.js'

const checkDatabaseConnection = async () => {
  const result = await pool.query('SELECT 1');

  return result.rowCount === 1;
};

export default {
  checkDatabaseConnection,
};