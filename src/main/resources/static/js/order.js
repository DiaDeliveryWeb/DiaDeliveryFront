const otherHost = 'http://localhost:8080';

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
        const productId = $(this).siblings("span[name='productId']").text();
        addToCart(productId);
    });

    function addToCart(productId) {
        cartItems.push(productId);
        updateCart();
    }

    function updateCart() {
        const cartList = $("#cart-items");
        cartList.empty(); // Clear previous cart items

        cartItems.forEach(productId => {
            const li = $("<li>").text(productId);
            cartList.append(li);
        });
    }

    // Function to send API request with selected product IDs
    function sendCartToApi() {
        if (cartItems.length > 0) {
            // Implement your API request logic here
            // You can use jQuery's $.ajax() or $.post() for the AJAX request
            $.post("YOUR_API_ENDPOINT", JSON.stringify(cartItems))
                .done(function (data) {
                    // Handle API response if needed
                })
                .fail(function (error) {
                    console.error("Error sending cart data to API:", error);
                });
        }
    }

    // Add other functions or code relevant to the order page here

});
