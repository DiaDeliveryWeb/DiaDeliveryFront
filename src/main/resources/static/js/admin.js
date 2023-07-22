const otherHost = 'http://localhost:8080';

let users, orders, reviews;
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: otherHost + "/office/user",
        success: function (data, statusText, jqXHR) {
            users = data;
        },
        error: function (xhr, error, msg) {
            alert(xhr.responseJSON.errorMsg);
            window.location.reload();
        }
    })

    $.ajax({
        type: "GET",
        url: otherHost + "/office/order",
        success: function (data, statusText, jqXHR) {
            orders = data;
            console.log(orders);
        },
        error: function (xhr, error, msg) {
            alert(xhr.responseJSON.errorMsg);
            window.location.reload();
        }
    })

    $.ajax({
        type: "GET",
        url: otherHost + "/office/review",
        success: function (data, statusText, jqXHR) {
            reviews = data;
        },
        error: function (xhr, error, msg) {
            alert(xhr.responseJSON.errorMsg);
            window.location.reload();
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

function openAdmin() {

}