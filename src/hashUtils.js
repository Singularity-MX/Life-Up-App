
import { SHA256 } from 'crypto-js';

export const calculateHash =  (value) => {
  const hash = SHA256(value).toString();
  return hash;
};



