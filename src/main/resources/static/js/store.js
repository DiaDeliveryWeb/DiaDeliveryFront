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

// 가게 등록
function doStoreSave() {
    var store = {
        name: "",
        category: "",
        introduction: "",
        imageUrl: "",
        productList: []
    };

    if ($('#st_name').val() == "") {
        alert("가게명을 입력하세요.");
        return false;
    }
    if ($('#st_category').val() == "") {
        alert("카테고리를 입력하세요.");
        return false;
    }
    if ($('#st_introduction').val() == "") {
        alert("가게 소개를 입력하세요.");
        return false;
    }

    //FormData 새로운 객체 생성
    var formData = new FormData();

    // file input class 값
    var storeFileInput = $('#AddImgs');

    store.name = $('#st_name').val();
    store.category = $('#st_category').val();
    store.introduction = $('#st_introduction').val();

    for (var i = 0; i < storeFileInput.length; i++) {
        if (storeFileInput[i].files.length > 0) {
            // formData에 'storeImage'이라는 키값으로 storeFileInput 값을 append 시킨다.
            for (var j = 0; j < storeFileInput[i].files.length; j++) {
                // formData에 'file'이라는 키값으로 storeFileInput 값을 append 시킨다.
                formData.append('storeImage', storeFileInput[i].files[j]);
            }
        }
    }
    var exit = false;
    
    $('#tbProductList tr').each(function() {
        var product = {
            imageUrl: "",
            productName: "",
            price: 0,
            description: ""
        };
        var tr = $(this);
        var td = tr.children();


        if (td.eq(2).find('input').val() == "") {
            alert('상품명을 입력하세요.');
            exit = true;
            return false;
        }
        if (td.eq(3).find('input').val() == "" || isNaN(td.eq(3).find('input').val())) {
            alert('숫자 형식으로 가격을 입력하세요.');
            exit = true;
            return false;
        }
        if (td.eq(4).find('input').val() == "") {
            alert('설명을 입력하세요.');
            exit = true;
            return false;
        }

        product.productName = td.eq(2).find('input').val(); // 상품명
        product.price = td.eq(3).find('input').val(); // 가격
        product.description = td.eq(4).find('input').val(); // 설명
        product.imageUrl = "/";
        store.productList.push(product);
    });

    if (exit) {
        return false;
    }

    // 요청 데이터 전달
    formData.append('requestDto', new Blob([ JSON.stringify(store) ], {type : "application/json"}));
    
    // file input class 값
    var productFileInput = $('[data-file-type="products-upload"]');
    // fileInput 개수를 구한다.
    for (var i = 0; i < productFileInput.length; i++) {
        if (productFileInput[i].files.length > 0) {
            for (var j = 0; j < productFileInput[i].files.length; j++) {
                // console.log(" productFileInput[i].files[j] :::"+ productFileInput[i].files[j]);

                // formData에 'file'이라는 키값으로 fileInput 값을 append 시킨다.
                formData.append('productsImage', productFileInput[i].files[j]);
            }
        }
    }
    
    $.ajax({
        type: "POST",
        url: (otherHost  + `/stores`),
        data: formData,
        contentType: false,               // * 중요 *
        processData: false,               // * 중요 *
        enctype : 'multipart/form-data'  // * 중요 *
    })
        .done(function (res, status, xhr) {
            alert("저장에 성공하였습니다.");
            window.location.href = host;
        })
        .fail(function (res, jqXHR, textStatus) {
            alert(res.responseJSON.msg);
        });

}

// 이전페이지로 돌아감
function onCancel() {
    location.href = host;
    return;
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