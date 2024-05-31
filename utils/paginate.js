const asyncHandler = require("express-async-handler");

exports.withCount = asyncHandler(
  async (
    model,
    page = 1,
    limit = 10,
    filters = {},
    order = [],
    columns = {},
    relation
  ) => {
    const offset = (page - 1) * limit;

    const Options = relation
      ? {
          where: filters,
          include: [relation],
          order,
          attributes: columns,
          offset: offset,
          limit: limit,
        }
      : {
          where: filters,
          order,
          attributes: columns,
          offset: offset,
          limit: limit,
        };
    const { count, rows } = await model.findAndCountAll(Options);

    return {
      total: count,
      data: rows,
      currentPage: page,
      previousPage: page == 1 ? null : page - 1,
      nextPage: page * limit >= count ? null : page + 1,
      lastPage: Math.ceil(count / limit),
      countPerPage: limit,
    };
  }
);

exports.noCount = asyncHandler(
  async (
    model,
    page = 1,
    limit = 10,
    filters = {},
    order = [],
    columns = {},
    relation
  ) => {
    const offset = (page - 1) * limit;

    const Options = relation
      ? {
          where: filters,
          include: [relation],
          order,
          attributes: columns,
          offset: offset,
          limit: limit + 1,
        }
      : {
          where: filters,
          order,
          attributes: columns,
          offset: offset,
          limit: limit + 1,
        };
    const rows = await model.findAll(Options);

    let hasNextPage = false;
    if (rows.length > limit) {
      // if got an extra result
      hasNextPage = true; // has a next page of results
      rows.pop(); // remove extra result
    }

    return {
      data: rows,
      currentPage: page,
      previousPage: page == 1 ? null : page - 1,
      nextPage: hasNextPage ? page + 1 : null,
      countPerPage: limit,
    };
  }
);
