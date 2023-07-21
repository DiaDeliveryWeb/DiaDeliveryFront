$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
    getProfile();
})

function getProfile() {
    $.ajax({
        type: "GET",
        url: otherHost + '/users/info',
        success: function (response) {
            let imageUrl = response['imageUrl'];
            let introduction = response['introduction'];
            loadProfile(imageUrl, introduction);
        }
    })
}

function loadProfile(imageUrl, introduction) {
    let tempHtml = `    <!-- Contact -->
    <section id="contact" class="four">
        <div class="container">
            <div class="co-body">
                <header>
                    <h2 >나의 프로필</h2>
                    <div></div>
                </header>
                    <div class="row">
                        <div style="width:20%;"></div>
                        <div style="width:60%;">

                            <div class="image" >
                                <img id="preview-image" src="${imageUrl}" alt="프로필 사진 미리보기">
                            </div>

                            <input type="file" id="profile-pic" name="profilePic" accept="image/*">

                            <div  class="col-13"><h6>나의 소개</h6></div>
                            <div class="col-12">
                                <input type="text" id="introduction" name="introduction" placeholder="${introduction}">
                            </div>

                            <div  class="col-13"><h6>비밀번호</h6></div>
                            <div class="col-12">
                                <input type="password" id="password" name="password" placeholder="새 비밀번호">
                            </div>

                            <div class="off-7">
                                <button id="my-page-btn-submit" onclick="editProfile()">수정하기</button>
                            </div>

                            <div class="aln-left">
                                <button id="my-page-btn-withdrawal" onclick="onWithdrawal()">회원탈퇴</button>
                            </div>
                        </div>
                        <div style="width:20%;"></div>
                    </div>
            </div>
        </div>
    </section>`;

    $('#main').append(tempHtml);
}
function editProfile() {
    const inputElement = document.getElementById("profile-pic");
    const file = inputElement.files[0];
    let introduction = $('#introduction').val();
    let password = $('#password').val();
    let formData = new FormData();
    formData.append("introduction", introduction);
    formData.append("password", password);
    formData.append("profilePic", file);
    $.ajax({
        type: "PUT",
        url: otherHost + "/users/update",
        data: formData,
        processData: false,
        contentType: false,
        success: function(data, statusText, jqXHR) {
            alert(data.msg);
            window.location.reload();
        },
        error: function(xhr, status, error) {
            alert(xhr.responseJSON.msg);
            window.location.reload();
        }
    });
}

function onWithdrawal() {
    let password = prompt("회원탈퇴를 위해 비밀번호를 입력해 주세요.");
    let data = {"password": password};
    $.ajax({
        type: "DELETE",
        url: otherHost + "/users/withdrawal",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(data, statusText, jqXHR) {
            alert(data.msg);
            Cookies.remove('Authorization', {path: '/'});
            window.location.href = host + '/user/login-page';
        },
        error: function(xhr, status, error) {
            alert(xhr.responseJSON.msg);
            window.location.reload();
        }
    });
}

// input 요소 변경 감지 및 미리보기 업데이트
let inputElement = document.getElementById("profile-pic");
let previewElement = document.getElementById("preview-image");

inputElement.addEventListener("change", function () {
    const file = inputElement.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            previewElement.src = event.target.result;
        };

        reader.readAsDataURL(file);
    } else {
        previewElement.src = "#";
    }
});