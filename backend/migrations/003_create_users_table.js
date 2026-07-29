/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },

    username: {
      type: 'varchar(50)',
      notNull: true,
      unique: true,
    },

    email: {
      type: 'varchar(255)',
      notNull: true,
      unique: true,
    },

    password_hash: {
      type: 'varchar(255)',
      notNull: true,
    },

    role: {
      type: 'user_role_enum',
      notNull: true,
      default: 'staff',
    },

    is_active: {
      type: 'boolean',
      notNull: true,
      default: true,
    },

    created_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },

    updated_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const down = (pgm) => {
  pgm.dropTable('users');
};