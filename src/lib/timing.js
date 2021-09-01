const timing = (tag, fn) => {
  console.time(tag);
  const result = fn();
  console.timeEnd(tag);
  return result;
}

const timingAsync = async (tag, fn) => {
  console.time(tag);
  const result = await fn();
  console.timeEnd(tag);
  return result;
}

export { timing, timingAsync }
