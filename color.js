(function() {
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
    function makeHexArray(hexArray) {
        // 检查格式 去重 带有# 大写 6位
        var result = [],
            rColorHex = /^#?([\da-f]{3}){1,2}$/i;
        for(var i = 0, iLen = hexArray.length; i < iLen; i++) {
            // 检查格式
            if(rColorHex.test(hexArray[i])) {
                // 去#
                if(hexArray[i].charAt(0) === '#') {
                    hexArray[i] = hexArray[i].slice(1);
                }
                // 大写
                hexArray[i] = hexArray[i].toUpperCase();
                // 3位的扩充为6位
                if(hexArray[i].length === 3) {
                    hexArray[i] = hexArray[i].replace(/^([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
                }
                // 去重
                if(result.indexOf(hexArray[i]) === -1) {
                    result.push(hexArray[i]);
                }
            }
        }
        return result;
    }
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
    function singleRgbToHsl(rgb, round) {
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
        if(round) {
            return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
        } else {
            return [h, s * 100, l * 100];
            // [213.1578947368421, 63.333333333333385, 88.23529411764706]
        }
    }
    function singleHslToRgb(hsl) {
        var r,
            g,
            b,
            h = Math.max(Math.min(parseInt(hsl[0], 10), 360), 0) / 360,
            s = Math.max(Math.min(parseInt(hsl[1], 10), 100), 0) / 100,
            l = Math.max(Math.min(parseInt(hsl[2], 10), 100), 0) / 100,
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
        // u = Math.round((((b - y) * 0.493) + 111) / 222 * 255);
        // v = Math.round((((r - y) * 0.877) + 155) / 312 * 255);
        u = 0.436 * (b - y) / (1 - 0.114) + 128;
        v = 0.615 * (r - y) / (1 - 0.299) + 128
        return [y, u, v];
    }
    function singleYuvToRgb(yuv) {
        /*var y = parseInt(yuv[0], 10),
            u = parseInt(yuv[1], 10) / 255 * 222 - 111,
            v = parseInt(yuv[2], 10) / 255 * 312 - 155,
            r, g, b;
        r = Math.round(y + v / 0.877);
        g = Math.round(y - 0.39466 * u - 0.5806 * v);
        b = Math.round(y + u / 0.493);*/
        var y = yuv[0],
            u = yuv[1],
            v = yuv[2],
            r,
            g,
            b;
        r = y + 1.13982 * (v - 128);
        g = y - 0.39465 * (u - 128) - 0.58060 * (v - 128);
        b = y + 2.03211 * (u - 128);
        return [r, g, b];
    }
    function HexArray(hexArray) {
        // 6位 大写 不含# 
        this.hexArray = makeHexArray(hexArray);
        this.rgbArray = [];
        this.hsvArray = [];
        this.hslArray = [];
        this.colorsArray = [];
    }
    HexArray.prototype = {
        constructor: HexArray,
        convertToRgb: function() {
            var rgbArray = [];
            for(var i = 0, iLen = this.hexArray.length; i < iLen; i++) {
                rgbArray.push(singleHexToRgb(this.hexArray[i]));
            }
            this.rgbArray = rgbArray;
            return rgbArray;
        },
        convertToHsv: function() {
            if(this.rgbArray.length === 0) {
                this.convertToRgb();
            }
            var hsvArray = [];
            for(var i = 0, iLen = this.rgbArray.length; i < iLen; i++) {
                hsvArray.push(singleRgbToHsv(this.rgbArray[i]));
            }
            this.hsvArray = hsvArray;
            return hsvArray;
        },
        convertToHsl: function(percentage) {
            if(this.rgbArray.length === 0) {
                this.convertToRgb();
            }
            percentage = typeof percentage === 'undefined' ? true : percentage;
            var hslArray = [],
                singleHsl,
                singleHslArray = [];
            for(var i = 0, iLen = this.rgbArray.length; i < iLen; i++) {
                if(percentage) {
                    singleHsl = singleRgbToHsl(this.rgbArray[i]);
                    for(var j = 0, jLen = singleHsl.length; j < jLen; j++) {
                        if(j > 0) {
                            singleHslArray.push( Math.round(singleHsl[j]*100) + '%' );
                        } else {
                            singleHslArray.push(singleHsl[j]);
                        }
                    }
                    hslArray.push(singleHslArray);
                } else {
                    hslArray.push(singleRgbToHsl(this.rgbArray[i]));
                }
            }
            this.hslArray = hslArray;
            return hslArray;
        },
        cleanColorHexArray: function() {
            var cleanedHexArray = [];
            for(var i = 0, iLen = this.hexArray.length; i < iLen; i++) {
                if(/^([\dA-F])\1([\dA-F])\2([\dA-F])\3/.test(this.hexArray[i])) {
                    cleanedHexArray.push('#' +  this.hexArray[i].charAt(0) + this.hexArray[i].charAt(2) + this.hexArray[i].charAt(4));
                } else {
                    cleanedHexArray.push('#' + this.hexArray[i]);
                }
            }
            return cleanedHexArray;
        },
        sortColorArray: function(sortType, reverse) {
            switch(sortType) {
                case 'hexNum':
                    sortType = 'hexNum';
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
                case 'hsvSaturation':
                    sortType = 'hsvSaturation';
                    break;
                case 'luminance':
                case 'l':
                    sortType = 'luminance';
                    break;
                case 'value':
                case 'v':
                    sortType = 'value';
                    break;
                default:
                    sortType = 'hexNum';
            }
            reverse = reverse || false;
            var sortedColors,
                compareColor = (function() {
                    if(reverse) {
                        return function(a, b) {
                            return a[sortType] - b[sortType];
                        }
                    } else {
                        return function(a, b) {
                            return -(a[sortType] - b[sortType]);
                        }
                    }
                })(),
                result = [];

            for(var i = 0, iLen = this.hexArray.length; i < iLen; i++) {
                this.colorsArray[i] = {};
                this.colorsArray[i].hex = this.hexArray[i];
                this.colorsArray[i].hexNum = parseInt(this.hexArray[i], 16);
                this.colorsArray[i].rgb = singleHexToRgb(this.hexArray[i]);
                this.colorsArray[i].hsv = singleRgbToHsv(this.colorsArray[i].rgb);
                this.colorsArray[i].hsl = singleRgbToHsl(this.colorsArray[i].rgb);
                this.colorsArray[i].cmyk = singleRgbToCmyk(this.colorsArray[i].rgb);
                this.colorsArray[i].red = this.colorsArray[i].rgb[0];
                this.colorsArray[i].green = this.colorsArray[i].rgb[1];
                this.colorsArray[i].blue = this.colorsArray[i].rgb[2];
                this.colorsArray[i].hue = this.colorsArray[i].hsv[0];
                this.colorsArray[i].hsvSaturation = this.colorsArray[i].hsv[1];
                this.colorsArray[i].value = this.colorsArray[i].hsv[2];
                this.colorsArray[i].hslSaturation = this.colorsArray[i].hsl[1];
                this.colorsArray[i].luminance = this.colorsArray[i].hsl[2];
            };
            sortedColors = this.colorsArray.sort(compareColor);
            for(var j = 0, jLen = sortedColors.length; j < jLen; j++) {
                result.push('#' + sortedColors[j].hex);
            }
            return result;
        }
    }
    window.HexArray = HexArray;
})();
