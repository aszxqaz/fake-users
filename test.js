const regex = /^[1-9]\d*$/;

const ns = ['011', '110', '1234', '0', '01', '1', '999a'];

for (const n of ns) {
    // console.log(`n=${n} : ${regex.test(n)}`);
}

function checkMaxNumIntExceeding(input, max) {
    const maxAsStr = max.toString();
    if (maxAsStr.length > input.length) return true;
    if (maxAsStr.length < input.length) return false;

    for (let i = 0; i < maxAsStr.length; i++) {
        if (parseInt(input[i]) > parseInt(maxAsStr[i])) {
            return false;
        }
    }
    return true;
}

// console.log(checkMaxNumIntExceeding('', 1));

function checkMaxIntFloatExceeding(input, maxInt) {
    const maxAsStr = maxInt.toString();
    const pointPos = input.indexOf('.') + 1;

    if (pointPos == 0) return true;

    if (pointPos <= maxAsStr.length) return true;

    const len = maxAsStr.length;
    for (let i = 0; i < len - 1; i++) {
        console.log(
            `input char = ${parseInt(input[i])} / ${parseInt(maxAsStr[i])}`
        );
        if (parseInt(input[i]) > parseInt(maxAsStr[i])) {
            return false;
        }
    }
    return parseInt(input[len - 1]) < parseInt(maxAsStr[len - 1]);
}

console.log(checkMaxIntFloatExceeding('0.2', 1232));

console.log(new Array(16).fill(0));
