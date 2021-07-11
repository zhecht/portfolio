
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
		}
		PROJ_TAB = tab;
	} else if (el.parentNode.id == "skills_nav") {
		if (SKILLS_TAB) {
			document.getElementById(SKILLS_TAB).style.display = "none";	
		}
		SKILLS_TAB = tab;
	} else {
		if (CURR_TAB) {
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

const btns = document.querySelector("#nav").getElementsByTagName("button");
for (btn of btns) {
	btn.onclick = function(event) {
		const activeBtn = document.querySelector("#nav button.active");
		document.getElementById(activeBtn.innerText.toLowerCase()).style.display = "none";
		activeBtn.classList.remove("active");
		this.classList.add("active");

		const clickedDiv = document.getElementById(this.innerText.toLowerCase());
		clickedDiv.style.display = "flex";
		// scroll to top of page
		clickedDiv.scrollTo(0,0);
	}
}

var project_types = ["personal", "professional"];

let slideIndexes = {};
for (const project of document.getElementsByClassName("project")) {
	const title = project.id;
	slideIndexes[title] = 1;
	showSlides(title, 1);
}

function plusSlides(el, n) {
	showSlides(el.parentNode.id, slideIndexes[el.parentNode.id] += n);
}

function currentSlide(title, n) {
	showSlides(title, slideIndexes[title] = n);
}

function showSlides(projTitle, n) {
	const projEl = document.getElementById(projTitle);
	let i;
	let slides = projEl.getElementsByClassName("slides");
	let dots = projEl.getElementsByClassName("miniPic");
	let captionText = projEl.getElementsByClassName("caption")[0];
	if (n > slides.length) { slideIndexes[projTitle] = 1 }
	if (n < 1) { slideIndexes[projTitle] = slides.length }
	for (i = 0; i < slides.length; i++) {
	  slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
	  dots[i].classList.remove("active");
	}
	slides[slideIndexes[projTitle]-1].style.display = "block";
	dots[slideIndexes[projTitle]-1].classList.add("active");
	captionText.innerText = dots[slideIndexes[projTitle]-1].querySelector("img").alt;
}