// JavaScript source code

$(document).ready(function () {
    $("#sticker").sticky({ topSpacing: 60, center: false, className: "stickerup" });

    $("#btn1").click(function () { click_scroll("#group1"); });
    $("#btn2").click(function () { click_scroll("#group2"); });
    $("#btn3").click(function () { click_scroll("#group3"); });
    $("#btn4").click(function () { click_scroll("#group4"); });
    $("#btn5").click(function () { click_scroll("#group5"); });
    $("#btn6").click(function () { click_scroll("#group6"); });
    $("#btn7").click(function () { click_scroll("#group7"); });
    $("#btn8").click(function () { click_scroll("#group8"); });
    $("#btn9").click(function () { click_scroll("#group9"); });
    $("#btn10").click(function () { click_scroll("#group10"); });
    $("#btn11").click(function () { click_scroll("#group11"); });
});



function click_scroll(btnclicked) {

    var scroll_offset = $(btnclicked).offset(); //得到pos這個div層的offset，包含兩個值，top和left 

    $("body,html").animate({
        scrollTop: scroll_offset.top - 180 //讓body的scrollTop等於pos的top，就實現了滾動 
    }, 500);
}