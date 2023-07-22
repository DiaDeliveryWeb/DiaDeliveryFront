$(document).ready(function () {
    // 행추가
    $('.qty_plus').click(function(e){
        e.preventDefault();
        rowAdd();
    });
    // 행 삭제
    $(".qty_minus").click(function(e) {
        e.preventDefault();
        rowDelete();
    });
});

function deleteStore() {
    let name = $("#hd_my_store_name").val()
    let data = {"name": name};
    $.ajax({
        type: 'DELETE',
        url: otherHost + `/stores?name=${name}`,
        success: function (data, statusText, jqXHR) {
            alert(data.msg);
            window.location.href = host + '/stores/mystoreslist';
        },
        error: function (xhr, error, msg) {
            alert(xhr.responseJSON.errorMsg);
            window.location.reload();
        }
    })
}
function updateStore() {

}
function getStoreDetail() {
    let myStoreName = $('#hd_my_store_name').val();
    $.ajax({
        type: 'GET',
        url:(otherHost+"/store"),
        data: JSON.stringify({name: myStoreName}),
        contentType: 'application/json',
    })
        .done(function (res, status, xhr) {
            if(res!=null) {
                let productList = res.productResponseDtoList;
                console.log(productList);
                /*for (let i = 0; i < productList.length; i++) {
                    let itemDto = productResponseDtoList[i];
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
                }*/
            } else {
                alert('조회에 실패하였습니다. 관리자에게 문의하세요.');
            }
        })
        .fail(function (jqXHR, textStatus) {
            alert('조회에 실패하였습니다. 관리자에게 문의하세요.');
        });


}


// 행 추가
function rowAdd() {
    var trCnt = $('#tbProductList tr').length;
    if (trCnt < 5) {
        var innerHtml = "";
        const tmpId = "AddImgs_" + (trCnt + 1);
        const tmpPreviewId = "Preview_" + (trCnt + 1);
        innerHtml += '<tr style="font-size:12px; font-weight:400;">';
        innerHtml += '<td style="text-align:center;">' + (trCnt + 1) + '</td>';
        innerHtml += '<td>' + '<div class="fileBox clearfix">';
        innerHtml += '<div class="inputFile">';
        innerHtml += '<label for="' + tmpId + '" class="addImgBtn">' + "+";
        innerHtml += '</label>'
        innerHtml += '<input type="file" id="' + tmpId +'" class="upload-hidden" data-file-type="products-upload" accept=".jpg, .png, .gif" multiple />'
        innerHtml += '<ul id="'+ tmpPreviewId + '" class="sortable"></ul>'
        innerHtml += '</div>';
        innerHtml += '</div>' + '</td>';
        innerHtml += '<td><input type="text" name="productName" placeholder="상품이름"></td>';
        innerHtml += '<td><input type="text" name="price" placeholder="가격"></td>';
        innerHtml += '<td><input type="text" name="description" placeholder="설명"></td>';
        innerHtml += '</tr>';

        $('#products_table > tbody:last').append(innerHtml);
    } else {
        alert("최대 5개까지만 가능합니다.");
        return false;
    }
}

// 행 삭제
function rowDelete() {
    var trCnt = $('#tbProductList tr').length;
    if (trCnt > 1) {
        $('#products_table > tbody:last > tr:last').remove();
    } else {
        return false;
    }
}