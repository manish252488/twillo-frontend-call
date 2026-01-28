// all api and libraries will be exported and managed here.
export { callsApi } from './calls';
export { authApi } from './auth';
export type { LoginRequest, LoginResponse } from './auth';

import { callsApi } from './calls';
import { authApi } from './auth';

export default {
  callsApi,
  authApi,
};

