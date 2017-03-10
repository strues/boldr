import { responseHandler } from '../../core/index';
import { User, Role } from '../../models';

export async function listRoles(req, res, next) {
  try {
    const roles = await Role.query().eager('users').omit(User, ['password']);

    return responseHandler(res, 200, roles);
  } catch (error) {
    return next(error);
  }
}

export async function getRole(req, res, next) {
  try {
    const role = await Role.query().findById(req.params.id);

    return responseHandler(res, 200, role);
  } catch (error) {
    return next(error);
  }
}

export async function getRoleUsers(req, res, next) {
  try {
    const role = await Role.query().findById(req.params.id).eager('users').omit(User, ['password']);

    return responseHandler(res, 200, role);
  } catch (error) {
    return next(error);
  }
}
