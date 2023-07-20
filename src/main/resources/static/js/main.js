$(document).ready(function () {
    showCategories();
})


function showCategories() {
    let tagArea = document.getElementById('divCategories');
    let categories = ["전체", "한식", "중식", "일식", "양식", "분식", "카페"];

    for (let i = 0; i < categories.length; i++) {
        const new_button = document.createElement('button');
        new_button.innerText = categories[i]; // 카테고리 이름을 버튼의 텍스트로 설정
        tagArea.appendChild(new_button);

        // 버튼에 onclick 이벤트 처리
        new_button.addEventListener('click', function () {
            // 클릭한 버튼의 텍스트(카테고리 이름)을 가져와서 처리하는 함수 호출
            navigateToCategory(categories[i]);
        });
    }
}

function navigateToCategory(categoryName) {
    let url = '/';
    if (categoryName !== "전체") {
        console.log(categoryName)
        url = '/category?name=' + encodeURIComponent(categoryName);
    }
    // URL로 이동
    window.location.href = url;
}