module.exports = (start, end) => {
    return `${start.getHours()}:${start.getMinutes()} - ${end.getHours()}:${end.getMinutes()}`;
};
