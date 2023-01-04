const response = {
  /**
   *
   * @param {String} message
   * @param {Arrya|Object} data
   * @param {Number} pages
   * @param {Number} total
   * @returns Object
   */
  success: (message, data, pages = null, total = null) => {
    const isExists = Boolean(
      data &&
        ((data instanceof Array && data.length > 0) || data instanceof Object)
    );
    if (isExists) {
      if (pages && total) {
        return { message, status: 1, pages, total, data };
      } else {
        return { message, status: 1, data };
      }
    } else {
      return { message, status: 1 };
    }
  },
  /**
   *
   * @param {String} messages
   * @returns Object
   */
  error: (message) => {
    return { message, status: 0 };
  },
};
export default response;
