import _ from "lodash";
export default obj => {
  const sortArr = _.sortBy(Object.keys(obj));
  let returnObect = {};
  _.map(sortArr, key => {
    if (_.isArray(obj[key])) {
      returnObect[key] = obj[key][0];
    } else {
      returnObect[key] = obj[key];
    }
  });
  return returnObect;
};
