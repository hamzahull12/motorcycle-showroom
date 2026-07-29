/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createIndex('motorcycles', 'brand_id');

  pgm.createIndex('motorcycles', 'status');

  pgm.createIndex('motorcycles', 'category');

  pgm.createIndex('motorcycles', 'price');

  pgm.createIndex('motorcycles', 'year');

  pgm.createIndex('motorcycle_images', 'motorcycle_id');
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const down = (pgm) => {
  pgm.dropIndex('motorcycle_images', 'motorcycle_id');

  pgm.dropIndex('motorcycles', 'year');

  pgm.dropIndex('motorcycles', 'price');

  pgm.dropIndex('motorcycles', 'category');

  pgm.dropIndex('motorcycles', 'status');

  pgm.dropIndex('motorcycles', 'brand_id');
};