$(document).ready(function () {
    // jQuery to handle the cart functionality
    const cartItems = [];
    console.log(reviewsData)
    // const reviews = JSON.parse(reviewsData);

    // 별점과 함께 별 개수를 표시할 요소 선택
    const starsContainer = $(".rating");

    // 별점 계산 함수 호출하여 평균 별점 가져오기
    const averageRating = calculateRating(reviewsData);

    // 별점을 별 아이콘으로 변환하여 starsContainer에 추가
    for (let i = 1; i <= 5; i++) {
        const starIcon = $("<i>").addClass("fas fa-star");
        if (i <= averageRating) {
            starIcon.addClass("checked");
        }
        starsContainer.append(starIcon);
    }

    // 별점 개수도 함께 표시
    starsContainer.prepend(`<span>평점: ${averageRating} / 5</span>`);

    // Event handler for the "담기" button
    $(".add-to-cart-button").on("click", function () {
        const $menuItem = $(this).closest(".menu-item");
        const productIdText = $menuItem.find("span[name='productId']").text();

        // Convert the productIdText to a numeric data type, like an integer or a floating-point number
        const productId = parseInt(productIdText); // Use parseInt() for an integer or
        // const productId = parseFloat(productIdText); // Use parseFloat() for a floating-point number

        const productName = $menuItem.find("h3[name='productName']").text();
        const price = $menuItem.find("span[name='price']").text();

        addToCart(productId, productName, price);
    });

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

    function addToCart(productId, productName, price) {
        cartItems.push({
            productId: productId,
            productName: productName,
            price: price
        });
        updateCart();
    }

    function updateCart() {
        const cartList = $("#cart-items");
        cartList.empty(); // Clear previous cart items

        cartItems.forEach(item => {
            const li = $("<li>").text(item.productName + " " + item.price);
            cartList.append(li);
        });
    }

    // Function to send API request with selected product IDs
    function sendCartToApi() {
        if (cartItems.length > 0) {
            // Extract only the productIds from the cartItems array and convert them to long integers
            const productIds = cartItems.map(item => item.productId);

            // Create the request data object
            const requestData = {
                productList: productIds,
            };

            // Implement your API request logic here using $.ajax() method
            $.ajax({
                url: otherHost + "/orders",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(requestData),
                success: function (data) {
                    alert("주문 생성 완료")
                    window.location.reload()
                },
                error: function (res, error) {
                    alert(res.responseJSON.msg);
                    console.error("Error placing order:", error);
                },
            });
        }
    }


    // Attach click event handler using jQuery
    $(".order-button").on("click", function () {
        sendCartToApi();
    });

    // Add other functions or code relevant to the order page here

});

function calculateRating(reviews) {
    if (!reviews || reviews.length === 0) {
        return 0;
    }
    // 리뷰 배열의 별점 합계 구하기
    const totalRating = reviews.reduce((acc, review) => acc + review.rate, 0);
    // 리뷰 배열의 평균 별점 구하기
    const averageRating = totalRating / reviews.length;
    // 평균 별점 반올림해서 소수점 첫째 자리까지 표시
    return averageRating.toFixed(1);
}

function openTab(tabName) {
    var i, tabContent, tabButtons;

    // 모든 탭 컨텐츠 숨기기
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // 모든 탭 버튼 비활성화
    tabButtons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    // 선택한 탭 컨텐츠 보여주기
    document.getElementById(tabName).style.display = "block";

    // 선택한 탭 버튼 활성화
    event.currentTarget.classList.add("active");
}

function scrap(){
    let storeId = store.storeId;
    $.ajax({
        url: otherHost + "/scrap?storeId=" + storeId,
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            alert("스크랩 완료")
            window.location.reload()
        },
        error: function (res, error) {
            alert(res.responseJSON.msg);
        },
    });
}

function cancelScrap(){
    let storeId = store.storeId;
    $.ajax({
        url: otherHost + "/scrap?storeId=" + storeId,
        type: "DELETE",
        contentType: "application/json",
        success: function (data) {
            alert("스크랩 취소 완료")
            window.location.reload()
        },
        error: function (res, error) {
            alert(res.responseJSON.msg);
        },
    });
}