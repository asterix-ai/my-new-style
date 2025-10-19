import { useContext } from 'react';
import { FirebaseContext } from '../contexts/FirebaseContext';

export const useAuth = () => {
  return useContext(FirebaseContext);
};
