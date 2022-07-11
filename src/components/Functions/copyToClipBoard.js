const copyToClipBoard = async (copyText, setCopyFunction) => {
  try {
    await navigator.clipboard.writeText(copyText);
    setCopyFunction("Copied!");
  } catch (err) {
    setCopyFunction("Failed to copy!");
  } finally {
    setTimeout(() => {
      setCopyFunction("Copy");
    }, 1500);
  }
};

export default copyToClipBoard;
