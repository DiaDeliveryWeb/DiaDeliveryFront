const host = 'http://' + window.location.host;

$(document).ready(function () {

})

function onProfile() {
    window.location.href = host + '/user/profile';
}
function onStoreSave() {
    window.location.href = host + '/stores/save';
}
