// eslint-disable-next-line import/prefer-default-export
export const replace = (string = "", opts = {}) => {
  return string.replace(/{(\w+)}/g, (match, arg) => {
    return opts[arg] || "";
  });
};
