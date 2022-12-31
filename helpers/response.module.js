const response = {
  /**
   *
   * @param {String} message
   * @param {Number} status
   * @param {Arrya|Object} data
   * @returns Object
   */
  success: (message, data) => {
    const isExists = Boolean(
      data &&
        ((data instanceof Array && data.length > 0) || data instanceof Object)
    );
    if (isExists) {
      return { message, status: 1, data };
    } else {
      return { message, status: 1 };
    }
  },
  /**
   *
   * @param {String} messages
   * @param {Number} status
   * @returns Object
   */
  error: (message) => {
    return { message, status: 0 };
  },
};
export default response;
