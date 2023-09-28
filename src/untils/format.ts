export function formatCount(count: number) {
  if (count > 10000) {
    return Math.floor(count / 10000) + '万';
  } else {
    return count;
  }
}

export function getImageSize(imageUrl: string, width: number, height: number = width) {
  return imageUrl + `?param=${width}x${height}`;
}

export function timestampToTime(timestamp: number) {
  const date = new Date(timestamp);
  const m = date.getMinutes();
  const s = date.getSeconds();
  return m + ':' + s;
}
