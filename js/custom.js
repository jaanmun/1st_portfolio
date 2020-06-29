/* global $ */

//imageProgress 로딩 화면
$(function () {
  imagesProgress();
  updateProgress();
});

function imagesProgress() {
  var $container = $("#progress"),
    $progressBar = $container.find(".progress-box"),
    $progressText = $container.find(".progress-text"),
    imgLoad = imagesLoaded("body"),
    imgTotal = imgLoad.images.length,
    imgLoaded = 0,
    current = 0,
    progressTimer = setInterval(updateProgress, 2000 / 60);

  $progressText.css("display", "block");

  imgLoad.on("progress", function () {
    imgLoaded++;
  });

  function updateProgress() {
    var target = (imgLoaded / imgTotal) * 100;

    current += (target - current) * 0.1;
    $progressBar.css({ width: current + "%" });
    $progressText.text(Math.floor(current) + "%");

    if (current >= 100) {
      clearInterval(progressTimer);
      $container.addClass("progress-complete");
      $progressBar
        .add($progressText)
        .delay(300)
        .animate({ opacity: 0 }, 2000, function () {
          $container
            .animate({ opacity: "0" }, 1500, "easeInOutQuint")
            .animate({ top: "-100%" }, 1500, "easeInOutQuint");
          $("body").addClass("active");
        });
    }
    if (current > 99.9) {
      current = 100;
    }
  }
}

// Layout Slide 좌측 고정 메뉴 클릭시 해당 레이아웃으로 이동
var nav = $(".menu ul li");
var cont = $("#wrap > section");

nav.click(function (e) {
  e.preventDefault();
  var target = $(this);
  var index = target.index();
  //    alert(index);
  var section = cont.eq(index);
  var offset = section.offset().top;
  //    alert(offset);
  $("html, body").animate({ scrollTop: offset }, 1000, "easeOutCubic");
});

// Mobile Menu Slide
var menu = $(".m_menu_list");
var list = $(".m_menu_list li");

list.click(function (e) {
  e.preventDefault();
  $(this).siblings("li").removeClass("active2");
  $(this).addClass("active2");
  menu.stop().fadeOut(600, "easeOutCubic");
  $(".close_btn").removeClass("active3");
});
$(".m_menu_btn").click(function () {
  menu.stop().slideDown(600, "easeOutCubic");
  $(".close_btn").addClass("active3");
});
$(".close_btn").click(function () {
  menu.stop().slideUp(600, "easeOutCubic");
  $(this).removeClass("active3");
});

// Mobile Layout Click Slide
var mMenu = $(".m_menu_list ul li");

mMenu.click(function (e) {
  e.preventDefault();
  var target = $(this);
  var index = target.index();
  //    alert(index);
  var section = cont.eq(index);
  var offset = section.offset().top;
  //    alert(offset);
  $("html, body").animate({ scrollTop: offset }, 1000, "easeOutCubic");
});

$(window).scroll(function () {
  var wScroll = $(this).scrollTop();
  wScroll = wScroll + 1;

  if (wScroll >= cont.eq(0).offset().top) {
    mMenu.removeClass("active2");
    mMenu.eq(0).addClass("active2");
  }
  if (wScroll >= cont.eq(1).offset().top) {
    mMenu.removeClass("active2");
    mMenu.eq(1).addClass("active2");
  }
  if (wScroll >= cont.eq(2).offset().top) {
    mMenu.removeClass("active2");
    mMenu.eq(2).addClass("active2");
  }
  if (wScroll >= cont.eq(3).offset().top) {
    mMenu.removeClass("active2");
    mMenu.eq(3).addClass("active2");
  }
});

// 좌측 고정 메뉴 active 자동 변경 //각 레이아웃 범위 안에서 좌측 고정 메뉴가 자동으로 변경되도록
//$(window).scroll(function(){
//    var sct = $(window).scrollTop();
//    cont.each(function(){
//        var target = $(this);
//        var index = target.index();
//        var offset = target.offset().top;
//        if(sct >= offset) {
//            nav.removeClass("active")
//            nav.eq(index-1).addClass("active")
//        }
//    });
//});
$(window).scroll(function () {
  var wScroll = $(this).scrollTop();
  wScroll = wScroll + 1;

  if (wScroll >= cont.eq(0).offset().top) {
    nav.removeClass("active");
    nav.eq(0).addClass("active");
  }
  if (wScroll >= cont.eq(1).offset().top) {
    nav.removeClass("active");
    nav.eq(1).addClass("active");
  }
  if (wScroll >= cont.eq(2).offset().top) {
    nav.removeClass("active");
    nav.eq(2).addClass("active");
  }
  if (wScroll >= cont.eq(3).offset().top) {
    nav.removeClass("active");
    nav.eq(3).addClass("active");
  }
});

// Top btn -우측 상단 로고 클릭시 페이지 제일 상단으로 이동
$(".top_btn").click(function () {
  var sct = $(window).scrollTop();

  if (sct > 10) {
    $("html, body").stop().animate({ scrollTop: "0" }, 1100, "easeOutCubic");
  }
});

$(window).scroll(function () {
  var ss = $(window).scrollTop();

  if (ss > 80) {
    //        $(".top_btn").stop().animate({right:"20px"},1100);
    $(".top_btn").css({ right: "20px", opacity: "1" }, 1100);
  } else {
    //        $(".top_btn").stop().animate({right:"-120px"},1100);
    $(".top_btn").css({ right: "-80px", opacity: "0" }, 1100);
  }
});

// Skill percent Number Count Animation
let executed = false;
let $targetOst = $("#sec2").offset().top - 100;

$(window).scroll(function () {
  if (executed == false) {
    if ($(this).scrollTop() >= $targetOst) {
      let $statItem = $(".skill_list .count");

      $statItem.each(function () {
        let currentItem = $(this);
        let $rateNum = currentItem.attr("data-rate");

        $({ mynumber: 0 }).animate(
          { mynumber: $rateNum },
          {
            duration: 2500,
            progress: function () {
              currentItem.text(Math.floor(this.mynumber) + "%");
            },
          },
          "easeOutCirc"
        );
        executed = true;
      });
    }
  }
});

//이메일 주소 복사 - 이메일 주소를 클릭하면 자동 복사 되도록
var clipboard = new ClipboardJS(".email_link");

clipboard.on("success", function () {
  alert("URL을 복사했어요. Ctrl+V로 붙여넣기하여 사용해주세요.");
});
clipboard.on("error", function () {
  alert(
    "이 복사 기능은 크롬 브라우저를 이용하시는게 좋을 거 같아요. 드래그 후 Ctrl+C해서 복사해주세요"
  );
});
