/**
 * Created by admin on 2016. 4. 24..
 */


var 
//SVG area init
var svgWidth = 1200, svgHeight = 3800;
var margin = { top:10, right:10, bottom:10, left:10 };

//Scale of View
var xScale = d3.scale.linear().range([0, svgWidth]);
var yScale = d3.scale.linear() .range([0, svgHeight]);

//Scale of Color
var colorScale = d3.scale.linear().range([100, 255]);

//Scale of Shape
var rectScale = d3.scale.linear().domain([0, 38000000]).range([20, 500]);

//Create SVG element
// var svg = d3.select("body").append("svg").attr("width", svgWidth).attr("height", svgHeight);
var svg = d3.select("#heads").append("svg").attr("width", svgWidth).attr("height", svgHeight);

//shape요소의 w, h (for test)
var rectW = 100, rectH = 100;
var rectX = 100, rectY = 100; //defalut
var rectR = { w:25, h:25 };


var colorThreshold = d3.scale.threshold()
	.domain([0, 2000, 4000, 6000, 10000])
	.range(["#D4EAFD", "#90C6FA", "#4BA1F7", "#3D94E0", "#3E93C8"]);



// COUNTER FOR ALGORITHM
var counter = 0;
var posArray = [100, 350, 600, 850, 1100];
var xPosition, yPosition = 100;


d3.tsv("data/ted0.3_30.tsv", function (error, dataset) {
// d3.tsv("data/ted0.2.min.tsv", function (error, dataset) {
	if(error){ console.log("load data error!"); }


	//Scale domain set
	xScale.domain([0, 2187]);
	yScale.domain([0, 39000000]);
	colorScale.domain([0, 9140]);


	//Data Type declare
	dataset.forEach(function(d,i) {
		
		var views =  d.TOTAL_VIEWS.replace(/,/gi, ''); 
		d.TOTAL_VIEWS = +views;
		d.Beautiful = +d.Beautiful;

		//counter apply
		counter = counter + 1;
		xPosition = posArray[counter-1];

		// 계산한 x, yPos의 데이터 객체 안에 저장
		d.xPos = xPosition;
		d.yPos = yPosition;
		// console.log(d.xPos);


		if (counter === 4) {
			counter = 0;
			yPosition = yPosition + 300;
		}
		

	});

	
	
	//Shape test 1 - RECT
	// var rect = svg.selectAll("g")
	var rect = svg.selectAll("rect")
		.data(dataset).enter()
		.append("rect")
		.attr("x", function (d) { return d.xPos; })
		.attr("y", function (d) { return d.yPos; })
		.attr("width", 200) //default
		.attr("height", 200)
		.attr("rx", 30)
		.attr("ry", 30)
		.attr("fill", "#f4bcb0")
		.attr("class", function (d, i) { return "face_" + i + ""; });
		// .attr("fill", function (d) { return colorThreshold(d.Beautiful); });



		
	var eyes_left = svg.selectAll(".eyels-right")
		.data(dataset).enter()
		.append("circle")
		.attr("cx", function (d, i) { console.log(getEyesX(i, "left")); return getEyesX(i, "left"); })
		.attr("cy", function (d, i) { return getEyesY(i); })
		.attr("class", function (d, i) { return "eyes_" + i + ""; })
		.attr("r", 10)
		.attr("fill", "black");


	var eyes_right = svg.selectAll(".eyes-left")
		.data(dataset).enter()
		.append("circle")
		.attr("cx", function (d, i) { return getEyesX(i, "right"); })
		.attr("cy", function (d, i) { return getEyesY(i); })
		.attr("class", function (d, i) { return "eyes_" + i + ""; })
		.attr("r", 10)
		.attr("fill", "black");


	var mouths = svg.selectAll(".mouths")
		.data(dataset).enter()
		.append("rect")
		.attr("x", function (d, i) { return getEyesX(i, "right"); })
		.attr("y", function (d, i) { return getEyesY(i); })
		.attr("class", function (d, i) { return "eyes_" + i + ""; })
		.attr("r", 10)
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
	function 

	
		
}); // d3.tsv() - E -
