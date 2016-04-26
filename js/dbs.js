/**
 * Created by admin on 2016. 4. 24..
 */


// var dbs = d3.range(2187); //for save all data
var inits = {
	x: 100,
	y: 100,
	w: 100,
	h: 100,
	r: 10,
	rx: 10,
	ry: 10,
	xGap: 22,
	yGap: 110
};




//SVG area init
var svgWidth = 1200, svgHeight = 20800;
var margin = { top:10, right:10, bottom:10, left:10 };

//Scale of View
var xScale = d3.scale.linear().range([0, svgWidth]);
var yScale = d3.scale.linear() .range([0, svgHeight]);

//Scale of Color
var colorScale = d3.scale.linear().range([100, 255]);

//Scale of Shape
var bodyScale = d3.scale.linear()
	.domain([0, 38000000]).range([20, 100]);
//Scale of Eyes
var eyesScale = d3.scale.linear()
	.domain([0, 9200]).range([4, 30]);

//Create SVG element
// var svg = d3.select("body").append("svg").attr("width", svgWidth).attr("height", svgHeight);
var svg = d3.select("#heads").append("svg").attr("width", svgWidth).attr("height", svgHeight);

//shape요소의 w, h (for test)
var rectW = 100, rectH = 100;
var rectX = 100, rectY = 100; //defalut
var rectR = { w:25, h:25 };




// COUNTER FOR ALGORITHM
var counter = 0;
var posArray = [100, 350, 600, 850, 1100];
var xPosition, yPosition = 100;

var isArea = true;

d3.tsv("data/ted0.2.tsv", function (error, dataset) {
	// d3.tsv("data/ted0.2.min.tsv", function (error, dataset) {
	var dbs = []; //for save all data
	console.log(dbs);
	if (error) { console.log("load data error!"); }


	//Scale domain set
	xScale.domain([0, 2187]);
	yScale.domain([0, 39000000]);
	colorScale.domain([0, 9140]);


	//Data Type declare
	dataset.forEach(function (d, i) {
		// console.log(dbs);
		var obj = {};
		var randomWidth = {
			face: Math.floor(Math.random() * 40) + 50,
			face_radius : Math.floor(Math.random() * 5) + 10,
			eyes: Math.floor(Math.random() * 10) + 11,
			mouths: Math.floor(Math.random() * 40) + 50
		};
		

		var views = d.TOTAL_VIEWS.replace(/,/gi, '');
		d.TOTAL_VIEWS = +views;
		d.Beautiful = +d.Beautiful;

		//for dbs
		if (i === 0) {
			obj.x = +inits.x;
			obj.y = +inits.y;
			obj.w = +inits.w;
			obj.h = +inits.h;
			obj.r = +inits.r;
			obj.rx = +inits.rx;
			obj.ry = +inits.ry;
			
			dbs.push(obj); //2번 방법
		} else {
			//콘텐츠영역 30 < x < 1070을 벗어날 경우
			var obj = {}; 
			isArea = isAreaX(dbs[i - 1].x); // boolean



			obj.x = (isArea == true) ? inits.x : dbs[i - 1].x + dbs[i - 1].w + inits.xGap;
			obj.y = (isArea == true) ? dbs[i - 1].y + inits.yGap : dbs[i - 1].y;
			obj.w = bodyScale(d.TOTAL_VIEWS);
			obj.h = inits.h;
			obj.r = eyesScale(d.Beautiful);
			obj.rx = randomWidth.face_radius;
			obj.ry = randomWidth.face_radius;
			
			dbs.push(obj); //2번 방법
			

		}


	});
	console.log(dbs);



	//Shape test 1 - RECT
	// var rect = svg.selectAll("g")
	var rect = svg.selectAll("rect")
		.data(dataset).enter()
		.append("rect")
		.attr("x", function (d, i) { return dbs[i].x; })
		.attr("y", function (d, i) { return dbs[i].y; })
		.attr("width", function (d, i) { return dbs[i].w; }) //default
		.attr("height", function (d, i) { return dbs[i].w; })
		.attr("rx", function (d, i) { return dbs[i].rx; })
		.attr("ry", function (d, i) { return dbs[i].ry; })
		.attr("fill", "#f4bcb0")
		.attr("class", function (d, i) { return "face_" + i + ""; })
		.on("mouseover", function (d) {
			console.log(d);
		})
		.on("mouseout", function (d) {
		});
	// .attr("fill", function (d) { return colorThreshold(d.Beautiful); });



	//EYE - outer 	
	var eyes_left = svg.selectAll(".eyels-right")
		.data(dataset).enter()
		.append("circle")
		.attr("cx", function (d, i) { return getEyesX(i, "left"); })
		.attr("cy", function (d, i) { return getEyesY(i); })
		.attr("class", function (d, i) { return "eyes_" + i + ""; })
		.attr("r", function (d, i) { return dbs[i].r; })
		.attr("fill", "white");


	var eyes_right = svg.selectAll(".eyes-inner-left")
		.data(dataset).enter()
		.append("circle")
		.attr("cx", function (d, i) { return getEyesX(i, "right"); })
		.attr("cy", function (d, i) { return getEyesY(i); })
		.attr("class", function (d, i) { return "eyes_" + i + ""; })
		.attr("r", function (d, i) { return dbs[i].r; })
		.attr("fill", "white");

	//EYE - inner 	
	var eyes_inner_left = svg.selectAll(".eyels-right")
		.data(dataset).enter()
		.append("circle")
		.attr("cx", function (d, i) { return getEyesX(i, "left"); })
		.attr("cy", function (d, i) { return getEyesY(i); })
		.attr("class", function (d, i) { return "eyes_" + i + ""; })
		.attr("r", function (d, i) { return dbs[i].r/4; })
		.attr("fill", "black");


	var eyes_inner_right = svg.selectAll(".eyes-inner-left")
		.data(dataset).enter()
		.append("circle")
		.attr("cx", function (d, i) { return getEyesX(i, "right"); })
		.attr("cy", function (d, i) { return getEyesY(i); })
		.attr("class", function (d, i) { return "eyes_" + i + ""; })
		.attr("r", function (d, i) { return dbs[i].r/4; })
		.attr("fill", "black");



	//콘텐츠 x영역 체크
	function constrainX(x_i, xIndex) {
		var resultX = (x_i >= 1070) ? inits.x : dbs[xIndex - 1].x;
		return resultX;
	}
	//콘텐츠 x영역 체크
	function isAreaX(currentX) {
		console.log(currentX);
			return (currentX >= 1070) ? true : false;
	}


/*
		
	


	var mouths = svg.selectAll(".mouths")
		.data(dataset).enter()
		.append("rect")
		.attr("x", function (d, i) { return getEyesX(i, "right"); })
		.attr("y", function (d, i) { return getEyesY(i); })
		.attr("class", function (d, i) { return "eyes_" + i + ""; })
		.attr("r", 10)
		.attr("fill", "black");	
*/

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
	

	
		
}); // d3.tsv() - E -
