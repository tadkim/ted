

var w = 400, h = 400;
var rectW = 200, rectH = 200;

var rectX = 100, rectY = 100; //defalut



var svg = d3.select("#heads").append("svg")    
    .attr("width", w)
    .attr("height", h);
    // .attr("transform", "translate(" w + "," + h + ")");

rect = svg.append("rect")
    .attr("x", rectX)
    .attr("y", rectY)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("width", rectW)
    .attr("height", rectH)
    .attr("fill", "#f4bcb0")
    .attr("class", function (d, i) { return "face_" + i + ""; });

eyes_left = svg.append("circle")
    .attr("cx", function (d, i) { return getEyesX(i, "left"); })
    .attr("cy", function (d, i) { return getEyesY(i); })
    .attr("class", function (d, i) { return "eyes_" + i + ""; })
    .attr("r", 30)
    .attr("fill", "black");


eyes_right = svg.append("circle")
    .attr("cx", function (d, i) { return getEyesX(i, "right"); })
    .attr("cy", function (d, i) { return getEyesY(i); })
    .attr("class", function (d, i) { return "eyes_" + i + ""; })
    .attr("r", 30)
    .attr("fill", "black");


//getEye Position : x
function getEyesX(e_i, e_dir) {
    //현재 인덱스에 따른 선택자
    var $thisIndex = ".face_" + e_i;

    //얼굴 rect 속성 값 얻기
    var faceX = $($thisIndex).attr("x"),
        faceY = $($thisIndex).attr("y"),
        faceW = $($thisIndex).attr("width"),
        faceH = $($thisIndex).attr("height");

    return (e_dir === "left") ? parseInt(faceX) + parseInt((faceW / 4)) :
        parseInt(faceX) + parseInt(faceW) - parseInt((faceW / 4));
}
//getEye Position : x
function getEyesY(e_i) {
    //현재 인덱스에 따른 선택자
    var $thisIndex = ".face_" + e_i;
    //얼굴 rect 속성 값 얻기
    var faceX = $($thisIndex).attr("x"),
        faceY = $($thisIndex).attr("y"),
        faceW = $($thisIndex).attr("width"),
        faceH = $($thisIndex).attr("height");
    return parseInt(faceY) + parseInt((faceH/2));
}    

