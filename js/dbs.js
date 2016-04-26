/**
 * Created by admin on 2016. 4. 24..
 */


// var dbs = d3.range(2187); //for save all data
var inits = {
	x: 100, y: 100,
	w: 100, h: 100,
	r: 10,
	rx: 10, ry: 10,
	xGap: 22, yGap: 110
};





// Math test-------------------------------------
// test with 'Beautiful 'Value
var bScale = d3.scale.linear()
	.domain([0, 39000000])
	.range([1, 1.475]);


var scale_totalview = d3.scale.linear()
	.domain([0, 39000000])
	.range([400, 1000]);



var n2_scale = d3.scale.linear()
	// .domain([1, 1.475]); //1차 방법
	.domain([0, 3800000]); // 2차 방법



//--------------------------------------


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



var shape = d3.superformula()
	.type("explorer")
	// .size(100000)
	.size(10000)
	.segments(3600);


var path = svg.append("path")
	.attr("class", "big")
	.attr("transform", "translate(480,250)")
	.attr("d", shape) ;



var isArea = true;
// d3.tsv("data/ted0.2.tsv", function (error, dataset) {
d3.tsv("data/ted0.3_30.tsv", function (error, dataset) {
	var dbs = []; //for save all data
	console.log(dbs);
	if (error) { console.log("load data error!"); }
	var testValue = getValues(6014582);
	console.log(testValue);


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

		//for dbs --------------------------------------------------------------------------------------------------
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
	//end dbs --------------------------------------------------------------------------------------------------


	var shapeTypes = (function(d, i){
		console.log(d);
		return d;
	});

	//PATH shape ---------------------------------------------------------------------------------------------
	var shape = d3.superformula()
		.type(function (d) { return d.Role_refine.toLowerCase(); }) //직업이름으로 기본 shape부여
		.size(1000)
		.segments(3600);

	//로드된 shp의 스타일 변경 - Param단위
	shape
		.param("m", function(d){ return setParameter_m(d); })
		.param("n1", function(d){ return setParameter_n1(d); })
		.param("n2", function(d){ return setParameter_n2(d); })
		.param("n3", function(d){ return setParameter_n3(d); })
		.param("a", function(d){ return setParameter_a(d); })
		.param("b", function(d){ return setParameter_b(d); });



		/*
		.param("m", 1.362)
		.param("n1", 1.362)
		.param("n2", function(d,i) {
			var resultMsg = getValues(d.TOTAL_VIEWS, d.Role_refine);
			return resultMsg.valueB;
		})
		.param("n3", 5.938)
		.param("a", -0.9625)
		.param("b", function(d,i) {
			var resultMsg = getValues(d.TOTAL_VIEWS);
			return resultMsg.valueA;
		});
		*/
	//END PATH shape ---------------------------------------------------------------------------------------------




	//PATH element  ---------------------------------------------------------------------------------------------
	var path = svg.selectAll("path")
		.data(dataset).enter()
		.append("path")
		.attr("transform",function(d, i){ return 'translate('+ dbs[i].x + ',' + dbs[i].y + ') ';})
		.attr("class", function(d,i){ return "path_" + i; })
		.attr("d", shape)
		.on("mouseover", function(d){
			console.log(d);
		});
	//PATH element ---------------------------------------------------------------------------------------------






// Math test function ------------------------------------
	function getValues(mv, role_nm){
		var resultFunction;

		switch(role_nm) {
			case "Explorer":
				resultFunction = explorer(mv);
				break;
			case "Art":
				resultFunction = Art(mv);
				break;
			case "Management":
				resultFunction = Management(mv);
				break;
			default:
				 resultFunction = explorer(mv);
				break;
		}

		return resultFunction;




		function explorer(mv){
			var result = {};

			var scale_b = d3.scale.linear().domain([0, 39000000]).range([1, 1.475]);
			var scale_n2 = d3.scale.linear().domain([0, 39000000]);

			var scale_b_value = scale_b(mv);


			var n2_min = ((12395600*scale_b_value) - 1610725)/1805000;
			var n2_max = ((140*scale_b_value)+31) / 19;

			scale_n2.range([n2_min, n2_max]);
			var scale_n2_value = scale_n2(mv);

			result.nameA = "b";
			result.nameB = "n2";
			result.valueA = scale_b_value;
			result.valueB = scale_n2_value;

			return result;
		}
		function Art(mv){
			var result = {};

			var scale_b = d3.scale.linear().domain([0, 39000000]).range([1, 1.475]);
			var scale_n2 = d3.scale.linear().domain([0, 39000000]);

			var scale_b_value = scale_b(mv);


			var n2_min = ((12395600*scale_b_value) - 1610725)/1805000;
			var n2_max = ((140*scale_b_value)+31) / 19;

			scale_n2.range([n2_min, n2_max]);
			var scale_n2_value = scale_n2(mv);

			result.nameA = "b";
			result.nameB = "n2";
			result.valueA = scale_b_value;
			result.valueB = scale_n2_value;

			return result;
		}
		function Management(mv){
			var result = {};

			var scale_b = d3.scale.linear().domain([0, 39000000]).range([1, 1.475]);
			var scale_n2 = d3.scale.linear().domain([0, 39000000]);

			var scale_b_value = scale_b(mv);


			var n2_min = ((12395600*scale_b_value) - 1610725)/1805000;
			var n2_max = ((140*scale_b_value)+31) / 19;

			scale_n2.range([n2_min, n2_max]);
			var scale_n2_value = scale_n2(mv);

			result.nameA = "b";
			result.nameB = "n2";
			result.valueA = scale_b_value;
			result.valueB = scale_n2_value;

			return result;
		}



	}


	//콘텐츠 x영역 체크
	function constrainX(x_i, xIndex) {
		var resultX = (x_i >= 1070) ? inits.x : dbs[xIndex - 1].x;
		return resultX;
	}
	//콘텐츠 x영역 체크
	function isAreaX(currentX) {
		// console.log(currentX);
		return (currentX >= 1070) ? true : false;
	}


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
