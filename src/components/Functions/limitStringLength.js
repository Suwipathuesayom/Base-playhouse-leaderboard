const limitStringLength = (string, maxLength) => {
  return string.length > maxLength
    ? `${string.slice(0, maxLength - 1)}...`
    : string;
};

export default limitStringLength;
