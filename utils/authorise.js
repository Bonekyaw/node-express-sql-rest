/*
 * Authorization
 * These two functions are same
 * authorise(true, admin, "super", "manager", "editor") === authorise(false, admin, "user")
 * true means that his role must be one of these.
 * false means that his role must not be one of these.
 */

const authorise = (permission, admin, ...roles) => {
  const result = roles.includes(admin.role);

  if (!permission && result) {
    const err = new Error("This action is not allowed.");
    err.status = 403;
    throw err;
  }

  if (permission && !result) {
    const err = new Error("This action is not allowed.");
    err.status = 403;
    throw err;
  }
};

module.exports = authorise;
