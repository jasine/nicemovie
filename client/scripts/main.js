/* global add_form */
/// <reference path="../../typings/jquery/jquery.d.ts"/>
'use strict';

function adjustFooter(params) {
	var docHeight = $(window).height();
    var footerHeight = $('footer').height();

    if ($('footer').position() !== undefined) {
        var footerTop = $('footer').position().top + footerHeight;
        if (footerTop < docHeight) {
            $('footer').css('margin-top', 10 + (docHeight - footerTop) + 'px');
        }
    }
}

function showCurrentPage() {
	var index = -1;
	var page = location.pathname.split('/')[1];
	switch (page) {
		case '':
			index = 0;
			break;
		case 'list':
			index = 1;
			break;
		case 'about':
			index = 2;
			break;
	}
	if (index > -1) {
		$('#nav-addr li').eq(index).addClass('active');
	}

}

function backToTop(params) {
	$(window).scroll(function () {
		if ($(window).scrollTop() > 100) {
			$('#back-to-top').fadeIn(1500);
		}
		else {
			$('#back-to-top').fadeOut(1500);
		}
	});  
  
	//当点击跳转链接后，回到页面顶部位置  
  
	$('#back-to-top').click(function () {
		$('body,html').animate({ scrollTop: 0 }, 1000);
		return false;
	});
}

//ready
(function () {

	adjustFooter();
	showCurrentPage();
	backToTop();
	
	$('#mv-img').fileinput({
		showUpload:false, 
		previewFileType:'any',
		browseLabel: '浏览...', 'removeLabel': '删除',
		initialPreviewShowDelete:false,
		allowedFileTypes:['image'],
		maxFileCount:1,
		msgInvalidFileType:'只能上传图片文件',
		msgSelected:'当前图片'
	});
	
	$('#mv-head').fileinput({
		showUpload:false, 
		previewFileType:'any',
		browseLabel: '上传头像.', 'removeLabel': '删除',
		initialPreviewShowDelete:false,
		allowedFileTypes:['image'],
		maxFileCount:1,
		msgInvalidFileType:'只能上传图片文件',
		msgSelected:'当前图片',
		//browseClass:'upload'
	});
})();




var updating_row;

$('#add_form').submit(function () {
	var data = new FormData(document.getElementById('add_form'));
	jQuery.each(jQuery('#mv-img')[0].files, function (i, file) {
		data.append('uploadPoster' + i, file);
	});
	$.ajax(
		{
			type: 'POST',
			url: '/admin/movie',
			//data: $(this).serialize(),
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			success: function (back) {
				if (back.result === 'ok') {
					if ($('#mv-id').val() !== '') {
						updating_row.remove();
					}
					$('#movie_list tr:eq(0)').after('<tr><td>' +
						$('#mv-title').val() + '</td><td>' +
						$('#mv-directer').val() + '</td><td>' +
						$('#mv-country').val() + '</td><td>' +
						$('#mv-date').val() + '</td><td><a role="button" data-toggle="modal" data-target="#add_new" class="btn-sm btn-info" href="#" onClick="update_panel(\'' +
						back._id + '\',this)">编辑</a></td><td><a role="button" class="btn-sm btn-danger" href="#" onClick="del_movie(\'' +
						back._id + '\',this)">删除</a></td></tr>');

				}
			},
			err: function (err) {
				console.log(err);
			}
		});
	return false;
});

function del_movie(id, a) {
	console.log(id);
	$.ajax(
		{
			type: 'DELETE',
			url: '/admin/movie/' + id
		})
		.done(function (data) {
			if (data.result === 'ok') {
				$(a).parent().parent().remove();
			}
			else {
				console.log(data.result);
			}
		});
	return false;
}

function update_panel(id, a) {
	$('#op-title').text('编辑电影');
	$('#search-db').empty();
	$.ajax({
		type: 'GET',
		url: '/admin/movie/' + id,
		success: function (data) {
			$('#mv-id').val(data.movie._id);
			$('#mv-title').val(data.movie._title);
			$('#mv-directer').val(data.movie._directer);
			$('#mv-country').val(data.movie._country);
			//$('#mv-date').datepicker('setDate', new Date(data.movie._date));
			$('#mv-date').val(data.movie._date);
			$('#mv-img').fileinput('refresh', {initialPreview: [
			    '<img src="'+data.movie._img+'" class="file-preview-image" alt="poster" title="Desert">'
			]
			// initialPreviewConfig: [{
			//         caption: '海报',
			//         //width: '120px',
			//         //url: '/localhost/avatar/delete',
			//         // key: 100,
			//         // extra: {id: 100}
			//     }			    
			// ],
			});

			//$('#mv-img').val(data.movie._img);
			$('#mv-summary').val(data.movie._summary);
			$('#mv-desp').val(data.movie._desp);
			updating_row = $(a).parent().parent();
		}
	});
	return false;
}

function onAddNew() {
	add_form.reset();
	$('#op-title').text('添加电影');
	$('#mv-id').val('');
}

$(window).resize(function () { 
	// console.log($("#carousel_item").height());         //当浏览器大小变化时
	// $("#myCarousel").height($("#topimg").height());
	//    $(".carousel .item").height($("#topimg").height());
});