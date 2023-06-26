import { TextEncoderLite } from 'text-encoder-lite';

export const calculateHash = async (value) => {
  const encoder = new TextEncoderLite();
  const data = encoder.encode(value);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
};
