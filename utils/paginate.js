const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");


exports.withCount = asyncHandler(
  async (
    model,
    page = 1,
    limit = 10,
    filters = {},
    order = [],
    fields = {},
    relation
  ) => {
    const offset = (page - 1) * limit;

    const options = {};
    if (filters) {
      options.where = filters;
    }
    if (relation) {
      options.include = relation;
    }
    if (order) {
      options.order = order;
    }
    if (fields) {
      options.attributes = fields;
    }
    options.offset = offset;
    options.limit = limit;

    const { count, rows } = await model.findAndCountAll(options);

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
    filters = null,
    order = null,
    fields = null,
    relation = null
  ) => {
    const offset = (page - 1) * limit;

    const options = {};
    if (filters) {
      options.where = filters;
    }
    if (relation) {
      options.include = relation;
    }
    if (order) {
      options.order = order;
    }
    if (fields) {
      options.attributes = fields;
    }
    options.offset = offset;
    options.limit = limit + 1;
    const rows = await model.findAll(options);

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

// Note, please.
// THis cursor-based pagination works well with MySQL DB.
// But it does not work well with PostgreSQL DB because of filtering not working.

exports.cursor = asyncHandler(
  async (
    model,
    cursor = null,
    limit = 10,
    filters = null,
    order = [["id", "DESC"]],
    fields = null,
    relation = null
  ) => {
    const cursorOptions = cursor ? { where: [{ id: { [Op.lt]: cursor } }, filters] } : {};

    let options = {};
    if (relation) {
      options.include = relation;
    }
    if (order) {
      options.order = order;
    }
    if (fields) {
      options.attributes = fields;
    }
    options.limit = limit;

    const rows = await model.findAll({...cursorOptions, ...options});
    const nextCursor = rows.length > 0 ? rows[rows.length - 1].id : null;
    const hasNextPage = rows.length === limit;

    return {
      data: rows,
      nextCursor,
      hasNextPage,
    };
  }
);
