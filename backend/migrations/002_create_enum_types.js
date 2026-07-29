/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createType('user_role_enum', ['admin', 'staff']);

  pgm.createType('engine_stroke_enum', ['2_tak', '4_tak']);

  pgm.createType('transmission_enum', ['matic', 'manual']);

  pgm.createType('inventory_status_enum', [
    'available',
    'reserved',
    'sold',
  ]);
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const down = (pgm) => {
  pgm.dropType('inventory_status_enum');
  pgm.dropType('transmission_enum');
  pgm.dropType('engine_stroke_enum');
  pgm.dropType('user_role_enum');
};