/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createIndex(
    'motorcycle_images',
    'motorcycle_id',
    {
      name: 'one_primary_image_per_motorcycle',
      unique: true,
      where: 'is_primary = true',
    },
  );
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const down = (pgm) => {
  pgm.dropIndex(
    'motorcycle_images',
    'motorcycle_id',
    {
      name: 'one_primary_image_per_motorcycle',
    },
  );
};