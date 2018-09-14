
module.exports = {
  randomString: (length) => {
    length = length || 16;
    return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
  }
};
