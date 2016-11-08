String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

var num = '';
for (var i = 0; i < 32; i++) num = num.concat('1');
num = makePositive(num);

num = '11111111111111111111111111111111';

function strToS32(strVal) {
    if (strVal[0] == '0')
        return parseInt(strVal.substr(1, 31), 2);
    // Invert
    for (var i = 1; i < 32; i++) strVal = strVal.replaceAt(i, (strVal[i] == '1' ? '0' : '1'));
    // Add 1
    var carry = 1;
    for (var i = 31; i > 0; i--) {
        // if its 0, invert and stop
        if (strVal[i] == '0') {
            strVal = strVal.replaceAt(i, ('1'));
            carry = 0;
            break;
        }
        // if its a 1, invert and continue
        strVal = strVal.replaceAt(i, ('0'));
    }
    if (carry)
        for (var i = 1; i < 32; i++) strVal = strVal.replaceAt(i, '0');
    return -1 * (parseInt(strVal.substr(1, 31), 2));
}

function strToQ31(strVal) {
    var result = 0.0;
    for (var i = 1; i < 32; i++) {
        result += ((strVal[i] == (strVal[0] == '1' ? '1' : '0')) ? 0 : 1) * Math.pow(2, -1 * i);
    }
    return (strVal[0] == '0' ? 1 : -1) * result;
}

function S32ToStr(S32) {
    var baseStr = (S32 >= 0) ? S32.toString(2) : (S32 >>> 0).toString(2);
    var pad = '';
    for (var i = 0; i < 32 - baseStr.length; i++) pad = pad.concat((S32 >= 0) ? '0' : '1');
    return pad.concat(baseStr);
}

function Q31ToStr(Q31) {

}

function makeNegative(strVal) {
    return strVal.replaceAt(0, '1');
}

function makePositive(strVal) {
    return strVal.replaceAt(0, '0');
}

function flipSign(strVal) {
    // Negative has MSB as a 1
    return strVal.replaceAt(0, (strVal[0] == '1' ? '0' : '1'));
}

console.clear();

// Highest
console.log(strToQ31('01111111111111111111111111111111'))

// Lowest
console.log(strToQ31('10000000000000000000000000000000'))

// Print signed 32-bit integer value
//console.log(strToS32(num));

// Print Q31 value
//console.log(strToQ31(num));
