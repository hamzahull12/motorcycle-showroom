/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createTable('refresh_tokens', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },

    user_id: {
      type: 'uuid',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },

    token: {
      type: 'text',
      notNull: true,
      unique: true,
    },

    expires_at: {
      type: 'timestamptz',
      notNull: true,
    },

    created_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });

  pgm.createIndex('refresh_tokens', 'user_id');
  pgm.createIndex('refresh_tokens', 'token');
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const down = (pgm) => {
  pgm.dropTable('refresh_tokens');
};