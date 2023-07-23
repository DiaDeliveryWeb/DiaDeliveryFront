let scrapNum;
let reviewNum;
let imageUrl;
let email;
let introduction;
$(document).ready(function () {
    const auth = getToken();
    if (auth !== undefined && auth !== '') {
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            jqXHR.setRequestHeader('Authorization', auth);
        });
    }
    $.ajax({
        type: "GET",
        url: (otherHost + `/profile`),
        contentType: "application/json",
    })
        .done(function (res, status, xhr) {
            scrapNum = res.scrapNum;
            reviewNum = res.reviewNum;
            imageUrl = res.imageUrl;
            email = res.email;
            introduction = res.introduction;

        })
        .fail(function (res, jqXHR, textStatus) {
            alert(res.responseJSON.msg);
        });

    getOrders();
    $("#scrapItem").click(function () {
        moveScrapStoresPage();
    });

    $("#myStoresItem").click(function () {
        moveMyStoresPage();
    });

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
        .fail(function (res, jqXHR, textStatus) {
            alert(res.responseJSON.msg);
        });
}

function onProfile() {
    window.location.href = host + '/user/profile';
}

function onStoreSave() {
    window.location.href = host + '/stores/save';
}

function displayOrderData(orderData) {
    let createdOrderCnt = 0;
    let doneOrderCnt = 0;
    let canceledOrderCnt= 0;
    // HTML 문자열로 데이터를 구성합니다.
    let htmlContent = '';

    // myStores는 OWNER인 경우에만 나타남
    const myStoresItem = document.getElementById("myStoresItem");
    if (role === "OWNER") {
        myStoresItem.style.display = "block";
    } else {
        myStoresItem.style.display = "none";
    }

    // orderData 배열의 각 주문 정보를 순회하면서 HTML에 추가합니다.
    orderData.forEach((order) => {
        let orderStatus = order.orderStatus;
        let productResponseDtos = order.productResponseDtos;
        let storeName = order.storeName;
        let username = order.username;
        let orderNum = order.orderNum;
        let totalPrice = 0;
        if (orderStatus === '주문생성') {
            createdOrderCnt += 1;
        } else if (orderStatus === '주문완료') {
            doneOrderCnt += 1;
        } else {
            canceledOrderCnt += 1;
        }
        let scrapElement = document.getElementById('scrap');
        scrapElement.innerText = scrapNum;
        let reviewElement = document.getElementById('review');
        reviewElement.innerText = reviewNum;
        if (imageUrl !== null) {
            $("#userProfileImage").attr("src", imageUrl);
        }
        $("#userProfileEmail").text(email);
        if (introduction !== null) {
            $("#userProfileIntroduction").text(introduction);
        }

        toggleElementsBasedOnRole(role);

        htmlContent += `<div class="orderCardOne">
            <div>
            <h2>주문 상태: ${orderStatus}</h2>
            <h3>가게 이름: ${storeName}</h3>
            <h3>사용자 이름: ${username}</h3>
            <a href="/orders?orderNum=${orderNum}" class="order-link">
                <h3 class="order-number">주문 번호: ${orderNum}</h3>
            </a>
            </div>
            <!-- 버튼을 role이 "owner"일 때만 보이도록 설정합니다. -->
            <button id="accept-order" onclick="acceptOrder('${orderNum}')" style="display: ${role === 'OWNER' && orderStatus === '주문생성' ? 'block' : 'none'}">주문 수락</button>

            <button id="cancel-order" onclick="cancelOrder('${orderNum}')" style="display: ${orderStatus === '주문생성' ? 'block' : 'none'}">주문 취소</button>
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
            `;
        });

        htmlContent += `
            <h4>총액: ${totalPrice}</h4>
            </div>
            </div>
        `;
    });

    // HTML 컨테이너에 데이터를 삽입합니다.
    let orderDataContainer = document.getElementById('orderDataContainer');
    orderDataContainer.innerHTML = htmlContent;
    orderStatus(createdOrderCnt, doneOrderCnt, canceledOrderCnt);
}

function acceptOrder(orderNum){
    $.ajax({
        type: "PUT",
        url: (otherHost  + `/orders?orderNum=` + orderNum),
        contentType: "application/json"
    })
        .done(function (res, status, xhr) {
            window.location.href = host + "/user/mypage";
        })
        .fail(function (res) {
            alert(res.responseJSON.msg);
        });
}

function cancelOrder(orderNum){
    $.ajax({
        type: "DELETE",
        url: (otherHost  + `/orders?orderNum=` + orderNum),
        contentType: "application/json"
    })
        .done(function (res, status, xhr) {
            window.location.href = host + "/user/mypage";
        })
        .fail(function (res) {
            alert(res.responseJSON.msg);
        });
}

function orderStatus(createdOrderCnt, doneOrderCnt, canceledOrderCnt) {
    let createdElement = document.getElementById('created');
    createdElement.innerText = createdOrderCnt;
    let doneElement = document.getElementById('done');
    doneElement.innerText = doneOrderCnt;
    let canceledElement = document.getElementById('canceled');
    canceledElement.innerText = canceledOrderCnt;
}

// 유저의 권한에 따라 요소를 보이거나 감추는 함수
function toggleElementsBasedOnRole(role) {
    // scrap은 USER인 경우에만 나타남
    const scrapItem = document.getElementById("scrapItem");
    if (role === "USER") {
        scrapItem.style.display = "block";
    } else {
        scrapItem.style.display = "none";
    }

    // review는 USER인 경우에만 나타남
    const reviewItem = document.getElementById("reviewItem");
    if (role === "USER") {
        reviewItem.style.display = "block";
    } else {
        reviewItem.style.display = "none";
    }

    // myStores는 OWNER인 경우에만 나타남 (반복문을 탈 필요없어 주석처리)
/*    const myStoresItem = document.getElementById("myStoresItem");
    if (role === "OWNER") {
        myStoresItem.style.display = "block";
    } else {
        myStoresItem.style.display = "none";
    }*/
}


function moveScrapStoresPage() {
    window.location.href = host + '/stores/scrap';
}

function moveMyStoresPage() {
    window.location.href = host + '/stores/mystoreslist';
}