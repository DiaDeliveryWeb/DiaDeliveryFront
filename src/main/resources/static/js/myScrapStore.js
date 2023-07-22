$(document).ready(function () {
    getMyScrapStoreList();
});

// 나의 가게 목록 조회
function getMyScrapStoreList() {

    $.ajax({
        type: 'GET',
        url:(otherHost+"/stores/scrap"),
        // data: JSON.stringify({auth: auth}),
        contentType: 'application/json',
    })
        .done(function (res, status, xhr) {
            if(Array.isArray(res)) {
                for (let i = 0; i < res.length; i++) {
                    let itemDto = res[i];
                    var stname = itemDto.name;
                    var introduction = itemDto.introduction;
                    var imageUrl = itemDto.imageUrl;
                    var category = itemDto.category;
                    var storeRowId = "my_store_row_" + (i+1);
                    var storeImgId = "my_store_img_" + (i+1);
                    var storeNameId = "my_store_name_" + (i+1);
                    var innerHtml = "";
                    innerHtml += '<tr id="'+storeRowId +'" style="font-size:12px; font-weight:400;">';
                    innerHtml += '<td><img id="'+storeImgId +'" src="'+imageUrl+'" alt="이미지 없음" style="width:150px;height:150px;cursor: pointer;"></td>';
                    innerHtml += '<td id="'+storeNameId +'">'+ stname +'</td>';
                    innerHtml += '<td>'+ category +'</td>';
                    innerHtml += '<td>'+ introduction +'</td>';
                    innerHtml += '</tr>';
                    $('#tbMyStoreList').append(innerHtml);
                }
            }
        })
        .fail(function (jqXHR, textStatus) {
            alert('조회에 실패하였습니다. 관리자에게 문의하세요.');
        });

}


$(document).on('click', "[id^='my_store_img_']", function (e) {
    var thisId = $(this).attr("id");
    var thisNameId = "my_store_name_" + thisId.replace('my_store_img_', '');
    var storeName = $('#' + thisNameId).text();

    window.location.href = host + '/orders/save?name='+storeName;
});