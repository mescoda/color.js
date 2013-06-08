
if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(target) {
        for(var i = 0, iLen = this.length; i < iLen; i++) {
            if(this[i] === target) {
                return i;
            }
        }
        return -1;
    }
}

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

    var colorRegex = {
        hex: /^$/,
        rgb: /^$/,
        rgba: /^$/,
        hsl: /^$/,
        hsla: /^$/
    };
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
        yellowgreen: #'9ACD32'
    };
    var w3cColorsNames = [];
    for(var i in w3cColors) {
        if(w3cColors.hasOwnProperty(i)) {
            w3cColorsNames.push(w3cColors[i]);
        }
    }


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
            case 'hsv':
                return new Hsv(value);
                break;
            case 'hsl':
                return new Hsl(value);
                break;
            case 'cmyk':
                return new Cmyk(value);
                break;
            case 'yuv':
                return new Yuv(value);
                break;
        }
    } else if(arguments.length === 1) {
        // 只有一个参数的情况根据 string/array 返回 Hex/Rgb
        if(typeof value === 'string') {
            // regex check or reserved name
            if(w3cColors.indexOf(value) >= 0) {
                return new Rgb(w3cColors[value]);
            }
            return new Hex(arguments[0]);
        } else if(Object.prototype.toString.call(value) === '[object Array]') {
            // rgb or rgba
            return new Rgb(arguments[0]);
        }
    } else if(arguments.length > 2) {
        // input Array like string
        // rgb hsl hsv
        // new Color('rgb', 123, 123, 123);
        switch(type.toLowerCase()) {
            case 'rgb':
                return new Rgb(Array.prototype.slice.apply(arguments, 1));
                break;
            case 'hsv':
                return new Hsv(Array.prototype.slice.apply(arguments, 1));
                break;
            case 'hsl':
                return new Hsl(Array.prototype.slice.apply(arguments, 1));
                break;
            case 'cmyk':
                return new Cmyk(Array.prototype.slice.apply(arguments, 1));
                break;
            case 'yuv':
                return new Yuv(Array.prototype.slice.apply(arguments, 1));
                break;
        }
    } else {
        return value;
    }

    this.value = new Rgb();
}
Color.prototype.toString = function() {
    // return Object.prototype.toString.call(this);
    return Array.prototype.join.call(this);
}
Color.prototype.toRgb = function() {
    if(this.)
}
function Rgb() {
    this.type = 'rgb';
}
Rgb.prototype = new Color();
Rgb.prototype.constructor = Rgb;
Rgb.prototype.sth = function() {

};

function Hex() {
    this.type = 'hex';
}
Hex.prototype = new Color();
Hex.prototype.constructor = Hex;
Hex.prototype.sth = function() {

};


// single

new Color('255,255,155').toRgb();

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




// array
var a = [new Color(), new Color(), new Color()];