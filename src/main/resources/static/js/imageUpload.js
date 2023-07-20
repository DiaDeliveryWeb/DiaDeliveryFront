//이미지 삭제
function delImg(_this) {
    $(_this).parent('li').remove()
}

// 특정 인덱스의 이미지 미리보기
/*
* arr : 배열
*previewId : 프리뷰 id 
* idx : 인덱스
* */
function previewInArrays(arr, previewId, idx) {
    var deleteTagId = "delBtn" + idx;

    arr.forEach(function (f) {
        //파일명이 길면 파일명...으로 처리
        /*
        var fileName = f.name;
        if(fileName.length > 10){
            fileName = fileName.substring(0,7)+"...";
        }
        */

        //div에 이미지 추가
        var str = '<li class="ui-state-default">';
        //str += '<span>'+fileName+'</span><br>';

        //이미지 파일 미리보기
        if (f.type.match('image.*')) {
            //파일을 읽기 위한 FileReader객체 생성
            var reader = new FileReader();
            reader.onload = function (e) {
                //파일 읽어들이기를 성공했을때 호출되는 이벤트 핸들러
                str += '<img src="' + e.target.result + '" title="' + f.name + '" width=80 height=80>';
                str += '<span class="' + deleteTagId + '" onclick="delImg(this)">x</span>';
                str += '</li>';
                $(str).appendTo('#' + previewId);
            }
            reader.readAsDataURL(f);
        } else {
            //이미지 파일 아닐 경우 대체 이미지
            /*
            str += '<img src="/resources/img/fileImg.png" title="'+f.name+'" width=60 height=60 />';
            $(str).appendTo('#Preview');
            */
        }
    })
}

// fileTagId : input 파일 태그 id
function checkExtensionInArrays(fileName, fileSize, fileTagId) {
    var regex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");
    var maxSize = 20971520;  //20MB

    if (fileSize >= maxSize) {
        alert('이미지 크기가 초과되었습니다.');
        $("#" + fileTagId).val("");  //파일 초기화
        return false;
    }

    if (regex.test(fileName)) {
        alert('확장자명을 확인해주세요.');
        $("#" + fileTagId).val("");  //파일 초기화
        return false;
    }
    return true;
}

// 동적으로 추가되는 파일 태그들의 파일 첨부
$(document).on('change', "[id^='AddImgs_']", function (e) {
    $(".sortable").sortable();
    var thisId = $(this).attr("id");
    var words = thisId.split('_');
    if (words.length == 2) {
        var idx = words[1];
        var previewId = "Preview_" + idx;
        //div 내용 비워주기
        $('#' + previewId).empty();

        var files = e.target.files;
        var arr = Array.prototype.slice.call(files);

        //업로드 가능 파일인지 체크
        for (var i = 0; i < files.length; i++) {
            if (!checkExtensionInArrays(files[i].name, files[i].size, thisId)) {
                return false;
            }
        }
        previewInArrays(arr, previewId, idx);


    } else {
        alert('잘못된 데이터입니다. 관리자에게 문의하여주세요.');
    }


});

// 일반 파일 첨부
$(function () {
    //드래그 앤 드롭
    $(".sortable").sortable();

    //이미지 등록
    $("#AddImgs").change(function (e) {
        //div 내용 비워주기
        $('#Preview').empty();

        var files = e.target.files;
        var arr = Array.prototype.slice.call(files);

        //업로드 가능 파일인지 체크
        for (var i = 0; i < files.length; i++) {
            if (!checkExtension(files[i].name, files[i].size)) {
                return false;
            }
        }
        preview(arr);

        function checkExtension(fileName, fileSize) {
            var regex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");
            var maxSize = 20971520;  //20MB

            if (fileSize >= maxSize) {
                alert('이미지 크기가 초과되었습니다.');
                $("#AddImgs").val("");  //파일 초기화
                return false;
            }

            if (regex.test(fileName)) {
                alert('확장자명을 확인해주세요.');
                $("#AddImgs").val("");  //파일 초기화
                return false;
            }
            return true;
        }

        function preview(arr) {
            arr.forEach(function (f) {
                //파일명이 길면 파일명...으로 처리
                /*
                var fileName = f.name;
                if(fileName.length > 10){
                    fileName = fileName.substring(0,7)+"...";
                }
                */

                //div에 이미지 추가
                var str = '<li class="ui-state-default">';
                //str += '<span>'+fileName+'</span><br>';

                //이미지 파일 미리보기
                if (f.type.match('image.*')) {
                    //파일을 읽기 위한 FileReader객체 생성
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        //파일 읽어들이기를 성공했을때 호출되는 이벤트 핸들러
                        str += '<img src="' + e.target.result + '" title="' + f.name + '" width=80 height=80>';
                        str += '<span class="delBtn" onclick="delImg(this)">x</span>';
                        str += '</li>';
                        $(str).appendTo('#Preview');
                    }
                    reader.readAsDataURL(f);
                } else {
                    //이미지 파일 아닐 경우 대체 이미지
                    /*
                    str += '<img src="/resources/img/fileImg.png" title="'+f.name+'" width=60 height=60 />';
                    $(str).appendTo('#Preview');
                    */
                }
            })
        }
    })
})