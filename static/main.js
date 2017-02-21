
var offsets = [0,0,0];
var types = ["qualifications_hidden","projects_hidden","resume_hidden"];

function get_offsets() {
    for (var i = 0; i < types.length; ++i) {
        var top = $('#'+types[i]).offset().top;
        offsets[i] = top;
    }
}

$(document).ready(function(){
    //console.log($('#header').height());
    $('#qualifications_hidden').css('margin-top',$('#header').height()+40);
    $('.proj').hide();
    $('#professional_0').show();
    get_offsets();
});

$(window).resize(function() {
    get_offsets();
});

$(window).bind('scroll',function(){
    var offset = $(this).scrollTop();
    //console.log(offset+','+offsets[1]);
    if (offset < (offsets[1]) - 300) {
        $('#qualifications').addClass('active').siblings().removeClass('active');
    } else if (offset < (offsets[2]) - 300) {
        $('#projects').addClass('active').siblings().removeClass('active');
    } else {
       $('#resume').addClass('active').siblings().removeClass('active'); 
    }
    //console.log(offset);
});

var onroto_pics = ["Team Home", "Transactions"];
function change_pic(which,type) {
    //which can be prev or next
    //type = {professional,school,personal}
    var proj_num = parseInt($('#curr_proj').val());
    var curr_pic = parseInt($('#curr_pic_'+type+'_'+proj_num).val());
    var tot_pics = parseInt($('#tot_pics_'+type+'_'+proj_num).val());

    var new_curr_pic = 0;
    if (which === "prev") {
        new_curr_pic = (curr_pic - 1 < 0) ? -1 : curr_pic - 1;
    } else {
        new_curr_pic = (curr_pic + 1 >= tot_pics) ? -1 : curr_pic + 1;
    }

    if (new_curr_pic === -1) {
        return;
    }

    $('.pic_'+type+'_'+proj_num+'_'+curr_pic).hide();

    if (new_curr_pic === 0) { $('#'+type+'_'+proj_num+' #proj_prev').hide(); }
    else { $('#'+type+'_'+proj_num+' #proj_prev').show(); }

    if (new_curr_pic === tot_pics - 1){ $('#'+type+'_'+proj_num+' #proj_next').hide(); }
    else { $('#'+type+'_'+proj_num+' #proj_next').show(); }

    //console.log(new_curr_pic);

    curr_pic = new_curr_pic;
    //console.log(type+'_'+proj_num+'_'+curr_pic);

    $('.pic_'+type+'_'+proj_num+'_'+curr_pic).show();
    $('#curr_pic_'+type+'_'+proj_num).val(curr_pic);
    //console.log(proj_num + "_"+curr_pic);

    var table_id = (type+'_'+proj_num);

    if ($('img.pic_'+type+'_'+proj_num+'_'+curr_pic).hasClass('mob')){
        $('.pic_'+type+'_'+proj_num+'_'+curr_pic+' .img_desc,#'+table_id+' #proj_next,#'+table_id+' #proj_prev').addClass('mob');
    } else {
        $('.pic_'+type+'_'+proj_num+'_'+curr_pic+' .img_desc,#'+table_id+' #proj_next,#'+table_id+' #proj_prev').removeClass('mob');
    }
    $('#curr_pic_'+type+'_'+proj_num).val(curr_pic);

}

$('a').click(function(e){
    //console.log($(this).text());
    if ($(this).text() !== "LinkedIn Profile" && $(this).text() !== "GitHub Profile" && $(this).text() !== "Onroto Fantasy Sports") {
        e.preventDefault();    
    }
    
});
/*

*/
var team_pos = 'def';
function click_link(link) {
    $('#'+link).addClass('active').siblings().removeClass('active');
    if (link === "school" || link === "professional" || link === "personal") {
        //$('#'+link).css('text-decoration','underline').siblings().css('text-decoration','none');
        //$('#projects_title').text(link+" Projects");
        $('.proj').hide();
        $('#'+link+'_0').fadeIn(1000);
        $('#curr_type').val(link);
        $('#curr_proj').val(0);
        $('#proj_nav .prev').hide();
        $('#proj_nav .next').show();
        return;
    }
    window.location = '#'+link+'_hidden';
}
function move_html(id_in) {
    var top_bot = (id_in === "change_teams") ? "bottom" : "top";
    var top_bot_per = (id_in === "change_teams") ? "10%" : "3%";
    $('#'+id_in).css({
        'transition': 'opacity 500ms ease-in',
        '-ms-transition': 'opacity 500ms ease-in',
        '-moz-transition': 'opacity 500ms ease-in',
        '-webkit-transition': 'opacity 500ms ease-in',
        'bottom':'10%'
    });
    if (id_in === "name_div") {
        $('#'+id_in).css({
            'padding-left':'3%',
            'width':'97%',
            'text-align':'left',
            'bottom':'0%',
            'top':'3%'
        });
        $('#name_div span').css('font-size','3em');
    }


}

function change_proj(which) {
    //which is next or prev
    var type = $('#curr_type').val();
    var curr_proj = parseInt($('#curr_proj').val());
    var tot_size = parseInt($('#'+type+'_tot').val());

    var new_curr_proj = 0;
    if (which === "prev") {
        new_curr_proj = (curr_proj - 1 < 0) ? -1 : curr_proj - 1;
    } else {
        new_curr_proj = (curr_proj + 1 >= tot_size) ? -1 : curr_proj + 1;
    }

    if (new_curr_proj === -1) {
        return;
    }

    if (new_curr_proj === 0) { $('#proj_nav .prev').hide(); }
    else { $('#proj_nav .prev').show(); }

    if (new_curr_proj === tot_size - 1){ $('#proj_nav .next').hide(); }
    else { $('#proj_nav .next').show(); }

    $('#'+type+'_'+curr_proj).hide('slide',{direction:'left'});
    setTimeout(function() {
        $('#'+type+'_'+new_curr_proj).show('slide',{direction:'right'});
    },400);

    $('#curr_proj').val(new_curr_proj);
}



function changePage(page) {
	'use strict';
	var page_ = localStorage.getItem("page");


	if (page_ === page) {
		return;
	}
	else if (page_ === "home") {
		$('#profile').hide();
	}

	$('#c2').remove();

	$('#'+page_).hide();
	$('#'+page+"Btn").addClass("active").siblings().removeClass("active");
	$('#'+page).fadeIn(700);

	if (page === "home") {
		$('#profile').fadeIn(800);
	}
	else if (page === "projects") {
		$('body').append("<div class='container' id='c2'><svg viewBox='0 0 500 500' preserveAspectRatio='xMinYMin meet' ><path d='M0,100 C250,200 350,-30 500,100 L500,00 L0,0 Z' style='stroke:none; fill:#1cabe8;'></path></svg></div>");
	} else {
		$('#c2').hide();
	}
	localStorage.setItem("page", page);

}

