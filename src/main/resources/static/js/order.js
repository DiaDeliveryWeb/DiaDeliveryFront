
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

$(document).ready(function () {
    // jQuery to handle the cart functionality
    const cartItems = [];

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
                    console.log("Order placed successfully!");
                    window.location.reload()
                },
                error: function (res, error) {
                    alert(res.responseText);
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

function submitReview() {
    // 작성한 리뷰 데이터를 FormData 객체로 생성하여 서버로 전송
    let formData = new FormData();
    let image = $("#reviewImage")[0].files[0];
    let content = $("#reviewContent").val();
    let rate = $("#reviewRating").val();

    formData.append("image", image);
    formData.append("content", content);
    formData.append("rate", rate);

    $.ajax({
        type: "POST",
        url: "/api/reviews", // 리뷰 저장 API 엔드포인트 주소
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            // 리뷰 저장 성공 시 화면 갱신 등 추가 작업 수행
            alert("리뷰가 작성되었습니다.");
            // 화면 갱신을 위한 코드 추가
        },
        error: function(error) {
            alert("리뷰 작성에 실패했습니다.");
        }
    });
}