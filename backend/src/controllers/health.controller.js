import healthService from '../services/health.service.js';

const getHealth = async (req, res) => {
  try {
    const healtStatus = await healthService.checkHealth();

    if (healtStatus.status === 'error') {
      return res.status(503).json(healtStatus);
    }

    return res.status(200).json(healtStatus);
  } catch (error) {
    return res.status(503).json({
      status: 'error',
      database: 'disconnected',
    });
  }
};

export default {
  getHealth,
};
