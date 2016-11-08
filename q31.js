String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

function strToS32(strVal) {
    if (strVal[0] == '0') return parseInt(strVal.substr(1, 31), 2);

    // Two's complement conversion
    // Invert
    for (var i = 1; i < 32; i++) strVal = strVal.replaceAt(i, signChar(strVal));

    // Add 1 - ripple carry method
    var carry = 1;
    for (var i = 31; i > 0; i--) {
        // if its 0, invert and stop
        if (strVal[i] == '0') {
            strVal = strVal.replaceAt(i, ('1'));
            carry = 0;
            break;
        }
        // if its 1, invert and continue
        strVal = strVal.replaceAt(i, ('0'));
    }

    // Deal with bit overflow
    if (carry)
        for (var i = 1; i < 32; i++) strVal = strVal.replaceAt(i, '0');

    // Parse and make negative
    return -1 * (parseInt(strVal.substr(1, 31), 2));
}

function strToQ31(strVal) {
    var result = 0.0;
    for (var i = 1; i < 32; i++) {
        result += ((strVal[i] == signChar(strVal)) ? 1 : 0) * Math.pow(2, -1 * i);
    }
    return (strVal[0] == '0' ? 1 : -1) * result;
}

function S32ToStr(S32) {
    var pad = '';
    var baseStr = (S32 >= 0 ? S32 : S32 >>> 0).toString(2);
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
    return strVal.replaceAt(0, signChar(strVal));
}

function signChar(strVal) {
    return strVal[0] == '1' ? '0' : '1';
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
