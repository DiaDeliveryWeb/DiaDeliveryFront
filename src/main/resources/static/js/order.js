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

function getProductList() {
    fetch(otherHost+"/data") // API 요청 URL을 입력합니다.
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error("데이터를 가져오는데 오류가 발생했습니다.", error));
}