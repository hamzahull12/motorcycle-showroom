/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createTable('motorcycles', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },

    brand_id: {
      type: 'uuid',
      notNull: true,
      references: 'brands(id)',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },

    title: {
      type: 'varchar(255)',
      notNull: true,
    },

    slug: {
      type: 'varchar(255)',
      notNull: true,
      unique: true,
    },

    category: {
      type: 'varchar(50)',
      notNull: true,
    },

    engine_stroke: {
      type: 'engine_stroke_enum',
      notNull: true,
    },

    transmission: {
      type: 'transmission_enum',
      notNull: true,
    },

    engine_capacity_cc: {
      type: 'integer',
      notNull: true,
    },

    color: {
      type: 'varchar(100)',
      notNull: true,
    },

    year: {
      type: 'smallint',
      notNull: true,
    },

    mileage_km: {
      type: 'integer',
      notNull: true,
      default: 0,
    },

    price: {
      type: 'numeric(15, 0)',
      notNull: true,
    },

    tax_expired_at: {
      type: 'date',
    },

    status: {
      type: 'inventory_status_enum',
      notNull: true,
      default: 'available',
    },

    location: {
      type: 'varchar(100)',
    },

    description: {
      type: 'text',
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
  pgm.dropTable('motorcycles');
};