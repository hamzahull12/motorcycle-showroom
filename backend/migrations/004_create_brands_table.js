/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createTable('brands', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },

    name: {
      type: 'varchar(100)',
      notNull: true,
      unique: true,
    },

    slug: {
      type: 'varchar(100)',
      notNull: true,
      unique: true,
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
  pgm.dropTable('brands');
};