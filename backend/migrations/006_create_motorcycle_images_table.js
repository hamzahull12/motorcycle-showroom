/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createTable('motorcycle_images', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },

    motorcycle_id: {
      type: 'uuid',
      notNull: true,
      references: 'motorcycles(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },

    image_url: {
      type: 'text',
      notNull: true,
    },

    is_primary: {
      type: 'boolean',
      notNull: true,
      default: false,
    },

    sort_order: {
      type: 'smallint',
      notNull: true,
      default: 0,
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
  pgm.dropTable('motorcycle_images');
};