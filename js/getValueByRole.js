/**
 * Created by admin on 2016. 4. 27..
 */


//shp별 기본 값 ------------------------------------------------------------
var default_sv = {
	explorer: {m:1.362, n1:1.362, n2:9.237, n3:5.938, a:-0.9625, b:1.025},
	art: {m:6.612, n1:5.487, n2:2.337, n3:14.26, a:1.775, b:1.362},
	management: {m:-2.537, n1:407.1, n2:603.1, n3:936.3, a:1.287, b:0.5375},
	media: {m:0.6875, n1:0.3500, n2:2.825, n3:8.863, a:-3.625, b:-1.675},
	vip: {m: 4, n1: 2, n2: 2, n3: 2, a: 1, b: 1},
	public: {m: 6, n1: .3, n2: 0, n3: 10, a: 1, b: 1},
	humanist: {m: 8, n1: 10, n2: -1, n3: -8, a: 1, b: 1},
	science: {m: 8, n1: 1.3, n2: .01, n3: 8, a: 1, b: 1},
	profession: {m:4, n1:632.5, n2:421.8, n3:100, a:2, b:1},
	religion: {m:4, n1:632.5, n2:421.8, n3:100, a:2, b:1}
};

// m ========================================================
function setParameter_m(d) {
	var currentRole_nm = d.Role_refine.toLowerCase();
	var result_m;

	switch (currentRole_nm) {
		case "art":
			result_m = default_sv.art.m;
			break;
		case "media":
			result_m = default_sv.media.m;
			break;
		case "management":
			result_m = getParam_management(d.TOTAL_VIEWS).valueM;
			break;
		case "public":
			result_m = default_sv.public.m;
			break;
		case "humanist":
			result_m = default_sv.humanist.m;
			break;
		case "profession":
			result_m = default_sv.profession.m;
			break;
		case "explorer":
			result_m = default_sv.explorer.m;
			break;
		case "religion":
			result_m = default_sv.religion.m;
			break;
		case "science":
			result_m = default_sv.science.m;
			break;
		case "vip":
			result_m = default_sv.vip.m;
			break;
		default:
			result_m = default_sv.art.m;
			break;
	}
	return result_m;
}
function setParameter_n1(data_row) {
	var currentRole_nm = data_row.Role_refine.toLowerCase();
	var result_n1;

	switch (currentRole_nm) {
		case "art":
			result_n1 = getParam_art(data_row.TOTAL_VIEWS).valueN1;
			break;
		case "media":
			result_n1 = default_sv.media.n1;
			break;
		case "management":
			result_n1 = default_sv.management.n1;
			break;
		case "public":
			result_n1 = default_sv.public.n1;
			break;
		case "humanist":
			result_n1 = getParam_humanist(data_row.TOTAL_VIEWS).valueN1;
			break;
		case "profession":
			result_n1 = getParam_profession(data_row.TOTAL_VIEWS).valueN1;
			break;
		case "explorer":
			result_n1 = default_sv.explorer.n1;
			break;
		case "religion":
			result_n1 = default_sv.religion.n1;
			break;
		case "science":
			result_n1 = default_sv.science.n1;
			break;
		case "vip":
			result_n1 = default_sv.vip.n1;
			break;
		default:
			result_n1 = default_sv.art.n1;
			break;

	}
	return result_n1;
}
function setParameter_n2(data_row) {
	var currentRole_nm = data_row.Role_refine.toLowerCase();
	var result_n2;

	switch (currentRole_nm) {
		case "art":
			result_n2 = default_sv.art.n2;
			break;
		case "media":
			result_n2 = getParam_media(data_row.TOTAL_VIEWS).valueN2;
			break;
		case "management":
			result_n2 = default_sv.management.n2;
			break;
		case "public":
			result_n2 = default_sv.public.n2;
			break;
		case "humanist":
			result_n2 = default_sv.humanist.n2;
			break;
		case "profession":
			result_n2 = getParam_profession(data_row.TOTAL_VIEWS).valueN2;
			break;
		case "explorer":
			result_n2 = getParam_explorer(data_row.TOTAL_VIEWS).valueB;
			break;
		case "religion":
			result_n2 = default_sv.religion.n2;
			break;
		case "science":
			result_n2 = default_sv.science.n2;
			break;
		case "vip":
			result_n2 = default_sv.vip.n2;
			break;
		default:
			result_n2 = default_sv.art.n2;
			break;

	}
	return result_n2;
}
function setParameter_n3(data_row) {
	var currentRole_nm = data_row.Role_refine.toLowerCase();
	var result_n3;

	switch (currentRole_nm) {
		case "art":
			result_n3 = default_sv.art.n3;
			break;
		case "media":
			result_n3 = default_sv.media.n3;
			break;
		case "management":
			result_n3 = default_sv.management.n3;
			break;
		case "public":
			result_n3 = default_sv.public.n3;
			break;
		case "humanist":
			result_n3 = default_sv.humanist.n3;
			break;
		case "profession":
			result_n3 = default_sv.profession.n3;
			break;
		case "explorer":
			result_n3 = default_sv.explorer.n3;
			break;
		case "religion":
			result_n3 = default_sv.religion.n3;
			break;
		case "science":
			result_n3 = default_sv.science.n3;
			break;
		case "vip":
			result_n3 = default_sv.vip.n3;
			break;
		default:
			result_n3 = default_sv.art.n3;
			break;

	}
	return result_n3;
}
function setParameter_a(data_row) {
	var currentRole_nm = data_row.Role_refine.toLowerCase();
	var result_a;

	switch (currentRole_nm) {
		case "art":
			result_a = default_sv.art.a;
			break;
		case "media":
			result_a = default_sv.media.a;
			break;
		case "management":
			result_a = getParam_management(data_row.TOTAL_VIEWS).valueA;
			break;
		case "public":
			result_a = default_sv.public.a;
			break;
		case "humanist":
			result_a = getParam_humanist(data_row.TOTAL_VIEWS).valueA;
			break;
		case "profession":
			result_a = default_sv.profession.a;
			break;
		case "explorer":
			result_a = default_sv.explorer.a;
			break;
		case "religion":
			result_a = default_sv.religion.a;
			break;
		case "science":
			result_a = default_sv.science.a;
			break;
		case "vip":
			result_a = default_sv.vip.a;
			break;
		default:
			result_a = default_sv.art.a;
			break;

	}
	return result_a;
}
function setParameter_b(data_row) {
	var currentRole_nm = data_row.Role_refine.toLowerCase();
	var result_b;

	switch (currentRole_nm) {
		case "art":
			result_b = default_sv.art.b;
			break;
		case "media":
			result_b = default_sv.media.b;
			break;
		case "management":
			result_b = default_sv.management.b;
			break;
		case "public":
			result_b = default_sv.public.b;
			break;
		case "humanist":
			result_b = default_sv.humanist.b;
			break;
		case "profession":
			result_b = default_sv.profession.b;
			break;
		case "explorer":
			result_b = getParam_explorer(data_row.TOTAL_VIEWS).valueA;
			break;
		case "religion":
			result_b = default_sv.religion.b;
			break;
		case "science":
			result_b = default_sv.science.b;
			break;
		case "vip":
			result_b = default_sv.vip.b;
			break;
		default:
			result_b = default_sv.art.b;
			break;

	}
	return result_b;
}



