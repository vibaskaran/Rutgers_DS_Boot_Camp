function pickHex(color1, color2, weight) {
    var w1 = weight;
    var w2 = 1 - w1;
    // var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
    // Math.round(color1[1] * w1 + color2[1] * w2),
    // Math.round(color1[2] * w1 + color2[2] * w2)];
    // return rgb;

    var rgb = "rgb("+Math.round(color1[0] * w1 + color2[0] * w2)+","+
    Math.round(color1[1] * w1 + color2[1] * w2)+","+
    Math.round(color1[2] * w1 + color2[2] * w2)+")";
    return rgb;
}

col1 = pickHex([0,0,51], [51,0,0], 214/214)
console.log(col1);