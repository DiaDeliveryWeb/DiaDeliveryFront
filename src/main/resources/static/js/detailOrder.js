let orderId;
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNum = urlParams.get('orderNum');
    if (orderNum) {
        console.log(orderNum)
        // 주문 정보를 가져오는 함수를 호출합니다.
        getOrderDetails(orderNum);
    }

    $("#starRating i").on("click", function () {
        let rating = $(this).data("rating");
        let stars = $("#starRating i");

        // 선택한 별과 그 앞에 있는 별들까지 채워지도록 처리
        stars.each(function (index) {
            if (index < rating) {
                $(this).removeClass("far").addClass("fas");
            } else {
                $(this).removeClass("fas").addClass("far");
            }
        });

        $("#reviewRating").val(rating);
    });

    $("#reviewImage").on("change", function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageElement = $('<img>').attr('src', e.target.result);
                $('#reviewImageContainer').html(imageElement);
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
});
function submitReview() {
    // 작성한 리뷰 데이터를 FormData 객체로 생성하여 서버로 전송
    let formData = new FormData();
    let image = $("#reviewImage")[0].files[0];
    let requestDto = {
        content: $("#reviewContent").val(),
        rate: $("#reviewRating").val()
    };

    formData.append("image", image);
    formData.append('requestDto', new Blob([ JSON.stringify(requestDto) ], { type : "application/json" }));

    $.ajax({
        type: "POST",
        url: otherHost + "/reviews?orderId="+orderId, // 리뷰 저장 API 엔드포인트 주소
        data: formData,
        processData: false,
        contentType: false,
        enctype : 'multipart/form-data',  // * 중요 *
        success: function(response) {
            // 리뷰 저장 성공 시 화면 갱신 등 추가 작업 수행
            alert("리뷰가 작성되었습니다.");
            window.location.reload();
        },
        error: function(res) {
            alert(res.responseJSON.msg);
        }
    });
}
function updateReview() {
    // 작성한 리뷰 데이터를 FormData 객체로 생성하여 서버로 전송
    let formData = new FormData();
    let image = $("#reviewImage")[0].files[0];
    let requestDto = {
        content: $("#reviewContent").val(),
        rate: $("#reviewRating").val()
    };

    formData.append("image", image);
    formData.append('requestDto', new Blob([ JSON.stringify(requestDto) ], { type : "application/json" }));

    $.ajax({
        type: "PUT",
        url: otherHost + "/reviews?orderId=" + orderId, // 리뷰 저장 API 엔드포인트 주소
        data: formData,
        processData: false,
        contentType: false,
        enctype : 'multipart/form-data',  // * 중요 *
        success: function(response) {
            // 리뷰 저장 성공 시 화면 갱신 등 추가 작업 수행
            alert("리뷰가 수정되었습니다.");
            window.location.reload();
        },
        error: function(res) {
            alert(res.responseJSON.msg);
        }
    });
}
function deleteReview() {
    // 작성한 리뷰 데이터를 FormData 객체로 생성하여 서버로 전송
    $.ajax({
        type: "DELETE",
        url: otherHost + "/reviews?orderId="+orderId, // 리뷰 저장 API 엔드포인트 주소
        contentType: false,
        success: function(response) {
            // 리뷰 저장 성공 시 화면 갱신 등 추가 작업 수행
            alert("리뷰를 삭제했습니다.");
            // 화면 갱신을 위한 코드 추가
            window.location.reload();
        },
        error: function(res) {
            alert(res.responseJSON.msg);
        }
    });
}
function getOrderDetails(orderNum) {
    // AJAX를 사용하여 백엔드 서버로 주문 정보를 요청합니다.
    $.ajax({
        type: "GET",
        url: otherHost + "/order?orderNum=" + orderNum,
        contentType: "application/json",
        success: function (orderData) {
            // 주문 정보를 받아온 후, displayOrderDetails 함수로 표시합니다.
            orderId =orderData.orderId;
            displayOrderDetails(orderData);
            // 리뷰 정보가 null이 아닌 경우, 리뷰 작성 폼에 정보 채우기
            fillReviewForm(orderData.review);
            if (orderData.review.content) {
                console.log(orderData.review)
                // 리뷰가 존재하는 경우 (리뷰 수정, 삭제 가능)
                $("#submitReviewBtn").hide();
                $("#updateReviewBtn").show();
                $("#deleteReviewBtn").show();
            } else {
                // 리뷰가 없는 경우 (리뷰 작성 가능)
                $("#submitReviewBtn").show();
                $("#updateReviewBtn").hide();
                $("#deleteReviewBtn").hide();
            }
        },
        error: function (res) {
            // 에러 처리를 여기에 추가합니다.
            alert(res.responseJSON.msg);

        }
    });
}

function displayOrderDetails(orderData) {
    console.log(orderData)
    let totalPrice = 0;
    // 주문 정보를 이용하여 표시할 HTML을 생성합니다.
    let htmlContent = "<div id='orderDetailContainer'>" +
        "<div><h1>주문 상세 정보</h1>";

    // 주문 정보를 순회하면서 HTML에 추가합니다.
    // 여기서 orderData 객체에 주문 정보가 들어있는 것으로 가정합니다.
    htmlContent += "<p>주문 번호: " + orderData.orderNum + "</p>";
    htmlContent += "<p>가게 이름: " + orderData.storeName + "</p>";
    htmlContent += "<p>주문자 이름: " + orderData.username + "</p></div><h3>주문 내역:</h3>";
    htmlContent += "<div class='orderCardContainer'>"
    // 주문 내역을 순회하면서 HTML에 추가합니다.
    for (let product of orderData.productResponseDtos) {
        htmlContent += "<div class='orderCard'>";
        htmlContent += "<img src='" + product.imageUrl + "' alt='" + product.productName + "'>";
        htmlContent += "<p>상품 이름: " + product.productName + "</p>";
        htmlContent += "<p>가격: " + product.price + "원</p>";
        htmlContent += "<p>상세 설명: " + product.description + "</p>";
        htmlContent += "</div>";
        totalPrice += product.price;
    }

    // 주문 총액을 표시합니다.
    htmlContent += "<p>총액: " + totalPrice+ "원</p></div>";

    // 컨테이너에 HTML을 삽입합니다.
    $("#orderDetailContainer").html(htmlContent);
}

function fillReviewForm(review) {
    const imageUrl = review.imageUrl;
    if (imageUrl) {
        const imageElement = $('<img>').attr('src', imageUrl);
        $('#reviewImageContainer').html(imageElement);
    }
    // 리뷰 내용
    $("#reviewContent").val(review.content);

    // 평점
    const rating = review.rate;
    const stars = $("#starRating i");
    stars.each(function (index) {
        if (index < rating) {
            $(this).removeClass("far").addClass("fas");
        } else {
            $(this).removeClass("fas").addClass("far");
        }
    });
    $("#reviewRating").val(rating);
}