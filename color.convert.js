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
    rgb: /^(2[0-4]\d|25[0-5]|[1]?\d?\d)([,\s]|,\s)(2[0-4]\d|25[0-5]|[1]?\d?\d)\2(2[0-4]\d|25[0-5]|[1]?\d?\d)$/,
    rgba: /^(2[0-4]\d|25[0-5]|[1]?\d?\d)([,\s]|,\s)(2[0-4]\d|25[0-5]|[1]?\d?\d)\2(2[0-4]\d|25[0-5]|[1]?\d?\d)\2(1|0\.\d|0)$/,
    hsl: /^(3[0-5]\d|360|[12]?\d?\d)([,\s]|,\s)(100|\d?\d)\2(100|\d?\d)$/,
    hslPercent: /^(3[0-5]\d|360|[12]?\d?\d)([,\s]|,\s)(100|\d?\d)%?\2(100|\d?\d)%?$/,
    hslDecimal: /^(3[0-5]\d|360|[12]?\d?\d)([,\s]|,\s)(1|0\.\d+|0)\2(1|0\.\d+|0)$/,
    hsla: /^$/,
    cmykPercent: /^(100|\d?\d)%?([,\s]|,\s)(100|\d?\d)%?\2(100|\d?\d)%?\2(100|\d?\d)%?$/,
    cmykDecimal: /^(1|0\.\d+|0)([,\s]|,\s)(1|0\.\d+|0)\2(1|0\.\d+|0)\2(1|0\.\d+|0)$/
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
        return parseInt(item, 10);
    });
    rgb.integetString = rgb.integerArray.join();
    return rgb;
}


