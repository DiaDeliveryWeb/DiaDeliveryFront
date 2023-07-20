$(document).ready(function () {
    const auth = getToken();
    if (auth !== undefined && auth !== '') {
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            jqXHR.setRequestHeader('Authorization', auth);
        });
    }
    getOrders();
})

function getToken() {
    let auth = Cookies.get('Authorization');
    if (auth === undefined) {
        return '';
    }
    return auth;
}

function getOrders() {
    $.ajax({
        type: "GET",
        url: (otherHost + `/orders`),
        contentType: "application/json",
    })
        .done(function (res, status, xhr) {
            displayOrderData(res)
        })
        .fail(function (jqXHR, textStatus) {
            alert("Fail To Get Orders Info");
        });
}

function onProfile() {
    window.location.href = host + '/user/profile';
}

function onStoreSave() {
    window.location.href = host + '/stores/save';
}

function displayOrderData(orderData) {
    // HTML 문자열로 데이터를 구성합니다.
    let htmlContent = '';
    console.log(orderData)
    // orderData 배열의 각 주문 정보를 순회하면서 HTML에 추가합니다.
    orderData.forEach((order) => {
        let orderStatus = order.orderStatus;
        let productResponseDtos = order.productResponseDtos;
        let storeName = order.storeName;
        let username = order.username;
        let totalPrice = 0;

        htmlContent += `<div class="orderCardOne">
            <div>
            <h2>주문 상태: ${orderStatus}</h2>
            <h3>가게 이름: ${storeName}</h3>
            <h3>사용자 이름: ${username}</h3>
            </div>
            <button id="accept-order">주문 수락</button>
            <button id="cancle-order">주문 취소</button>
            <h3>주문 내역:</h3>
            <div class="orderCardContainer">
        `;

        // productResponseDtos의 각 항목을 순회하면서 HTML에 추가합니다.
        productResponseDtos.forEach((product) => {
            let imageUrl = product.imageUrl;
            let productName = product.productName;
            let price = product.price;
            let description = product.description;
            totalPrice += product.price;

            htmlContent += `
                <div class="orderCard">
                    <img src="${imageUrl}" alt="${productName}">
                    <div class="orderCardContent">
                        <h4>${productName}</h4>
                        <p>가격: ${price}원</p>
                        <p>${description}</p>
                    </div>
                </div>
                </div>
            `;
        });

        htmlContent += `
            <h4>총액: ${totalPrice}</h4>
            </div>
        `;
    });

    // HTML 컨테이너에 데이터를 삽입합니다.
    let orderDataContainer = document.getElementById('orderDataContainer');
    orderDataContainer.innerHTML = htmlContent;
}
