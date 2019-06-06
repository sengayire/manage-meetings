const paginate = (data, { currentPage, perPage = 5 }, { formatter, dataName } = {}) => {
  const startingPoint = (currentPage - 1) * perPage;
  const endingPoint = startingPoint + perPage;
  let pageContent = data.slice(startingPoint, endingPoint);
  const pages = Math.ceil(data.length / perPage);
  if (formatter) pageContent = formatter(pageContent);
  return {
    [dataName || 'pageContent']: pageContent,
    pages,
    hasNext: pages > currentPage,
    hasPrevious: currentPage !== 1,
  };
};

export default paginate;
