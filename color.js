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
        rgb.push(parseInt(hex.slice(0, 2), 16));
        rgb.push(parseInt(hex.slice(2, 4), 16));
        rgb.push(parseInt(hex.slice(4, 6), 16));
        return rgb;
    }
    function singleRgbToHsv(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255,
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
    }
    function singleRgbToHsl(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255,
            min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            h,
            s,
            l;
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
    function singleRgbToCmyk(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255,
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
