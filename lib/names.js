const got = require('got')
module.exports = ({ name, artists, id }, index) => {
    return {
      title: `${index + 1}. ${name} -[ ${artists[0].name} ]`,
      value: { name, id },
    }
  }
  