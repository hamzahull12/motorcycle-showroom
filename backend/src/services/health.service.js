import healthRepository from '../repositories/health.repository.js'

const checkHealth = async () => {
  const isDatabaseConnected = await healthRepository.checkDatabaseConnection();

  return {
    status: isDatabaseConnected ? 'ok' : 'error',
    database: isDatabaseConnected ? 'connected' : 'disconnected',
  };
};

export default {
  checkHealth,
};