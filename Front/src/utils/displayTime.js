module.exports = (start, end) => {
    return `${start.getHours()}:${String(start.getMinutes()).padStart(
        2,
        "0"
    )} - ${end.getHours()}:${String(end.getMinutes()).padStart(2, "0")}`;
};
