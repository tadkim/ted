/**
 * Created by admin on 2016. 4. 24..
 */


// var dbs = d3.range(2187); //for save all data
var inits = {
	x: 100, y: 100,
	w: 100, h: 100,
	r: 10,
	rx: 10, ry: 10,
	xGap: 100,//22
	yGap: 150//110
};

// Math test-------------------------------------
var scale_totalview = d3.scale.linear().domain([0, 39000000]).range([400, 1000]);
//--------------------------------------


//SVG area init
var svgWidth = 1200, svgHeight = 50800;
var margin = { top:10, right:10, bottom:10, left:10 };

//Scale of View
var xScale = d3.scale.linear().range([0, svgWidth]);
var yScale = d3.scale.linear() .range([0, svgHeight]);

//Scale of Color
var colorScale = d3.scale.linear().range([100, 255]);

//Scale of Shape
var bodyScale = d3.scale.linear().domain([0, 1523782]).range([20, 100]);
var eyesScale = d3.scale.linear().domain([0, 9200]).range([4, 30]);
var opaScale = d3.scale.linear().domain([0, 39000000]).range([0.1, 1.0]);

//Create SVG element
var svg = d3.select("#ted_head").append("svg").attr("width", svgWidth).attr("height", svgHeight);



var isArea = true;
// d3.tsv("data/ted0.2.min.tsv", function (error, dataset) {
// d3.tsv("data/ted0.2.tsv", function (error, dataset) {
d3.tsv("data/ted_q1.tsv", function (error, dataset) {
// d3.tsv("data/ted0.3_30.tsv", function (error, dataset) {
	var dbs = []; //for save all data
	if (error) { console.log("load data error!"); }

	//Scale domain set
	xScale.domain([0, 2187]);
	yScale.domain([0, 1523782]);
	colorScale.domain([0, 9140]);
	/*
	//데이터 셋을 필터링 : Profession만 추출
	dataset = dataset.filter(function(element){
		return element.Role_refine === "Art";
	});
	*/
	//Data Type declare
	dataset.forEach(function (d, i) {
		// console.log(dbs);
		var obj = {};
		var saveAll = {};

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
			obj.x = +inits.x; obj.y = +inits.y;
			obj.w = +inits.w; obj.h = +inits.h; obj.r = +inits.r;
			obj.rx = +inits.rx; obj.ry = +inits.ry;
			dbs.push(obj); //2번 방법
		} else {
			//콘텐츠영역 30 < x < 1070을 벗어날 경우
			var obj = {};
			isArea = isAreaX(dbs[i - 1].x); // boolean

			obj.x = (isArea == true) ? inits.x : dbs[i - 1].x + dbs[i - 1].w + inits.xGap; //default
			obj.y = (isArea == true) ? dbs[i - 1].y + inits.yGap : dbs[i - 1].y;
			obj.w = bodyScale(d.TOTAL_VIEWS);
			obj.h = inits.h;
			obj.r = eyesScale(d.Beautiful);
			obj.rx = randomWidth.face_radius;
			obj.ry = randomWidth.face_radius;

			dbs.push(obj); //2번 방법
		}
	});
	// console.log(dbs);
	//end dbs --------------------------------------------------------------------------------------------------


	//PATH shape ---------------------------------------------------------------------------------------------
	var shape = d3.superformula()
		.type(function (d) { return d.Role_refine.toLowerCase(); }) //직업이름으로 기본 shape부여
		.size(8000)//3000
		.segments(100);
	/*
		.segments(function(d,i){
			if( 0 <=  i && i < 5 ){
				var resultSeg = 100;
				console.log(resultSeg);
				return resultSeg;
			} else if( 5 <=  i && i < 10 ){
				return 1000;
			} else if(10 <= i && i < 15){
				return 1500;
			} else if(15 <= i && i < 20){
				return 2000;
			} else if(20 <= i && i < 25){
				return 2500;
			} else if(25 <= i && i < 30){
				return 3000;
			}
		});//3600


*/

	//로드된 shp의 스타일 변경 - Param단위
	shape
		.param("m", function(d,i){return setParameter_m(d); })
		.param("n1", function(d){ return setParameter_n1(d); })
		.param("n2", function(d){ return setParameter_n2(d); })
		.param("n3", function(d){ return setParameter_n3(d); })
		.param("a", function(d){ return setParameter_a(d); })
		.param("b", function(d){ return setParameter_b(d); });
	//END PATH shape ---------------------------------------------------------------------------------------------


	//saveAll 객체에 현재 루프의 shape를 추가한다.
	// mergeObjects(saveAll, shape);
	//각 shape를 html영역에 표시한다.
	// exportObject(shape, "#exportOBJ");


	//PATH element  ---------------------------------------------------------------------------------------------
	var path = svg.selectAll("path")
		.data(dataset).enter()
		.append("path")
		.attr("transform",function(d, i){
			var cu_nm = d.Role_refine.toLowerCase();
			var rot = 0;
			if( cu_nm === "art" || cu_nm === "public" || cu_nm === "religion" ){
				return 'translate('+  Math.round(dbs[i].x)  + ',' + dbs[i].y + ') rotate(90)';
			} else if(cu_nm === "media" || cu_nm === "management" || cu_nm === "humanist" || cu_nm === "explorer"){
				return 'translate('+  Math.round(dbs[i].x)  + ',' + dbs[i].y + ') rotate(270)';
			} else {
				return 'translate('+  Math.round(dbs[i].x)  + ',' + dbs[i].y + ')';
			}
		})
		.attr("class", function(d,i){ return "path_" + i; })
		.attr("d", shape)
		.style("fill", function(d,i){
			if( 0 <=  i && i < 5 ){
				return "red";
			} else if( 5 <=  i && i < 10 ){
				return "orange";
			} else if(10 <= i && i < 15){
				return "yellow";
			} else if(15 <= i && i < 20){
				return "green";
			} else if(20 <= i && i < 25){
				return "blue";
			} else if(25 <= i && i < 30){
				return "navy";
			} else {
				return "pupple";
			}
		})
		// .style("opacity", function(d){return opaScale(d.TOTAL_VIEWS);})
		.on("mouseover", function(d){
			d3.selectAll("#tooltip").select(".tooltip_v1").text(d.NAME);
			d3.selectAll("#tooltip").select(".tooltip_v2").text(numberWithCommas(d.TOTAL_VIEWS));
			d3.selectAll("#tooltip").select(".tooltip_v3").text(numberWithCommas(d.Beautiful));

			d3.selectAll("#tooltip").classed("hidden", false);
		})
		.on("mouseout", function(d){
			d3.selectAll("#tooltip").class("hidden", true);
		});


	var text = svg.selectAll("text")
		.data(dataset).enter()
		.append("text")
		.attr("x", function(d,i){ return dbs[i].x-20; })
		.attr("y", function(d,i){ return dbs[i].y+40; })
		.text(function(d){ return d.Role_refine;});

	//PATH element ---------------------------------------------------------------------------------------------

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
/*
	var pathAll = d3.selectAll("path")[0];


	for(var index = 0; index < pathAll.length; index++){
		var rowPath = pathAll[index];
		console.log(rowPath.getAttribute("d"));


// }var path = document.getElementById('foo');
	pathAll[index].setAttribute("d", vip);

	}

	// console.log(pathAll.length);
*/
	var _xx=10;
	var _reg=100;
	var _l=10;

	var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
	pathEl.setAttribute('d','M'+_l+' 100 Q 100  300 '+_l+' 500' );
	pathEl.style.stroke = 'rgb('+(_reg)+',0,0)';
	pathEl.style.strokeWidth = '5';
	pathEl.style.fill = 'none';
	$(pathEl).mousemove(function(evt){$(this).css({"strokeWidth":"3","stroke":"#ff7200"}).hide(100).show(500).css({"stroke":"#51c000"})});

	document.querySelector('svg').appendChild(pathEl);

}); // d3.tsv() - E -



function exportObject(obj, id){
	d3.select(id).html(JSON.stringify(obj, null, 4));
}



function mergeObjects(obj_a, obj_b) {

	/* 실행하는 코드 */
	// var x1 = { "a1" : 1, "c2" : 2 };
	// var x2 = { "c1" : 3, "c2" : 4 };
	var param = [obj_a, obj_b];
	var result = mergeObjectProperty(param);
	return result;

	/* 객체 합치는 메서드 */
	function mergeObjectProperty(objectArray) {
		var resultObject = {};
		for (var i = 0, length = objectArray.length; i < length; i++) {
			var object = objectArray[i];
			for (var property in object) {
				if (object.hasOwnProperty(property)) {
					resultObject[property] = object[property];
				}
			}
		}
		return resultObject;
	}
}



//  numbertocom ------------------------------ ***
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}