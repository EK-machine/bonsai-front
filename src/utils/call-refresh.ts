export const callRefresh = (refreshBaseTime: number, callTime: number, timeToRefresh: number) => {
  const time = refreshBaseTime + timeToRefresh;

  if ((refreshBaseTime + callTime) >= time) {
    return true;
  }
  return false;
}