function getParam_art(mv){
	// art: {m:6.612, n1:5.487, n2:2.337, n3:14.26, a:1.775, b:1.362},
	//n1, 3.313, 6.2
	var result = {};

	var scale_n1 = d3.scale.linear().domain([0, 39000000]).range([3.313, 6.2]);
	var scale_n1_value = scale_n1(mv);

	result.nameN1 = "n1";
	result.valueN1= scale_n1_value;

	return result;
}
function getParam_explorer(mv){
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
function getParam_management(mv){

	var result = {};
	var scale_m = d3.scale.linear().domain([0, 39000000]).range([-2.987, -2.537]);
	var scale_a = d3.scale.linear().domain([0, 39000000]);
	var scale_m_value = scale_m(mv);
	var a_min = ((1000*scale_m_value) + 4487)/3000;
	var a_max = ((4000*scale_m_value)+38948) / 9000;

	scale_a.range([a_min, a_max]);
	var scale_a_value = scale_a(mv);

	result.nameM = "m";
	result.nameA = "a";
	result.valueM = scale_m_value;
	result.valueA= scale_a_value;

	return result;
}
function getParam_media(mv){
	// media: {m:0.6875, n1:0.3500, n2:2.825, n3:8.863, a:-3.625, b:-1.675},
	var result = {};
	var scale_n2 = d3.scale.linear().domain([0, 39000000]).range([1.4, 5]);//n2, 1.4, 5
	var scale_n2_value = scale_n2(mv);
	result.nameN2 = "n2";
	result.valueN2= scale_n2_value;
	return result;
}
function getParam_profession(mv){
	var result = {};
	var scale_n1 = d3.scale.linear().domain([0, 39000000]).range([300, 670]); //n1, 300, 670
	var scale_n2 = d3.scale.linear().domain([0, 39000000]);
	var scale_n1_value = scale_n1(mv);
	var n2_min = ((8*scale_n1_value) + 9440)/37;
	var n2_max = ((5*scale_n1_value)+18850) /37;

	scale_n2.range([n2_min, n2_max]);
	var scale_n2_value = scale_n2(mv);

	result.nameM = "n1";
	result.nameA = "n2";
	result.valueM = scale_n1_value;
	result.valueA= scale_n2_value;

	return result;
}
function getParam_humanist(mv){
	// humanist: {m:1.915, n1:39.60, n2:113.1, n3:19.18, a:1.250, b:0.5375},

//n1, 24.9, (224*a+281)/6

	var result = {};
	var scale_a = d3.scale.linear().domain([0, 39000000]).range([0.9875, 1.250]); //a, 0.9875, 1.250
	var scale_n1 = d3.scale.linear().domain([0, 39000000]);
	var scale_a_value = scale_a(mv);
	var n1_min = ((8*scale_a_value) + 9440)/37;
	var n1_max = ((224*scale_a_value)+281) /6;

	scale_n1.range([n1_min, n1_max]);
	var scale_n1_value = scale_n1(mv);

	result.nameA = "a";
	result.nameN1 = "n1";
	result.valueA = scale_a_value;
	result.valueN1= scale_n1_value;

	return result;
}



