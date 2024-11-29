import axios from 'axios';
import { CONSTANTS } from '../types/index.js';

export function createApiClient(token: string) {
  return axios.create({
    baseURL: CONSTANTS.API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
} 