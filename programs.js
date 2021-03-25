//This is the program section for the book flipping effect
var sampleContent = [
  ["This is the first page", "This the content for the right"],
  ["This is the second page", "Partner of the second page"],
  ["Another page this is", "I'm with you bro"],
  ["So another one", "Yes, another one"],
  ["Last page at last!", "The end"]
];
var animation = document.getElementsByClassName("flipper");
animation[0].addEventListener("animationend", animEvent, false);

$(document).ready(function() {
  var animation = null;
  var cpContent = sampleContent[0];
  $("#curpage").val(0);
  $("#btnPrev").attr("disabled", true);
  $(".programs-content-left").html(cpContent[0]);
  $(".programs-content-right").html(cpContent[1]);

  $(document).on("click", "#btnPrev", function() {
    flipToRight();
  });
  $(document).on("click", "#btnNext", function() {
    flipToLeft();
  });
  $(document).on("click", ".programs-group-leftpage", function() {
    if (parseInt($("#curpage").val()) > 0) {
      flipToRight();
    }
  });
  $(document).on("click", ".programs-group-rightpage", function() {
    if (parseInt($("#curpage").val()) < sampleContent.length - 1) {
      flipToLeft();
    }
  });
});

function flipToLeft() {
  $("#btnPrev").attr("disabled", true);
  $("#btnNext").attr("disabled", true);
  $(".programs-content-left").addClass("hide");
  $(".programs-content-right").addClass("hide");
  var pagefade = document.getElementsByClassName("programs-content-left");
  pagefade[0].addEventListener(
    "transitionend",
    function _eventTransition() {
      slowhide(pagefade[0], "left", _eventTransition);
    },
    false
  );
}
function flipToRight() {
  $("#btnPrev").attr("disabled", true);
  $("#btnNext").attr("disabled", true);
  $(".programs-content-left").addClass("hide");
  $(".programs-content-right").addClass("hide");
  var pagefade = document.getElementsByClassName("programs-content-right");
  pagefade[0].addEventListener(
    "transitionend",
    function _eventTransition() {
      slowhide(pagefade[0], "right", _eventTransition);
    },
    false
  );
}

function slowhide(eventHost, direction, _eventTransition) {
  var curpage = parseInt($("#curpage").val());

  console.log(direction);
  if (eventHost.classList.contains("hide")) {
    console.log("Adding animation\n");
    switch (direction) {
      case "left":
        $("div.flipper").addClass("right");
        var x = ++curpage;
        console.log("Left New X: " + x + " | Length: " + sampleContent.length);
        $("#curpage").val(x);
        break;
      case "right":
        $("div.flipper").addClass("left");
        var x = --curpage;
        console.log("Right New X: " + x + " | Length: " + sampleContent.length);
        $("#curpage").val(x);
        break;
    }
  } else {
    console.log("Fade in Transition Ends");
  }
  eventHost.removeEventListener("transitionend", _eventTransition, false);
}

function animEvent(event) {
  console.log("Entering Animaion Event Ends");
  switch (event.type) {
    case "animationend":
      var curpage = parseInt($("#curpage").val());
      $("div.flipper").removeClass("left");
      $("div.flipper").removeClass("right");
      if (curpage > 0) {
        $("#btnPrev").removeAttr("disabled");
      }
      if (curpage < sampleContent.length - 1) {
        $("#btnNext").removeAttr("disabled");
      }
      console.log($("#curpage").val());
      var cpContent = sampleContent[curpage];
      $(".programs-content-left").html(cpContent[0]);
      $(".programs-content-right").html(cpContent[1]);
      $(".programs-content-left").removeClass("hide");
      $(".programs-content-right").removeClass("hide");
      break;
  }
}
// Book flipping effects ends here

//Scroll to fade
$(document).scroll(function() {
  var scroll = $(document).scrollTop();

  if (scroll > 100 && $(".go2top").hasClass("invisible")) {
    $(".go2top").removeClass("invisible");
  } else if (scroll == 0 && !$(".go2top").hasClass("invisible")) {
    $(".go2top").addClass("invisible");
  }

  var distance = 0;
  var scrollTop = $(this).scrollTop();
  $(".course-item").each(function(index, value) {
    distance = $(this).offset().top - (scrollTop + 350);
    if (distance < 0) {
      distance = 0;
    }
    // Increase the opacity of the div while scroll
    // if (distance < 100) {
    //   $(this).css("--itemOpacity", 1 - distance * 0.01);
    //   console.log(1 - distance * 0.01);
    // }
    if (distance == 0) {
      if (!$(this).hasClass("display")) {
        $(this).addClass("display");
      }
    }
  });
});
//Scroll to fade ends
