import { getCachedData } from './getCachedData';

export default async function GetRounds(org: string) {
  return getCachedData(`/${org}`);
}