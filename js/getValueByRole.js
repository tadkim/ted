/**
 * Created by admin on 2016. 4. 27..
 */


//shp별 기본 값 ------------------------------------------------------------
var default_sv = {
	explorer: {m:1.362, n1:1.362, n2:9.237, n3:5.938, a:-0.9625, b:1.025},
	art: {m:12.01, n1:17.15, n2:2.975, n3:3.650, a:1.025, b:-0.2875},
	management: {m:-2.537, n1:407.1, n2:603.1, n3:936.3, a:1.287, b:0.5375},
	media: {m: 3, n1: 1, n2: 6, n3: 2, a: .6, b: 1},
	vip: {m: 4, n1: 2, n2: 2, n3: 2, a: 1, b: 1},
	public: {m: 6, n1: .3, n2: 0, n3: 10, a: 1, b: 1},
	humanist: {m: 8, n1: 10, n2: -1, n3: -8, a: 1, b: 1},
	science: {m: 8, n1: 1.3, n2: .01, n3: 8, a: 1, b: 1},
	profession: {m:4, n1:632.5, n2:421.8, n3:100, a:2, b:1}
}

// m ========================================================
function setParameter_m(data_row) {
	var currentRole_nm = data_row.Role_refine.toLowerCase();
	var result_m;

	switch (currentRole_nm) {
		case "art":
			result_m = default_sv.art.m;
			break;
		case "media":
			result_m = default_sv.media.m;
			break;
		case "management":
			result_m = default_sv.management.m;
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
			return result_m;
	}
}

// m ========================================================
function setParameter_n1(data_row) {
	var currentRole_nm = data_row.Role_refine.toLowerCase();
	var result_n1;

	switch (currentRole_nm) {
		case "art":
			result_n1 = default_sv.art.n1;
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
			result_n1 = default_sv.humanist.n1;
			break;
		case "profession":
			result_n1 = default_sv.profession.n1;
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
			return result_n1;
	}
}

function setParameter_n2(data_row) {
	var currentRole_nm = data_row.Role_refine.toLowerCase();
	var result_n2;

	switch (currentRole_nm) {
		case "art":
			result_n2 = default_sv.art.n2;
			break;
		case "media":
			result_n2 = default_sv.media.n2;
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
			result_n2 = default_sv.profession.n2;
			break;
		case "explorer":
			result_n2 = default_sv.explorer.n2;
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
			return result_n2;
	}
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
			return result_n3;
	}
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
			result_a = default_sv.management.a;
			break;
		case "public":
			result_a = default_sv.public.a;
			break;
		case "humanist":
			result_a = default_sv.humanist.a;
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
			return result_a;
	}
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
			result_b = default_sv.explorer.b;
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
			return result_b;
	}
}


