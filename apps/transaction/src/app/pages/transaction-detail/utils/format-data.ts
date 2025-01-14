export function formatData(data: any) {
  const obj: Record<string, string | number> = {};

  for (const key in data) {
    if (Array.isArray(data[key])) {
      obj[key] = data[key].map((item: any) => item.label).join(' ');
    } else if (typeof data[key] === 'string' || typeof data[key] === 'number') {
      obj[key] = data[key];
    } else if (data[key] && typeof data[key] === 'object') {
      obj[key] = data[key].label;
    }
  }

  return obj;
}
