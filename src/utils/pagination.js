module.exports.pagination = (page, limit, arr, origin) => {
  const arrTitle = [origin, 'pagination'];

  const totalPage = Math.ceil(arr.length / limit);
  page = page === 0 ? 1 : page;
  const start = page * limit - limit;
  const end = start + limit;
  const slice = arr.slice(start, end);

  const response = {
    0: slice,
    1: {
      movies: arr.length,
      limit,
      totalPages: totalPage,
      currentPage: page,
    },
  };

  Object.keys(response).forEach(key => {
    const newKey = arrTitle[key];
    response[newKey] = response[key];
    delete response[key];
  });

  return response;
};
