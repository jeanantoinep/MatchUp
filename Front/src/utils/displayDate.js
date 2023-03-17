const { getDate } = require("./getDate");
const { getDay } = require("./getDay");

module.exports = (date) => {
    return `${getDay(date).slice(0, 3)}, ${getDate(date)}`;
};
