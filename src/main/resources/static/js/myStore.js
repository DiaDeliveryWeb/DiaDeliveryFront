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

    // 파일 선택 이벤트 핸들러
    $("#image").on("change", function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $("#preview-image").attr("src", e.target.result);
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    $(".product-image").on("change", function () {
        const productId = $(this).data("product-id");
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $("#product-preview" + productId).attr("src", e.target.result);
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function updateStore() {
    let name = $("#hd_my_store_name").val()
    let formData = new FormData();
    let image = $("#image")[0].files[0];
    let requestDto = {
        name:  $("#st_name").val(),
        introduction: $("#st_introduction").val(),
        category: $("#st_category").val()
    };
    formData.append("image", image);
    formData.append('requestDto', new Blob([ JSON.stringify(requestDto) ], { type : "application/json" }));

    $.ajax({
        type: 'PUT',
        url: otherHost + `/stores?name=${name}`,
        data: formData,
        processData: false,
        contentType: false,
        enctype : 'multipart/form-data',  // * 중요 *
        success: function (data, statusText, jqXHR) {
            alert("가게수정 완료");
            window.location.href = host + '/stores/mystoreslist';
        },
        error: function (xhr, error, msg) {
            alert(xhr.responseJSON.errorMsg);
            window.location.href = host + '/stores/mystoreslist';
        }
    })
}

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
            window.location.href = host + '/stores/mystoreslist';
        }
    })
}

function updateProduct(id){
    let formData = new FormData();
    let productName = $("#product-name" + id).val()
    let price = $("#product-price" + id).val()
    let description = $("#product-description" + id).val()
    let image = $("#product-image" + id)[0].files[0];
    let requestDto = {
        productName:  productName,
        price: price,
        description: description
    };
    console.log(image, requestDto)
    formData.append("image", image);
    formData.append('requestDto', new Blob([ JSON.stringify(requestDto) ], { type : "application/json" }));

    $.ajax({
        type: 'PUT',
        url: otherHost + `/products?productId=` + id,
        data: formData,
        processData: false,
        contentType: false,
        enctype : 'multipart/form-data',  // * 중요 *
        success: function (data, statusText, jqXHR) {
            alert("상품수정 완료");
            window.location.href = host + '/stores/mystoreslist';
        },
        error: function (xhr, error, msg) {
            alert(xhr.responseJSON.errorMsg);
            window.location.href = host + '/stores/mystoreslist';
        }
    })
}

function deleteProduct(id){
    $.ajax({
        type: 'DELETE',
        url: otherHost + `/products?productId=` + id,
        contentType: false,
        success: function (data, statusText, jqXHR) {
            alert("상품삭제 완료");
            window.location.reload();
        },
        error: function (xhr, error, msg) {
            alert(xhr.responseJSON.errorMsg);
            window.location.reload();
        }
    })
}

function addProducts(id){
    let products = {productList:[]}

    let formData = new FormData();
    $('#addProductList tr').each(function() {
        let product = {
            imageUrl: "",
            productName: "",
            price: 0,
            description: ""
        };
        let tr = $(this);
        let td = tr.children();
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
        products.productList.push(product);
        console.log(products)
    });
    formData.append('requestDto', new Blob([ JSON.stringify(products) ], {type : "application/json"}));
    console.log(formData);
    let productFileInput = $('[data-file-type="products-upload"]');
    // fileInput 개수를 구한다.
    for (let i = 0; i < productFileInput.length; i++) {
        if (productFileInput[i].files.length > 0) {
            for (let j = 0; j < productFileInput[i].files.length; j++) {
                // console.log(" productFileInput[i].files[j] :::"+ productFileInput[i].files[j]);

                // formData에 'file'이라는 키값으로 fileInput 값을 append 시킨다.
                formData.append('image', productFileInput[i].files[j]);
            }
        }
    }

    $.ajax({
        type: "POST",
        url: (otherHost  + `/products?storeId=` + id),
        data: formData,
        contentType: false,               // * 중요 *
        processData: false,               // * 중요 *
        enctype : 'multipart/form-data'  // * 중요 *
    })
        .done(function (res, status, xhr) {
            alert("상품추가 완료.");
            window.location.reload();
        })
        .fail(function (res, jqXHR, textStatus) {
            alert("상품추가 실패");
            // window.location.reload();
        });
}

// 행 추가
function rowAdd() {
    var trCnt = $('#addProductList tr').length;
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

        $('#products_add_table > tbody:last').append(innerHtml);
    } else {
        alert("최대 5개까지만 가능합니다.");
        return false;
    }
}

// 행 삭제
function rowDelete() {
    var trCnt = $('#addProductList tr').length;
    if (trCnt > 1) {
        $('#products_add_table > tbody:last > tr:last').remove();
    } else {
        return false;
    }
}