function parseRgba(rgbaValue) {
    var rgba = {};
    rgba = parseArrayString('rgba', arguments.callee, rgbaValue);
    rgba.integerArray = rgba.array.map(function(item, index) {
        if(index < rgba.array.length - 1) {
            return parseInt(item, 10);
        } else {
            return item;
        }
    });
    rgba.integetString = rgba.integerArray.join();
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
                    hsl.percentIntegerArray.push(parseInt(hsl.array[i], 10));
                    hsl.percentIntegerWithSignArray.push(parseInt(hsl.array[i], 10) + '');
                } else {
                    hsl.decimalArray.push(hsl.array[i] / 100);
                    hsl.percentArrayWithSign.push(hsl.array[i] + '%');
                    hsl.percentIntegerArray.push(parseInt(hsl.array[i], 10));
                    hsl.percentIntegerWithSignArray.push(parseInt(hsl.array[i], 10) + '%');
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
                return parseInt(item, 10);
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
                    hsl.percentIntegerArray.push(parseInt(hsl.array[j], 10));
                    hsl.percentIntegerWithSignArray.push(parseInt(hsl.array[j], 10) + '');
                } else {
                    hsl.percentArray.push(hsl.array[j] * 100);
                    hsl.percentArrayWithSign.push(hsl.array[j] * 100 + '%');
                    hsl.percentIntegerArray.push(parseInt(hsl.array[j] * 100, 10));
                    hsl.percentIntegerWithSignArray.push(parseInt(hsl.array[j] * 100, 10) + '%');
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
            for(var i = 0, iLen = cmyk.array.length; i < iLen; i++) {
                cmyk.decimalArray.push(cmyk.array[i] / 100);
                cmyk.percentArrayWithSign.push(cmyk.array[i] + '%');
            }
        }
    } else if(colorRegex.cmykDecimal.test(cmykValue)) {
        // 0.9 0.9 0.9 0.9 类型的小数 string
        cmyk = parseArrayString('cmykDecimal', arguments.callee, cmykValue);
        if(cmyk.string && cmyk.string.length > 0) {
            cmyk.decimalArray = cmyk.array.slice();
            cmyk.percentArray = [];
            cmyk.percentArrayWithSign = [];
            for(var j = 0, jLen = cmyk.array.length; j < jLen; j++) {
                cmyk.percentArray.push(cmyk.array[j] * 100);
                cmyk.percentArrayWithSign.push(cmyk.array[j] * 100 + '%');
            }
            
        }
    }
    if(cmyk.percentArray) {
        cmyk.percentString = cmyk.percentArray.join();
        cmyk.decimalString = cmyk.decimalArray.join();
        cmyk.percentStringWithSign = cmyk.percentArrayWithSign.join();
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

    this.colorValue = {};

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
        // rgb hsl hsv
        // new Color('rgb', 123, 123, 123);
        switch(type.toLowerCase()) {
            case 'rgb':
                return new Rgb(Array.prototype.slice.call(arguments, 1));
                break;
            case 'hsl':
                return new Hsl(Array.prototype.slice.call(arguments, 1));
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

Color.prototype.toString = function() {
    // return Object.prototype.toString.call(this);
    return Array.prototype.join.call(this);
}

Color.prototype.toRgb = function() {
    return this.colorValue.rgb;

    /*switch(this.type.toLowerCase()) {
        case 'rgb':
            // return 
            break;
        case 'hex':
            // return 
            break;
    }*/

    /*if(this instanceof Rgb) {

    }*/
}
Color.prototype.toHex = function() {
    return this.colorValue.hex;
}


function Hex(hexValue) {
    this.type = 'hex';
    this.init(hexValue)
}
Hex.prototype = new Color();
Hex.prototype.constructor = Hex;
Hex.prototype.init = function(hexValue) {
    var parsedHex = parseHex(hexValue);
    this.colorValue.hexFull = parsedHex;
    this.colorValue.hex = parsedHex.mostRecommendation;
    this.colorValue.hexInside = parsedHex.sixWithoutPoundSign;
};


function Rgb(rgbValue) {
    this.type = 'rgb';
    this.init(rgbValue);
}
Rgb.prototype = new Color();
Rgb.prototype.constructor = Rgb;
Rgb.prototype.init = function(rgbValue) {
    var parsedRgb = parseRgb(rgbValue);
    this.colorValue.rgbFull = parsedRgb;
    this.colorValue.rgb = parsedRgb.array || [];
};

function Rgba(rgbaValue) {
    this.type = 'rgba';
    this.init(rgbaValue);
}
Rgba.prototype = new Color();
Rgba.prototype.constructor = Rgba;
Rgba.prototype.init = function(rgbaValue) {
    var parsedRgba = parseRgba(rgbaValue);
    this.colorValue.rgbaFull = parsedRgba;
    this.colorValue.rgba = parsedRgba.array || [];
};

function Hsl(hslValue) {
    this.type = 'hsl';
    this.init(hslValue);
}
Hsl.prototype = new Color();
Hsl.prototype.constructor = Hsl;
Hsl.prototype.init = function(hslValue) {
    var parsedHsl = parseHsx('hsl', hslValue);
    this.colorValue.hslFull = parsedHsl;
    this.colorValue.hsl = parsedHsl.percentArray || [];
}

function Hsv(hsvValue) {
    this.type = 'hsv';
    this.init(hsvValue);
}
Hsv.prototype = new Color();
Hsv.prototype.constructor = Hsv;
Hsv.prototype.init = function(hsvValue) {
    var parsedHsv = parseHsx('hsv', hsvValue);
    this.colorValue.hsvFull = parsedHsv;
    this.colorValue.hsv = parsedHsv.percentArray || [];
}

function Cmyk(cmykValue) {
    this.type = 'cmyk';
    this.init(cmykValue);
}
Cmyk.prototype = new Color();
Cmyk.prototype.constructor = Cmyk;
Cmyk.prototype.init = function(cmykValue) {
    var parsedCmyk = parseCmyk(cmykValue);
    this.colorValue.cmykFull = parsedCmyk;
}

function Yuv(yuvValue) {
    this.type = 'yuv';
    this.init(yuvValue);
}
Yuv.prototype = new Color();
Yuv.prototype.constructor = Yuv;
Yuv.prototype.init = function(yuvValue) {
    var parsedYuv = parseYuv(yuvValue);
    this.colorValue.yuvFull = parsedYuv;
}

window.Color = Color;

})();

// EXAMPLE

// single

/*new Color('255,255,155').toRgb();

// check type
var a = new Color('ddd');
if(a.type.toLowerCase() === 'hex') {

}

// convert

var a = new Color()
console.log(a.type);
a.toHex();
a.toRgb();
a.toHsl();

// 通过一个类似 ColorLadderLib-master 的映射


// array
var a = [new Color(), new Color(), new Color()];


function Color() {

}
function Rgb() {
    this.type = 'rgb';
    this.init();
}
Rgb.prototype = new Color();
Rgb.prototype.constructor = Rgb;
Rgb.prototype.init = function() {

};

function Hex() {
    this.type = 'hex';
    this.init();
}
Hex.prototype = new Color();
Hex.prototype.constructor = Hex;
Hex.prototype.init = function() {

};*/
