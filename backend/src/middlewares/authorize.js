import { ForbiddenError } from '../utils/errors.js';

const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return next(
      new ForbiddenError('User is not authenticated'),
    );
  }

  if (req.user.role !== 'admin') {
    return next(
      new ForbiddenError(
        'You do not have permission to perform this action',
      ),
    );
  }

  next();
};

export default authorizeAdmin;