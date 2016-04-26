/**
 * Created by admin on 2016. 4. 24..
 */

//SVG area init
var svgWidth = 900, svgHeight = 3560;
var margin = { top:30, right:30, bottom:30, left:30 };

//Scale of View
var xScale = d3.scale.linear().range([0, svgWidth]);
var yScale = d3.scale.linear() .range([0, svgHeight]);

//Scale of Color
var colorScale = d3.scale.linear().range([100, 255]);

//Scale of Shape
var rectScale = d3.scale.linear().domain([0, 38000000]).range([20, 500]);

//Create SVG element
var svg = d3.select("body").append("svg").attr("width", svgWidth).attr("height", svgHeight);

//shape요소의 w, h (for test)
var rectW = 14, rectH = 10;
var rectR = { w:2, h:2 };

//shape요소의 시작 기준점(좌측 상단을 0,0으로 기준)
var xPos  = margin.left, yPos = margin.top;

//shape요소 간 간격
var xGap = 12, yGap = 10;



var colorThreshold = d3.scale.threshold()
	.domain([0, 2000, 4000, 6000, 10000])
	.range(["#D4EAFD","#90C6FA","#4BA1F7","#3D94E0","#3E93C8"]);

d3.tsv("data/ted0.2.tsv", function (error, dataset) {
	if(error){ console.log("load data error!"); }
//        console.log(dataset);


	//Scale domain set
	xScale.domain([0, 2187]);
	yScale.domain([0, 39000000]);
	colorScale.domain([0, 9140]);


	//Data Type declare
	dataset.forEach(function(d) {
		// var views = d.TOTAL_VIEWS.replaceAll(',', 'ss');
		var views =  d.TOTAL_VIEWS.replace(/,/gi, ''); // 뒤에 gi 를 붙이면 replaceAll 과 같은 결과를 볼 수 있음.
		d.TOTAL_VIEWS = +views; // 데이터 타입을 문자열에서 숫자로 강제
		d.Beautiful = +d.Beautiful; // 데이터 타입을 문자열에서 숫자로 강제

		/*
		만약 표현 첫 줄의 표현요소가 xPos의 끝에 다다르면 x위치와 y위치를 다시 세팅한다.
		 - x 는 시작점으로
		 - y 는 다음줄로
		 */

		rectH = rectScale(d.TOTAL_VIEWS);

		xPos = xPos + (xGap+rectW);

		if(xPos >= (svgWidth-margin.right) ){
			xPos = margin.left;
			yPos = yPos + (yGap+rectH);
		}
		// 계산한 x, yPos의 데이터 객체 안에 저장
		d.xPos = xPos;
		d.yPos = yPos;

	});


	//Shape test 1 - RECT
	var rect = svg.selectAll("rect")
		.data(dataset).enter()
		.append("rect")

		.attr("x", function(d){  return d.xPos; })
		.attr("y", function(d){ return d.yPos;  })
		.attr("width", rectW) //default
		// .attr("height", rectH) //default
		// .attr("width", function(d){ return rectScale(d.TOTAL_VIEWS);})
		.attr("height", rectH)
		.attr("rx", rectR.w)
		.attr("ry", rectR.h)
		//                .attr("height", function(d){ return rectScale(d.TOTAL_VIEWS); })
		.attr("fill", function(d) {
//                    var colorByData = "rgb(0, 0, " + Math.round( colorScale(d.Beautiful)) + ")";
//                    return "rgb(0, 0, " + Math.round( colorScale(d.Beautiful)) + ")";
			return colorThreshold(d.Beautiful);
		})
		.on("mouseover", function(d){
			//선택 요소 색상 변경
			d3.select(this).attr("fill", "aqua");

			//선택에 따른 사용가능한 정보 출력(for test)
			console.log(d);
			console.log(d3.select(this));
			console.log(this);
			//현재 선택한 요소 객체
			var thisEl = {
				name : d.NAME,
				title:d.TITLE,
				days:d.DAYS,
				duration:d.DRURATION,
				totalViews:d.TOTAL_VIEWS,
				role : d.ROLE
			};

			d3.select("#tooltip").select(".tooltip_v1").text(thisEl.name); //강연자 이름
			d3.select("#tooltip").select(".tooltip_v2").text(thisEl.title); //강연 제목
			d3.select("#tooltip").select(".tooltip_v3").text(thisEl.totalViews); //강연자 직업

			// 툴팁 숨김 해제
			d3.select("#tooltip").classed("hidden", false);

		})
		.on("mouseout", function(d){
			d3.select(this).attr("fill", function(d){ return colorThreshold(d.Beautiful); });

			// 툴팁 숨김 적용
			d3.select("#tooltip").classed("hidden", true);
		});


}); // d3.tsv() - E -

