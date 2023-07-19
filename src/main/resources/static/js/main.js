$(document).ready(function () {
    showCategories();
})


function showCategories() {

    let tagArea = document.getElementById('divCategories');

    for (let i = 0 ; i < 8; i++) {
        const new_pTag = document.createElement('img');
        new_pTag.setAttribute('id', 'car_food_' + (i+1));
        new_pTag.setAttribute('src', '/images/car_food_' + (i+1));
        new_pTag.setAttribute('alt', '이미지가 없습니다.');
        tagArea.appendChild(new_pTag);
    }
}