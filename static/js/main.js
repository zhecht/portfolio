
var CURR_TAB = "about";
var PROJ_TAB = "personal";
var SKILLS_TAB = "languages";

function getChildren(n, skipMe){
	var r = [];
	for ( ; n; n = n.nextSibling ) 
		if ( n.nodeType == 1 && n != skipMe)
			r.push( n );
	return r;
};

function getSiblings(n) {
	return getChildren(n.parentNode.firstChild, n);
}

function get_pic_showing_idx(imgs) {
	for (var i = 0; i < imgs.length; ++i) {
		if (imgs[i].style.display == "flex") {
			return i;
		}
	}
	return -1;
}

function move_pic(type, el, proj_data) {
	if (el.className === "disabled") { return; }
	var siblings = getSiblings(el);
	var i = siblings[0].tagName == "BUTTON" ? 0 : 1;
	siblings[i].className = "";
	var imgs = el.parentNode.parentNode.getElementsByClassName("pics")[0].children;
	var pic_showing_idx = get_pic_showing_idx(imgs);
	if (type == "prev" && pic_showing_idx == 1) {
		el.className = "disabled";
	} else if (type == "next" && pic_showing_idx + 2 == proj_data["pics"].length) {
		el.className = "disabled";
	}
	imgs[pic_showing_idx].style.display = "none";
	var new_idx = (type == "prev") ? pic_showing_idx - 1 : pic_showing_idx + 1;
	imgs[new_idx].style.display = "flex";
	i = (i == 0) ? 1 : 0; // flip
	siblings[i].innerText = proj_data["pics_desc"][new_idx];
}

function change_tab(el, tab) {
	tab = tab.toLowerCase();
	var siblings = getSiblings(el);
	for (var i = 0; i < siblings.length; ++i) {
		siblings[i].className = "";
	}
	el.className = "active";

	if (el.parentNode.id == "projects_nav") {
		if (PROJ_TAB) {
			document.getElementById(PROJ_TAB).style.display = "none";	
		}
		PROJ_TAB = tab;
	} else if (el.parentNode.id == "skills_nav") {
		if (SKILLS_TAB) {
			document.getElementById(SKILLS_TAB).style.display = "none";	
		}
		SKILLS_TAB = tab;
	} else {
		if (CURR_TAB) {
			document.getElementById(CURR_TAB).style.display = "none";	
		}
		CURR_TAB = tab;
	}
	document.getElementById(tab.toLowerCase()).style.display = "flex";

	if (tab == "skills" || tab == "projects") {
		var nav_el = document.getElementById(tab+"_nav");
		nav_el.style.display = "flex";
		nav_el.getElementsByTagName("button")[0].click();
	}
}

var nav = document.getElementsByClassName("nav");
for (var i = 0; i < nav.length; ++i) {
	var btns = nav[i].getElementsByTagName("button");
	for (var j = 0; j < btns.length; ++j) {
		btns[j].onclick = (function(tab) {
			return function() {
				change_tab(this, tab);
			}
		})(btns[j].innerText);
	}
}

var project_types = ["personal", "professional", "school"];

for (var t = 0; t < project_types.length; ++t) {
	var proj_el = document.getElementById(project_types[t]);
	var descriptions = proj_el.getElementsByClassName("desc");
	for (var i = 0; i < descriptions.length; ++i) {
		var btns = descriptions[i].getElementsByTagName("button");
		btns[0].className = "disabled";
		btns[0].onclick = (function(proj_data) {
			return function() {
				move_pic("prev", this, proj_data);
			}
		})(data[project_types[t]][i]);

		if (data[project_types[t]][i]["pics"].length == 1) {
			btns[1].className = "disabled";
		}
		btns[1].onclick = (function(proj_data) {
			return function() {
				move_pic("next", this, proj_data);
			}
		})(data[project_types[t]][i]);
	}
}