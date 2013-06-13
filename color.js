(function () {

if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(target) {
        for(var i = 0, iLen = this.length; i < iLen; i++) {
            if(this[i] === target) {
                return i;
            }
        }
        return -1;
    };
}

if(!Array.prototype.map) {
    Array.prototype.map = function(callback, context) {
        var result = [];
        if(typeof callback === 'function') {
            for(var i = 0, iLen = this.length; i < iLen; i++) {
                result.push(callback.call(context, this[i], i, this));
            }
        }
        return result;
    };
}

var w3cColors = {
    aliceblue: '#F0F8FF',
    antiquewhite: '#FAEBD7',
    aqua: '#00FFFF',
    aquamarine: '#7FFFD4',
    azure: '#F0FFFF',
    beige: '#F5F5DC',
    bisque: '#FFE4C4',
    black: '#000000',
    blanchedalmond: '#FFEBCD',
    blue: '#0000FF',
    blueviolet: '#8A2BE2',
    brown: '#A52A2A',
    burlywood: '#DEB887',
    cadetblue: '#5F9EA0',
    chartreuse: '#7FFF00',
    chocolate: '#D2691E',
    coral: '#FF7F50',
    cornflowerblue: '#6495ED',
    cornsilk: '#FFF8DC',
    crimson: '#DC143C',
    cyan: '#00FFFF',
    darkblue: '#00008B',
    darkcyan: '#008B8B',
    darkgoldenrod: '#B8860B',
    darkgray: '#A9A9A9',
    darkgreen: '#006400',
    darkkhaki: '#BDB76B',
    darkmagenta: '#8B008B',
    darkolivegreen: '#556B2F',
    darkorange: '#FF8C00',
    darkorchid: '#9932CC',
    darkred: '#8B0000',
    darksalmon: '#E9967A',
    darkseagreen: '#8FBC8F',
    darkslateblue: '#483D8B',
    darkslategray: '#2F4F4F',
    darkturquoise: '#00CED1',
    darkviolet: '#9400D3',
    deeppink: '#FF1493',
    deepskyblue: '#00BFFF',
    dimgray: '#696969',
    dodgerblue: '#1E90FF',
    feldspar: '#D19275',
    firebrick: '#B22222',
    floralwhite: '#FFFAF0',
    forestgreen: '#228B22',
    fuchsia: '#FF00FF',
    gainsboro: '#DCDCDC',
    ghostwhite: '#F8F8FF',
    gold: '#FFD700',
    goldenrod: '#DAA520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#ADFF2F',
    honeydew: '#F0FFF0',
    hotpink: '#FF69B4',
    indianred: '#CD5C5C',
    indigo: '#4B0082',
    ivory: '#FFFFF0',
    khaki: '#F0E68C',
    lavender: '#E6E6FA',
    lavenderblush: '#FFF0F5',
    lawngreen: '#7CFC00',
    lemonchiffon: '#FFFACD',
    lightblue: '#ADD8E6',
    lightcoral: '#F08080',
    lightcyan: '#E0FFFF',
    lightgoldenrodyellow: '#FAFAD2',
    lightgrey: '#D3D3D3',
    lightgreen: '#90EE90',
    lightpink: '#FFB6C1',
    lightsalmon: '#FFA07A',
    lightseagreen: '#20B2AA',
    lightskyblue: '#87CEFA',
    lightslateblue: '#8470FF',
    lightslategray: '#778899',
    lightsteelblue: '#B0C4DE',
    lightyellow: '#FFFFE0',
    lime: '#00FF00',
    limegreen: '#32CD32',
    linen: '#FAF0E6',
    magenta: '#FF00FF',
    maroon: '#800000',
    mediumaquamarine: '#66CDAA',
    mediumblue: '#0000CD',
    mediumorchid: '#BA55D3',
    mediumpurple: '#9370D8',
    mediumseagreen: '#3CB371',
    mediumslateblue: '#7B68EE',
    mediumspringgreen: '#00FA9A',
    mediumturquoise: '#48D1CC',
    mediumvioletred: '#C71585',
    midnightblue: '#191970',
    mintcream: '#F5FFFA',
    mistyrose: '#FFE4E1',
    moccasin: '#FFE4B5',
    navajowhite: '#FFDEAD',
    navy: '#000080',
    oldlace: '#FDF5E6',
    olive: '#808000',
    olivedrab: '#6B8E23',
    orange: '#FFA500',
    orangered: '#FF4500',
    orchid: '#DA70D6',
    palegoldenrod: '#EEE8AA',
    palegreen: '#98FB98',
    paleturquoise: '#AFEEEE',
    palevioletred: '#D87093',
    papayawhip: '#FFEFD5',
    peachpuff: '#FFDAB9',
    peru: '#CD853F',
    pink: '#FFC0CB',
    plum: '#DDA0DD',
    powderblue: '#B0E0E6',
    purple: '#800080',
    red: '#FF0000',
    rosybrown: '#BC8F8F',
    royalblue: '#4169E1',
    saddlebrown: '#8B4513',
    salmon: '#FA8072',
    sandybrown: '#F4A460',
    seagreen: '#2E8B57',
    seashell: '#FFF5EE',
    sienna: '#A0522D',
    silver: '#C0C0C0',
    skyblue: '#87CEEB',
    slateblue: '#6A5ACD',
    slategray: '#708090',
    snow: '#FFFAFA',
    springgreen: '#00FF7F',
    steelblue: '#4682B4',
    tan: '#D2B48C',
    teal: '#008080',
    thistle: '#D8BFD8',
    tomato: '#FF6347',
    turquoise: '#40E0D0',
    violet: '#EE82EE',
    violetred: '#D02090',
    wheat: '#F5DEB3',
    white: '#FFFFFF',
    whitesmoke: '#F5F5F5',
    yellow: '#FFFF00',
    yellowgreen: '#9ACD32'
};

var w3cColorsNames = [];

for(var i in w3cColors) {
    if(w3cColors.hasOwnProperty(i)) {
        w3cColorsNames.push(i);
    }
}

var colorRegex = {
    hex: /^#?([\da-f]{3}){1,2}$/i,
    rgb: /^(2[0-4]\d(?:\.\d+)?|25[0-4](?:\.\d+)?|255|[1]?\d?\d(?:\.\d+)?)([,\s]|,\s)(2[0-4]\d(?:\.\d+)?|25[0-4](?:\.\d+)?|255|[1]?\d?\d(?:\.\d+)?)\2(2[0-4]\d(?:\.\d+)?|25[0-4](?:\.\d+)?|255|[1]?\d?\d(?:\.\d+)?)$/,
    rgba: /^(2[0-4]\d|25[0-5]|[1]?\d?\d)([,\s]|,\s)(2[0-4]\d|25[0-5]|[1]?\d?\d)\2(2[0-4]\d|25[0-5]|[1]?\d?\d)\2(1|0\.\d+|0)$/,
    hsl: /^(3[0-5]\d|360|[12]?\d?\d)([,\s]|,\s)(100|\d?\d)\2(100|\d?\d)$/,
    hslPercent: /^(3[0-5]\d|360|[12]?\d?\d)([,\s]|,\s)(100|\d?\d)%?\2(100|\d?\d)%?$/,
    hslDecimal: /^(3[0-5]\d(?:\.\d+)?|360|[12]?\d?\d(?:\.\d+)?)([,\s]|,\s)(1|0\.\d+|0)\2(1|0\.\d+|0)$/,
    hsla: /^(3[0-5]\d|360|[12]?\d?\d)([,\s]|,\s)(100|\d?\d)\2(100|\d?\d)(1|0\.\d+|0)$/,
    hslaPercent: /^(3[0-5]\d|360|[12]?\d?\d)([,\s]|,\s)(100|\d?\d)%?\2(100|\d?\d)%?\2(1|0\.\d+|0)$/,
    hslaDecimal: /^(3[0-5]\d(?:\.\d+)?|360|[12]?\d?\d(?:\.\d+)?)([,\s]|,\s)(1|0\.\d+|0)\2(1|0\.\d+|0)\2(1|0\.\d+|0)$/,
    cmykPercent: /^(100|\d?\d)%?([,\s]|,\s)(100|\d?\d)%?\2(100|\d?\d)%?\2(100|\d?\d)%?$/,
    cmykDecimal: /^(1|0\.\d+|0)([,\s]|,\s)(1|0\.\d+|0)\2(1|0\.\d+|0)\2(1|0\.\d+|0)$/,
    // yuv: 0-255 0-255 0-255, same as Rgb
    yuv: /^$/
};

function isArray(array) {
    if(Object.prototype.toString.call(array) === '[object Array]') {
        return true;
    } else {
        return false;
    }
}

// parse functions
// parse 的用途是不仅要对转换之前输入的数据做处理，还可以对传给外面的数据做处理，所以输出的数据需要是一个 object 包含了所有已知的格式

function parseHex(hexValue) {
    var hex = {},
        sixWithoutPoundSign;
    if(colorRegex.hex.test(hexValue)) {
        // 去#
        if(hexValue.charAt(0) === '#') {
            sixWithoutPoundSign = hexValue.slice(1);
        } else {
            sixWithoutPoundSign = hexValue;
        }
        // 大写
        sixWithoutPoundSign = sixWithoutPoundSign.toUpperCase();
        // 3位的扩充为6位
        if(sixWithoutPoundSign.length = 3) {
            sixWithoutPoundSign = sixWithoutPoundSign.replace(/^([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
        }
        // 6位缩为3位
        hex.sixWithoutPoundSign = sixWithoutPoundSign;
        hex.sixWithPoundSign = '#' + sixWithoutPoundSign;
        if(/^([\dA-F])\1([\dA-F])\2([\dA-F])\3/.test(sixWithoutPoundSign)) {
            hex.threeWithoutPoundSign = sixWithoutPoundSign.charAt(0) + sixWithoutPoundSign.charAt(2) + sixWithoutPoundSign.charAt(4);
            hex.threeWithPoundSign = '#' + hex.threeWithoutPoundSign;
        }
        // 输出我最喜欢的格式
        if(hex.threeWithoutPoundSign && hex.threeWithoutPoundSign.length > 0) {
            hex.mostRecommendation = hex.threeWithPoundSign;
        } else {
            hex.mostRecommendation = hex.sixWithPoundSign;
        }
    }
    return hex;
}

function parseArrayString(type, oriParseFn, inputValue) {
    var output = {},
        outputArray,
        outputString;
    if(isArray(inputValue)) {
        inputValue = inputValue.join();
    }
    if(typeof inputValue === 'string' && colorRegex[type].test(inputValue)) {
        var splitSign = inputValue.match(colorRegex[type])[2];
        outputArray = inputValue.split(splitSign);
        outputString = outputArray.join();
        output.array = outputArray;
        output.string = outputString;
    }
    // 保证输出的 array 里都是 number 不是 string
    if(output.array && output.array.length > 0) {
        for(var i = 0, iLen = output.array.length; i < iLen; i++) {
            output.array[i] = +output.array[i];
        }
    }
    return output;
}

function parseRgb(rgbValue) {
    var rgb = {};
    rgb = parseArrayString('rgb', arguments.callee, rgbValue);
    rgb.integerArray = rgb.array.map(function(item, index) {
        return Math.round(item);
    });
    rgb.integerString = rgb.integerArray.join();
    return rgb;
}


function parseRgba(rgbaValue) {
    var rgba = {};
    rgba = parseArrayString('rgba', arguments.callee, rgbaValue);
    rgba.integerArray = rgba.array.map(function(item, index) {
        if(index < rgba.array.length - 1) {
            return Math.round(item);
        } else {
            return item;
        }
    });
    rgba.integerString = rgba.integerArray.join();
    return rgba;
}

function parseHsx(type, hslValue) {
    // parseHsl & parseHsv
    var hsl = {};
    if(isArray(hslValue)) {
        hslValue = hslValue.join();   
    }
    if(colorRegex.hslPercent.test(hslValue)) {
        // 200 90 90 类型的百分比整数 string
        hslValue = hslValue.replace(/%/g, '');
        hsl = parseArrayString('hslPercent', arguments.callee, hslValue);
        if(hsl.string && hsl.string.length > 0) {
            hsl.percentArray = hsl.array.slice();
            hsl.decimalArray = [];
            hsl.percentArrayWithSign = [];
            hsl.percentIntegerArray = [];
            hsl.percentIntegerWithSignArray = [];
            for(var i = 0, iLen = hsl.array.length; i < iLen; i++) {
                if(i === 0) {
                    hsl.decimalArray.push(+hsl.array[i]);
                    hsl.percentArrayWithSign.push(hsl.array[i] + '');
                    hsl.percentIntegerArray.push(Math.round(hsl.array[i]));
                    hsl.percentIntegerWithSignArray.push(Math.round(hsl.array[i]) + '');
                } else {
                    hsl.decimalArray.push(hsl.array[i] / 100);
                    hsl.percentArrayWithSign.push(hsl.array[i] + '%');
                    hsl.percentIntegerArray.push(Math.round(hsl.array[i]));
                    hsl.percentIntegerWithSignArray.push(Math.round(hsl.array[i]) + '%');
                }
            }
            // map 的方法虽然感觉上写起来更加优雅，但其实上增加了循环的次数，影响了性能
            /*hsl.decimalArray = hsl.array.map(function(item, index) {
                if(index === 0) {
                    return +item;
                } else {
                    return item / 100;
                }
            });
            hsl.percentArrayWithSign = hsl.array.map(function(item, index) {
                if(index === 0) {
                    return item + '';
                } else {
                    return item + '%';
                }
            });
            hsl.percentIntegerArray = hsl.array.map(function(item, index) {
                return Math.round(item);
            });*/
        }
    } else if(colorRegex.hslDecimal.test(hslValue)) {
        // 200 0.9 0.9 类型的小数 string
        hsl = parseArrayString('hslDecimal', arguments.callee, hslValue);
        if(hsl.string && hsl.string.length > 0) {
            hsl.decimalArray = hsl.array.slice();
            hsl.percentArray = [];
            hsl.percentArrayWithSign = [];
            hsl.percentIntegerArray = [];
            hsl.percentIntegerWithSignArray = [];
            for(var j = 0, jLen = hsl.array.length; j < jLen; j++) {
                if(j === 0) {
                    hsl.percentArray.push(+hsl.array[j]);
                    hsl.percentArrayWithSign.push(hsl.array[j] + '');
                    hsl.percentIntegerArray.push(Math.round(hsl.array[j]));
                    hsl.percentIntegerWithSignArray.push(Math.round(hsl.array[j]) + '');
                } else {
                    hsl.percentArray.push(hsl.array[j] * 100);
                    hsl.percentArrayWithSign.push(hsl.array[j] * 100 + '%');
                    hsl.percentIntegerArray.push(Math.round(hsl.array[j] * 100));
                    hsl.percentIntegerWithSignArray.push(Math.round(hsl.array[j] * 100) + '%');
                }
            }
            
        }
    }
    if(hsl.percentArray) {
        hsl.percentString = hsl.percentArray.join();
        hsl.decimalString = hsl.decimalArray.join();
        hsl.percentStringWithSign = hsl.percentArrayWithSign.join();
        hsl.percentIntegerString = hsl.percentIntegerArray.join();
        hsl.percentIntegerWithSignString = hsl.percentIntegerWithSignArray.join();
        if(type === 'hsl') {
            hsl.cssString = 'hsl(' + hsl.percentIntegerWithSignArray.join() + ')';
        }
        delete(hsl.string);
        delete(hsl.array);
    }
    return hsl;
}

function parseHsxa(type, hslaValue) {
    // parseHsla & parseHsv
    var hsla = {};
    if(isArray(hslaValue)) {
        hslaValue = hslaValue.join();   
    }
    if(colorRegex.hslaPercent.test(hslaValue)) {
        // 200 90 90 0.5 类型的百分比整数 string
        hslaValue = hslaValue.replace(/%/g, '');
        hsla = parseArrayString('hslaPercent', arguments.callee, hslaValue);
        if(hsla.string && hsla.string.length > 0) {
            hsla.percentArray = hsla.array.slice();
            hsla.decimalArray = [];
            hsla.percentArrayWithSign = [];
            hsla.percentIntegerArray = [];
            hsla.percentIntegerWithSignArray = [];
            for(var i = 0, iLen = hsla.array.length; i < iLen; i++) {
                if(i === 0) {
                    hsla.decimalArray.push(+hsla.array[i]);
                    hsla.percentArrayWithSign.push(hsla.array[i] + '');
                    hsla.percentIntegerArray.push(Math.round(hsla.array[i]));
                    hsla.percentIntegerWithSignArray.push(Math.round(hsla.array[i]) + '');
                } else if(i === iLen - 1) {
                    hsla.decimalArray.push(+hsla.array[i]);
                    hsla.percentArrayWithSign.push(hsla.array[i] + '');
                    hsla.percentIntegerArray.push(hsla.array[i]);
                    hsla.percentIntegerWithSignArray.push(hsla.array[i] + '');
                } else {
                    hsla.decimalArray.push(hsla.array[i] / 100);
                    hsla.percentArrayWithSign.push(hsla.array[i] + '%');
                    hsla.percentIntegerArray.push(Math.round(hsla.array[i]));
                    hsla.percentIntegerWithSignArray.push(Math.round(hsla.array[i]) + '%');
                }
            }
        }
    } else if(colorRegex.hslaDecimal.test(hslaValue)) {
        // 200 0.9 0.9 0.5 类型的小数 string
        hsla = parseArrayString('hslaDecimal', arguments.callee, hslaValue);
        if(hsla.string && hsla.string.length > 0) {
            hsla.decimalArray = hsla.array.slice();
            hsla.percentArray = [];
            hsla.percentArrayWithSign = [];
            hsla.percentIntegerArray = [];
            hsla.percentIntegerWithSignArray = [];
            for(var j = 0, jLen = hsla.array.length; j < jLen; j++) {
                if(j === 0) {
                    hsla.percentArray.push(+hsla.array[j]);
                    hsla.percentArrayWithSign.push(hsla.array[j] + '');
                    hsla.percentIntegerArray.push(Math.round(hsla.array[j]));
                    hsla.percentIntegerWithSignArray.push(Math.round(hsla.array[j]) + '');
                } else if(j === jLen - 1) {
                    hsla.percentArray.push(+hsla.array[j]);
                    hsla.percentArrayWithSign.push(hsla.array[j] + '');
                    hsla.percentIntegerArray.push(hsla.array[j]);
                    hsla.percentIntegerWithSignArray.push(hsla.array[j] + '');
                }  else {
                    hsla.percentArray.push(hsla.array[j] * 100);
                    hsla.percentArrayWithSign.push(hsla.array[j] * 100 + '%');
                    hsla.percentIntegerArray.push(Math.round(hsla.array[j] * 100));
                    hsla.percentIntegerWithSignArray.push(Math.round(hsla.array[j] * 100) + '%');
                }
            }
            
        }
    }
    if(hsla.percentArray) {
        hsla.percentString = hsla.percentArray.join();
        hsla.decimalString = hsla.decimalArray.join();
        hsla.percentStringWithSign = hsla.percentArrayWithSign.join();
        hsla.percentIntegerString = hsla.percentIntegerArray.join();
        hsla.percentIntegerWithSignString = hsla.percentIntegerWithSignArray.join();
        if(type === 'hsla') {
            hsla.cssString = 'hsla(' + hsla.percentIntegerWithSignArray.join() + ')';
        }
        delete(hsla.string);
        delete(hsla.array);
    }
    return hsla;
}

function parseCmyk(cmykValue) {
    var cmyk = {};
    if(isArray(cmykValue)) {
        cmykValue = cmykValue.join();
    }
    if(colorRegex.cmykPercent.test(cmykValue)) {
        // 90 90 90 90 类型的百分比整数 string
        cmykValue = cmykValue.replace(/%/g, '');
        cmyk = parseArrayString('cmykPercent', arguments.callee, cmykValue);
        if(cmyk.string && cmyk.string.length > 0) {
            cmyk.percentArray = cmyk.array.slice();
            cmyk.decimalArray = [];
            cmyk.percentArrayWithSign = [];
            cmyk.percentIntegerArray = [];
            cmyk.percentIntegerWithSignArray = [];
            for(var i = 0, iLen = cmyk.array.length; i < iLen; i++) {
                cmyk.decimalArray.push(cmyk.array[i] / 100);
                cmyk.percentArrayWithSign.push(cmyk.array[i] + '%');
                cmyk.percentIntegerArray.push(Math.round(cmyk.array[i])) ;
                cmyk.percentIntegerWithSignArray.push(Math.round(cmyk.array[i]) + '%');
            }
        }
    } else if(colorRegex.cmykDecimal.test(cmykValue)) {
        // 0.9 0.9 0.9 0.9 类型的小数 string
        cmyk = parseArrayString('cmykDecimal', arguments.callee, cmykValue);
        if(cmyk.string && cmyk.string.length > 0) {
            cmyk.decimalArray = cmyk.array.slice();
            cmyk.percentArray = [];
            cmyk.percentArrayWithSign = [];
            cmyk.percentIntegerArray = [];
            cmyk.percentIntegerWithSignArray = [];
            for(var j = 0, jLen = cmyk.array.length; j < jLen; j++) {
                cmyk.percentArray.push(cmyk.array[j] * 100);
                cmyk.percentArrayWithSign.push(cmyk.array[j] * 100 + '%');
                cmyk.percentIntegerArray.push(Math.round(cmyk.array[j] * 100));
                cmyk.percentIntegerWithSignArray.push(Math.round(cmyk.array[j] * 100) + '%');
            }
        }
    }
    if(cmyk.percentArray) {
        cmyk.percentString = cmyk.percentArray.join();
        cmyk.decimalString = cmyk.decimalArray.join();
        cmyk.percentStringWithSign = cmyk.percentArrayWithSign.join();
        cmyk.percentIntegerString = cmyk.percentIntegerArray.join();
        cmyk.percentIntegerWithSignString = cmyk.percentIntegerWithSignArray.join();
        delete(cmyk.string);
        delete(cmyk.array);
    }
    return cmyk;
}

// parse functions end

// convert functions
// convert 函数要注意对不同的输入都做预判和处理

function singleHexToRgb(hex) {
    var rgb = [];
    if(hex.length === 6) {
        rgb.push(parseInt(hex.slice(0, 2), 16));
        rgb.push(parseInt(hex.slice(2, 4), 16));
        rgb.push(parseInt(hex.slice(4, 6), 16));    
    } else if(hex.length === 3) {
        rgb.push(parseInt(hex.slice(0, 1) + hex.slice(0, 1), 16));
        rgb.push(parseInt(hex.slice(1, 2) + hex.slice(1, 2), 16));
        rgb.push(parseInt(hex.slice(2, 3) + hex.slice(2, 3), 16));
    }
    return rgb;
}

function singleRgbToHex(rgb) {
    var hex = '';
    /*for(var i = 0, iLen = rgb.length; i < iLen; i++) {
        hex += (rgb[i] < 16 ? '0' : '') + rgb[i].toString(16);
    }*/
    var hexr = Math.max(Math.min(parseInt(rgb[0], 10), 255), 0),
        hexg = Math.max(Math.min(parseInt(rgb[1], 10), 255), 0),
        hexb = Math.max(Math.min(parseInt(rgb[2], 10), 255), 0);
    hexr = hexr > 15 ? hexr.toString(16) : '0' + hexr.toString(16);
    hexg = hexg > 15 ? hexg.toString(16) : '0' + hexg.toString(16);
    hexb = hexb > 15 ? hexb.toString(16) : '0' + hexb.toString(16);
    hex =  hexr + hexg + hexb;
    return hex.toUpperCase();
}

function singleRgbToHsl(rgb) {
    var r = Math.max(Math.min(parseInt(rgb[0], 10), 255), 0) / 255,
        g = Math.max(Math.min(parseInt(rgb[1], 10), 255), 0) / 255,
        b = Math.max(Math.min(parseInt(rgb[2], 10), 255), 0) / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h,
        s,
        l,
        round = typeof round === 'undefined' ? false : round;
    if(max === min) {
        h = 0;
    } else if(max === r && g >= b) {
        h = 60 * (g - b) / (max - min);
    } else if(max === r && g < b) {
        h = 60 * (g - b) / (max - min) + 360;
    } else if(max === g) {
        h = 60 * (b - r) / (max - min) + 120;
    } else if(max === b) {
        h = 60 * (r - g) / (max - min) + 240;
    }

    l = (max + min) / 2;

    if(l === 0) {
        s = 0;
    } else if(l <= 0.5) {
        s = (max - min) / (max + min);
    } else {
        s = (max - min) / (2 - max - min);
    }
    return [h, s, l];
}

function singleHslToRgb(hsl) {
    var r,
        g,
        b,
        h = Math.max(Math.min(parseInt(hsl[0], 10), 360), 0) / 360,
        /*s = Math.max(Math.min(parseInt(hsl[1], 10), 100), 0) / 100,
        l = Math.max(Math.min(parseInt(hsl[2], 10), 100), 0) / 100,*/
        s = hsl[1],
        l = hsl[2],
        q = l < 0.5 ? l * (1 + s) : l + s - l * s,
        p = 2 * l - q;
    function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    if(s = 0) {
        r = g = b = l;
    } else {
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [r * 255, g * 255, b * 255];
}

function singleRgbToHsv(rgb) {
    var r = Math.max(Math.min(parseInt(rgb[0], 10), 255), 0) / 255,
        g = Math.max(Math.min(parseInt(rgb[1], 10), 255), 0) / 255,
        b = Math.max(Math.min(parseInt(rgb[2], 10), 255), 0) / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h,
        s,
        v;
    if(max === min) {
        h = 0;
    } else if(max === r && g >= b) {
        h = 60 * (g - b) / (max - min);
    } else if(max === r && g < b) {
        h = 60 * (g - b) / (max - min) + 360;
    } else if(max === g) {
        h = 60 * (b - r) / (max - min) + 120;
    } else if(max === b) {
        h = 60 * (r - g) / (max - min) + 240;
    }
    if(max === 0) {
        s = 0;
    } else {
        s = (max - min) / max;
    }
    v = max;
    return [h, s, v];
    // [213.1578947368421, 0.1557377049180328, 0.9568627450980393]
}

function singleHsvToRgb(hsv) {
    var r,
        g,
        b,
        h = hsv[0],
        s = hsv[1],
        v = hsv[2],
        i = Math.floor(h / 60),
        f = (h / 60) - i,
        p = v * (1 -s),
        q = v * (1- f * s),
        t = v * (1 - (1 - f) * s);
    switch(i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [r * 255, g * 255, b * 255];
}

function singleRgbToCmyk(rgb) {
    var r = Math.max(Math.min(parseInt(rgb[0], 10), 255), 0) / 255,
        g = Math.max(Math.min(parseInt(rgb[1], 10), 255), 0) / 255,
        b = Math.max(Math.min(parseInt(rgb[2], 10), 255), 0) / 255,
        c,
        m,
        t,
        k;
    c = (1 - r);
    m = (1 - g);
    y = (1 - b);
    if(Math.min(c, m, y) === 1) {
        return [0, 0, 0, 1];
    } else {
        k = Math.min(c, m, y);
        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);
    }
    return [c, m, y, k];
}

function singleCmykToRgb(cmyk) {
    var c = cmyk[0],
        m = cmyk[1],
        y = cmyk[2],
        k = cmyk[3],
        c1 = c * (1 - k) + k,
        m1 = m * (1 - k) + k,
        y1 = y * (1 - k) + k;
    return [(1 - c1) * 255, (1 - m1) * 255, (1 - y1) * 255];
}

function singleRgbToYuv(rgb) {
    var r = Math.max(Math.min(parseInt(rgb[0], 10), 255), 0),
        g = Math.max(Math.min(parseInt(rgb[1], 10), 255), 0),
        b = Math.max(Math.min(parseInt(rgb[2], 10), 255), 0),
        y,
        u,
        v;
    y = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    u = Math.round((((b - y) * 0.493) + 111) / 222 * 255);
    v = Math.round((((r - y) * 0.877) + 155) / 312 * 255);
    /*u = 0.436 * (b - y) / (1 - 0.114) + 128;
    v = 0.615 * (r - y) / (1 - 0.299) + 128*/
    return [y, u, v];
    // [109, 167.86004514672686, 203.4493580599144]
}
function singleYuvToRgb(yuv) {
    var y = parseInt(yuv[0], 10),
        u = parseInt(yuv[1], 10) / 255 * 222 - 111,
        v = parseInt(yuv[2], 10) / 255 * 312 - 155,
        r, g, b;
    r = Math.round(y + v / 0.877);
    g = Math.round(y - 0.39466 * u - 0.5806 * v);
    b = Math.round(y + u / 0.493);
    /*var y = yuv[0],
        u = yuv[1],
        v = yuv[2],
        r,
        g,
        b;
    r = y + 1.13982 * (v - 128);
    g = y - 0.39465 * (u - 128) - 0.58060 * (v - 128);
    b = y + 2.03211 * (u - 128);*/
    return [r, g, b];
}

// convert functions end

function Color(type, value) {
    // 根据输入的种类判断 new Rgb() or new Hex() or ...
    // new Color('rgb', []);
    // new Color('rgb', '', '', '');
    // new Color('str') 判断是 hex or rgb
    // new Color('255,255,255')
    // new Color({type: 'hex', value: []})
    // new Color('rgb(211, 211, 211)')
    // 对异常数据的处理 比如 <0 
    // 
    // type: Hex rgb rgba hsv hsl hsla cmyk yuv

    // this.colorValue = {};

    var inputValue;

    if(arguments.length === 2) {
        // most recommend
        // new Color(type, []) / new Color(type, 'ddd');
        switch(type.toLowerCase()) {
            case 'hex':
                return new Hex(value);
                break;
            case 'rgb':
                return new Rgb(value);
                break;
            case 'hsl':
                return new Hsl(value);
                break;
            case 'hsla':
                return new Hsla(value);
                break;
            case 'hsv':
                return new Hsv(value);
                break;
            case 'cmyk':
                return new Cmyk(value);
                break;
            case 'yuv':
                return new Yuv(value);
                break;
        }
    } else if(arguments.length === 1) {
        // 只有一个参数的情况根据 string/array 判断
        // rgb rgba cmyk 均可以是 array 形式 默认 3 位返回 rgb 4 位返回 rgba
        inputValue = arguments[0];
        if(typeof inputValue === 'string') {
            // w3cColors(reserved) or regex check
            if(w3cColorsNames.indexOf(inputValue.toLowerCase()) >= 0) {
                // w3cColors
                return new Hex(w3cColors[inputValue]);
            } else {
                // regex check
                if(colorRegex.hex.test(inputValue)) {
                    return new Hex(inputValue);
                } else if(colorRegex.rgb.test(inputValue)) {
                    return new Rgb(inputValue);
                } else if(colorRegex.rgba.test(inputValue)) {
                    return new Rgba(inputValue);
                }
            }
        } else if(isArray(inputValue)) {
            // rgb or rgba
            if(inputValue.length === 3) {
                return new Rgb(inputValue);
            } else if(inputValue.length === 4) {
                return new Rgba(inputValue);
            }
        }
    } else if(arguments.length > 2) {
        // input Array like string
        // rgb hsl hsv...
        // new Color('rgb', 123, 123, 123);
        switch(type.toLowerCase()) {
            case 'rgb':
                return new Rgb(Array.prototype.slice.call(arguments, 1));
                break;
            case 'hsl':
                return new Hsl(Array.prototype.slice.call(arguments, 1));
                break;
            case 'hsla':
                return new Hsla(Array.prototype.slice.call(arguments, 1));
                break;
            case 'hsv':
                return new Hsv(Array.prototype.slice.call(arguments, 1));
                break;
            case 'cmyk':
                return new Cmyk(Array.prototype.slice.call(arguments, 1));
                break;
            case 'yuv':
                return new Yuv(Array.prototype.slice.call(arguments, 1));
                break;
        }
    } else {
        return null;
    }
}

Color.prototype.toRgb = function() {
    return this.colorValue.rgb;
}
Color.prototype.toHex = function() {
    return this.colorValue.hex;
}
Color.prototype.toHsl = function() {
    return this.colorValue.hsl;
}
Color.prototype.toHsv = function() {
    return this.colorValue.hsv;
}
Color.prototype.toCmyk = function() {
    return this.colorValue.cmyk;
}
Color.prototype.toYuv = function() {
    return this.colorValue.yuv
}

function Hex(hexValue) {
    this.colorValue = {};
    this.type = 'hex';
    this.init(hexValue)
}
Hex.prototype = new Color();
Hex.prototype.constructor = Hex;
Hex.prototype.init = function(hexValue) {
    var hexInterior = setFullHex(hexValue, this),
        rgbInterior = setFullRgb(singleHexToRgb(hexInterior), this),
        rgbaInterior = rgbInterior.slice();
    rgbaInterior.push(1);
    setFullRgba(rgbaInterior, this);
    var hslInterior = setFullHsl(singleRgbToHsl(rgbInterior), this),
        hslaInterior = hslInterior.slice();
    hslaInterior.push(1);
    setFullHsla(hslaInterior, this);
    setFullHsv(singleRgbToHsv(rgbInterior), this);
    setFullCmyk(singleRgbToCmyk(rgbInterior), this);
    setFullYuv(singleRgbToYuv(rgbInterior), this);
};

function Rgb(rgbValue) {
    this.colorValue = {};
    this.type = 'rgb';
    this.init(rgbValue);
}
Rgb.prototype = new Color();
Rgb.prototype.constructor = Rgb;
Rgb.prototype.init = function(rgbValue) {
    var rgbInterior = setFullRgb(rgbValue, this),
        rgbaInterior = rgbInterior.slice();
    rgbaInterior.push(1);
    setFullRgba(rgbaInterior, this);
    setFullHex(singleRgbToHex(rgbInterior), this);
    var hslInterior = setFullHsl(singleRgbToHsl(rgbInterior), this),
        hslaInterior = hslInterior.slice();
    hslaInterior.push(1);
    setFullHsla(hslaInterior, this);
    setFullHsv(singleRgbToHsv(rgbInterior), this);
    setFullCmyk(singleRgbToCmyk(rgbInterior), this);
    setFullYuv(singleRgbToYuv(rgbInterior), this);
};

function Rgba(rgbaValue) {
    this.colorValue = {};
    this.type = 'rgba';
    this.init(rgbaValue);
}
Rgba.prototype = new Color();
Rgba.prototype.constructor = Rgba;
Rgba.prototype.init = function(rgbaValue) {
    var rgbaInterior = setFullRgba(rgbaValue, this),
        rgbInterior = rgbaInterior.slice(0, rgbaInterior.length - 1),
        alpha = +rgbaInterior.slice(rgbaInterior.length - 1).join();
    setFullRgb(rgbInterior, this);
    setFullHex(singleRgbToHex(rgbInterior), this);
    var hslInterior = setFullHsl(singleRgbToHsl(rgbInterior), this),
        hslaInterior = hslInterior.slice(0);
    hslaInterior.push(alpha);
    setFullHsla(hslaInterior, this);
    setFullHsv(singleRgbToHsv(rgbInterior), this);
    setFullCmyk(singleRgbToCmyk(rgbInterior), this);
    setFullYuv(singleRgbToYuv(rgbInterior), this);
};

function Hsl(hslValue) {
    this.colorValue = {};
    this.type = 'hsl';
    this.init(hslValue);
}
Hsl.prototype = new Color();
Hsl.prototype.constructor = Hsl;
Hsl.prototype.init = function(hslValue) {
    var hslInterior = setFullHsl(hslValue, this),
        rgbInterior = setFullRgb(singleHslToRgb(hslInterior), this),
        hslaInterior = hslInterior.slice();
    hslaInterior.push(1);
    setFullHsla(hslaInterior, this);
    var rgbaInterior = rgbInterior.slice();
    rgbaInterior.push(1);
    setFullRgba(rgbaInterior, this);
    setFullHex(singleRgbToHex(rgbInterior), this);
    setFullHsv(singleRgbToHsv(rgbInterior), this);
    setFullCmyk(singleRgbToCmyk(rgbInterior), this);
    setFullYuv(singleRgbToYuv(rgbInterior), this);
}

function Hsla(hslaValue) {
    this.colorValue = {};
    this.type = 'hsla';
    this.init(hslaValue);
}
Hsla.prototype = new Color();
Hsla.prototype.constructor = Hsla;
Hsla.prototype.init = function(hslaValue) {
    var hslaInterior = setFullHsla(hslaValue, this),
        hslInterior = hslaInterior.slice(0, hslaInterior.length - 1),
        alpha = +hslaInterior.slice(hslaInterior.length - 1).join(),
        rgbInterior = setFullRgb(singleHslToRgb(hslInterior), this),
        rgbaInterior = rgbInterior.slice();
    rgbaInterior.push(alpha);
    setFullRgba(rgbaInterior, this);
    setFullHex(singleRgbToHex(rgbInterior), this);
    setFullHsl(singleRgbToHsl(rgbInterior), this);
    setFullHsv(singleRgbToHsv(rgbInterior), this);
    setFullCmyk(singleRgbToCmyk(rgbInterior), this);
    setFullYuv(singleRgbToYuv(rgbInterior), this);
}

function Hsv(hsvValue) {
    this.colorValue = {};
    this.type = 'hsv';
    this.init(hsvValue);
}
Hsv.prototype = new Color();
Hsv.prototype.constructor = Hsv;
Hsv.prototype.init = function(hsvValue) {
    var hsvInterior = setFullHsv(hsvValue, this),
        rgbInterior = setFullRgb(singleHsvToRgb(hsvInterior), this),
        rgbaInterior = rgbInterior.slice();
    rgbaInterior.push(1);
    setFullRgba(rgbaInterior, this);
    setFullHex(singleRgbToHex(rgbInterior), this);
    var hslInterior = setFullHsl(singleRgbToHsl(rgbInterior), this),
        hslaInterior = hslInterior.slice();
    hslaInterior.push(1);
    setFullHsla(hslaInterior, this);
    setFullCmyk(singleRgbToCmyk(rgbInterior), this);
    setFullYuv(singleRgbToYuv(rgbInterior), this);
}

function Cmyk(cmykValue) {
    this.colorValue = {};
    this.type = 'cmyk';
    this.init(cmykValue);
}
Cmyk.prototype = new Color();
Cmyk.prototype.constructor = Cmyk;
Cmyk.prototype.init = function(cmykValue) {
    var cmykInterior = setFullCmyk(cmykValue, this),
        rgbInterior = setFullRgb(singleCmykToRgb(cmykInterior), this),
        rgbaInterior = rgbInterior.slice();
    rgbaInterior.push(1);
    setFullRgba(rgbaInterior, this);
    setFullHex(singleRgbToHex(rgbInterior), this);
    var hslInterior = setFullHsl(singleRgbToHsl(rgbInterior), this),
        hslaInterior = hslInterior.slice();
    hslaInterior.push(1);
    setFullHsla(hslaInterior, this);
    setFullHsv(singleRgbToHsv(rgbInterior), this);
    setFullYuv(singleRgbToYuv(rgbInterior), this);
}

function Yuv(yuvValue) {
    this.colorValue = {};
    this.type = 'yuv';
    this.init(yuvValue);
}
Yuv.prototype = new Color();
Yuv.prototype.constructor = Yuv;
Yuv.prototype.init = function(yuvValue) {
    // yuv 因为不常用现在只支持 yuv 三个数值都是 0-255 的类似 rgb 的规范
    // Y ranges from 0 to 1 (or 0 to 255 in digital formats), while U and V range from -0.5 to 0.5 (or -128 to 127 in signed digital form, or 0 to 255 in unsigned form).
    // via: http://softpixel.com/~cwright/programming/colorspace/yuv/
    var yuvInterior = setFullYuv(yuvValue, this),
        rgbInterior = setFullRgb(singleYuvToRgb(yuvInterior), this),
        rgbaInterior = rgbInterior.slice();
    rgbaInterior.push(1);
    setFullRgba(rgbaInterior, this);
    setFullHex(singleRgbToHex(rgbInterior), this);
    var hslInterior = setFullHsl(singleRgbToHsl(rgbInterior), this),
        hslaInterior = hslInterior.slice();
    hslaInterior.push(1);
    setFullHsla(hslaInterior, this);
    setFullHsv(singleRgbToHsv(rgbInterior), this);
    setFullCmyk(singleRgbToCmyk(rgbInterior), this);
}

function setFullHex(hexValue, context) {
    var parsedHex = parseHex(hexValue);
    context.colorValue.hexFull = parsedHex;
    context.colorValue.hex = parsedHex.mostRecommendation;
    // 返回这个颜色值的 interior
    return parsedHex.sixWithoutPoundSign;
}

function setFullRgb(rgbValue, context) {
    var parsedRgb = parseRgb(rgbValue);
    context.colorValue.rgbFull = parsedRgb;
    context.colorValue.rgb = parsedRgb.integerArray;
    return parsedRgb.integerArray;
}

function setFullRgba(rgbaValue, context) {
    var parsedRgba = parseRgba(rgbaValue);
    context.colorValue.rgbaFull = parsedRgba;
    context.colorValue.rgba = parsedRgba.array;
    return parsedRgba.integerArray;
}

function setFullHsl(hslValue, context) {
    var parsedHsl = parseHsx('hsl', hslValue);
    context.colorValue.hslFull = parsedHsl;
    context.colorValue.hsl = parsedHsl.percentIntegerArray;
    return parsedHsl.decimalArray;
}

function setFullHsla(hslaValue, context) {
    var parsedHsla = parseHsxa('hsla', hslaValue);
    context.colorValue.hslaFull = parsedHsla;
    context.colorValue.hsla = parsedHsla.percentIntegerArray;
    return parsedHsla.decimalArray;
}

function setFullHsv(hsvValue, context) {
    var parsedHsv = parseHsx('hsv', hsvValue);
    context.colorValue.hsvFull = parsedHsv;
    context.colorValue.hsv = parsedHsv.percentIntegerArray;
    return parsedHsv.decimalArray;
}

function setFullCmyk(cmykValue, context) {
    var parsedCmyk = parseCmyk(cmykValue);
    context.colorValue.cmykFull = parsedCmyk;
    context.colorValue.cmyk = parsedCmyk.percentIntegerArray;
    return parsedCmyk.decimalArray;
}

function setFullYuv(yuvValue, context) {
    var parsedYuv = parseRgb(yuvValue);
    context.colorValue.yuvFull = parsedYuv;
    context.colorValue.yuv = parsedYuv.integerArray;
    return parsedYuv.array;
}


Color.sort = function(array, type, reverse) {
    var sortType,
        isReverse;
    switch(type) {
        case 'hexInt':
            sortType = 'hexInt';
            break;
        case 'hex':
            sortType = 'hex';
            break;
        case 'red':
        case 'r':
            sortType = 'red';
            break;
        case 'green':
        case 'g':
            sortType = 'green';
            break;
        case 'blue':
        case 'b':
            sortType = 'blue';
            break;
        case 'hue':
        case 'h':
            sortType = 'hue';
            break;
        case 'hslSaturation':
        case 's':
            sortType = 'hslSaturation';
            break;
        case 'luminance':
        case 'l':
            sortType = 'luminance';
            break;
        case 'hsvSaturation':
            sortType = 'hsvSaturation';
            break;
        case 'value':
        case 'v':
            sortType = 'value';
            break;
        case 'c':
        case 'cyan':
            sortType = 'cyan';
            break;
        case 'm':
        case 'magenta':
            sortType = 'magenta';
            break;
        case 'y':
        case 'yellow':
            sortType = 'yellow';
            break;
        case 'k':
        case 'black':
            sortType = 'black';
            break;
        default:
            sortType = 'hexInt';
    }
    isReverse = reverse || false;
    for(var i = 0, iLen = array.length; i < iLen; i++) {
        if(array[i] instanceof Color) {
            array[i].sortValue = {};
            var currentColorValue = array[i].colorValue,
                currentSortValue = array[i].sortValue;
            currentSortValue.hex = currentColorValue.hexFull.sixWithoutPoundSign;
            currentSortValue.hexInt = parseInt(currentColorValue.hexFull.sixWithoutPoundSign, 16);
            currentSortValue.red = currentColorValue.rgb[0];
            currentSortValue.green = currentColorValue.rgb[1];
            currentSortValue.blue = currentColorValue.rgb[2];
            currentSortValue.hue = currentColorValue.hsl[0];
            currentSortValue.hslSaturation = currentColorValue.hsl[1];
            currentSortValue.luminance = currentColorValue.hsl[2];
            currentSortValue.hsvSaturation = currentColorValue.hsv[1];
            currentSortValue.value = currentColorValue.hsv[2];
            currentSortValue.cyan = currentColorValue.cmyk[0];
            currentSortValue.magenta = currentColorValue.cmyk[1];
            currentSortValue.yellow = currentColorValue.cmyk[2];
            currentSortValue.black = currentColorValue.cmyk[3];
        }
    }
    
    var inputArray = array.slice(),
        sortedArray,
        compareColor = (function() {
            if(isReverse) {
                return function(a, b) {
                    return a.sortValue[sortType] - b.sortValue[sortType];
                }
            } else {
                return function(a, b) {
                    return -(a.sortValue[sortType] - b.sortValue[sortType]);
                }
            }
        })();

    sortedArray = inputArray.sort(compareColor);
    return sortedArray;
};

window.Color = Color;

})();
