export default function sort<T, Key extends keyof T>(key: Key) {
  return (a: T, b: T) => {
    if (a[key] < b[key]) {
      return 1;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    return 0;
  };
}
