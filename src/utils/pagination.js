module.exports.pagination = (page, limit, arr, origin) => {
  const result = [];
  const arrTitle = [origin, 'pagination'];

  const totalPage = Math.ceil(arr.length / limit);
  let c = page * limit - limit;
  const delimiter = c + limit;

  if (page <= totalPage) {
    for (let i = c; i < delimiter; i += 1) {
      if (arr[i] !== undefined) {
        result.push(arr[i]);
      }
      c += 1;
    }
  }

  const response = {
    0: result,
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
