const asyncHandler = require("express-async-handler");

const paginate = asyncHandler(async (
  model,
  page = 1,
  limit = 10,
  filters = {},
  order = [],
  columns = {}
) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await model.findAndCountAll({
    where: filters,
    order,
    attributes: columns ,
    offset: offset,
    limit: limit,
  });

  return {
    total: count,
    data: rows,
    currentPage: page,
    previousPage: page == 1 ? null : page - 1,
    nextPage: page * limit >= count ? null : page + 1,
    lastPage: Math.ceil(count / limit),
    countPerPage: limit,
  };
});

module.exports = paginate;
