// rotate the elements in rotate by distance count
export function arrayRotate(arr, count) {
  const len = arr.length;
  const offset = ((-count % len) + len) % len;
  const result = arr.slice(offset, len);
  result.push(...arr.slice(0, offset));
  return result;
}
