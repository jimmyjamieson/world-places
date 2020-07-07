const stripBom = require('strip-bom');

const removeUnicode = async json => {
  const data = JSON.stringify(json)
  const res = await stripBom(data)
  return JSON.parse(res)
};

export default removeUnicode