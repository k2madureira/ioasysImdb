module.exports.pagination = (page, limit, arr, origin) => {
  const result = [];
  const arrTitle = [origin];
  const countKey = 0;
  const totalPage = Math.ceil(arr.length / limit);
  let count = page * limit - limit;
  const delimiter = count + limit;

  if (page <= totalPage) {
    for (let i = count; i < delimiter; i += 1) {
      if (arr[i] !== undefined) {
        result.push(arr[i]);
      }
      count += 1;
    }
  }

  const response = {
    0: result,
    pagination: {
      movies: arr.length,
      limit,
      totalPages: totalPage,
      currentPage: page,
    },
  };

  Object.keys(response).forEach(key => {
    if (countKey === 0) {
      const newKey = arrTitle[key];
      response[newKey] = response[key];
      delete response[key];
    }
  });

  return response;
};
