function formatThousand(number) {
    let result = number.toLocaleString("en-US");
    result = result.split(",");
    result = result.join(".");
    return result;
}

module.exports = formatThousand;
