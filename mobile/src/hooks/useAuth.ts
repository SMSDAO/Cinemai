/**
 * useAuth Hook
 * Simplified access to authentication context
 */

import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  return useAuthContext();
};
