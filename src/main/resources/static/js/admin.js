const otherHost = 'http://localhost:8080';
var name;
var users;
var orders;
var reviews;
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: otherHost + "/office/user",
        success: function (data, statusText, jqXHR) {
            users = data;
        },
        error: function (xhr, error, msg) {
        }
    })

    $.ajax({
        type: "GET",
        url: otherHost + "/office/order",
        success: function (data2, statusText, jqXHR) {
            orders = data2;
        },
        error: function (xhr, error, msg) {

        }
    })

    $.ajax({
        type: "GET",
        url: otherHost + "/office/review",
        success: function (data3, statusText, jqXHR) {
            reviews = data3;
        },
        error: function (xhr, error, msg) {

        }
    })
})
function getAdminToken() {
    let adminToken = prompt("Admin Token을 입력해주세요");
    let data ={"token": adminToken};
    $.ajax({
        type: "POST",
        url: otherHost + "/office",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (data, statusText, jqXHR) {
            alert(data.msg);
            window.location.href = 'http://' + window.location.host + "/admin/home";
        },
        error: function(xhr, error, msg) {
            alert(xhr.responseJSON.msg);
            window.location.reload();
        }
    });
}
function blockUser(username) {
    // console.log(username);
    let data = {'username': username};
    $.ajax({
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        url: otherHost + "/office/block",
        success: function (data, statusText, jqXHR) {
            window.location.reload();
        },
        error: function(xhr, error, msg) {
            window.location.reload();
        }
    });
}
function openUser() {
    $('.main-section').empty();
    function addContent(username) {
        name = username;
        console.log(name);
        let tempHtml = `<div class="name-section">
                                ${username}                               
                                </div>
                                <button class="user-btn" onclick="blockUser('${name}')">회원 차단</button>`
        $('.main-section').append(tempHtml);
    }

    for (var i=0; i<users.length; i++) {
        addContent(users[i]['username'])
    }

    // 'user-section' 클래스를 가진 요소를 보이도록 변경합니다.
    var userSection = document.getElementsByClassName("user-section")[0];
    userSection.style.display = 'block';


    // 다른 섹션들은 숨깁니다.
    var orderSection = document.querySelector('.order-section')[0];
    orderSection.style.display = 'none';

    var reviewSection = document.querySelector('.review-section')[0];
    reviewSection.style.display = 'none';
}

function openOrder() {
    // 'order-section' 클래스를 가진 요소를 보이도록 변경합니다.
    var orderSection = document.querySelector('.order-section');
    orderSection.style.display = 'block';

    // 다른 섹션들은 숨깁니다.
    var userSection = document.querySelector('.user-section');
    userSection.style.display = 'none';

    var reviewSection = document.querySelector('.review-section');
    reviewSection.style.display = 'none';
}

function openReview() {
    // 'review-section' 클래스를 가진 요소를 보이도록 변경합니다.
    var reviewSection = document.querySelector('.review-section');
    reviewSection.style.display = 'block';

    // 다른 섹션들은 숨깁니다.
    var userSection = document.querySelector('.user-section');
    userSection.style.display = 'none';

    var orderSection = document.querySelector('.order-section');
    orderSection.style.display = 'none';
}

