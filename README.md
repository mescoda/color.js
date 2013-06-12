# color.js

Convert and sort colors in w3cColor HEX RGB HSL HSV CMYK YUV type

## Browser support

* Chrome
* Firefox
* IE 6+

## Input support

### w3cColor

```js
var w3cColor = new Color('skyblue');
```

### HEX

```js
var hex = new Color('83BF73');
var hex = new Color('#83BF73');
var hex = new Color('hex', '83BF73');
var hex = new Color('hex', '#83BF73');
```

### RGB

```js
var rgb = new Color([131, 191, 115]);
var rgb = new Color('131, 191, 115');
var rgb = new Color('131 191 115');

var rgb = new Color('rgb', [131, 191, 115]);
var rgb = new Color('rgb', '131, 191, 115');
var rgb = new Color('rgb', '131 191 115');
var rgb = new Color('rgb', 131, 191, 115);
```

### HSL/HSV

```js
var hsl = new Color('hsl', [107, 37, 60]);
var hsl = new Color('hsl', [107, '37%', '60%']);
var hsl = new Color('hsl', [107, 0.37, 0.6]);

var hsl = new Color('hsl', '107,37,60');
var hsl = new Color('hsl', '107,37%,60%');
var hsl = new Color('hsl', '107,0.37,0.6');

var hsl = new Color('hsl', '107 37 60');
var hsl = new Color('hsl', '107 37% 60%');
var hsl = new Color('hsl', '107 0.37 0.6');

var hsl = new Color('hsl', 107, 37, 60);
var hsl = new Color('hsl', 107, '37%', '60%');
var hsl = new Color('hsl', 107, 0.37, 0.6);
```

### CMYK

```js
var cmyk = new Color('cmyk', [31, 0, 40, 25]);
var cmyk = new Color('cmyk', ['31%', '0%', '40%', '25%']);
var cmyk = new Color('cmyk', [0.31, 0, 0.4, 0.25]);

var cmyk = new Color('cmyk', '31, 0, 40, 25');
var cmyk = new Color('cmyk', '31%, 0, 40%, 25%');
var cmyk = new Color('cmyk', '0.31, 0, 0.4, 0.25');

var cmyk = new Color('cmyk', '31 0 40 25');
var cmyk = new Color('cmyk', '31% 0 40% 25%');
var cmyk = new Color('cmyk', '0.31 0 0.4 0.25');

var cmyk = new Color('cmyk', 31, 0, 40, 25);
var cmyk = new Color('cmyk', '31%', 0, '40%', '25%');
var cmyk = new Color('cmyk', 0.31, 0, 0.4, 0.25);
```

### YUV

```js
var yuv = new Color('yuv', [164, 100, 103]);
var yuv = new Color('yuv', '164,100,103');
var yuv = new Color('yuv', '164 100 103');
var yuv = new Color('yuv', 164, 100, 103);
```

## Sort support

* hex
* hexInt (parseInt(hex, 16)) (default)
* red(r) in RGB
* green(g) in RGB
* blue(b) in RGB
* hue(h) in HSL
* hslSaturation(s) in HSL
* luminance(l) in HSL
* hsvSaturation in HSV
* value(v) in HSV
* cyan(c) in CMYK
* magenta(m) in CMYK
* yellow(y) in CMYK
* black(b) in CMYK

## Example

test/color.test.html