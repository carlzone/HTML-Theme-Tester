//This is the program section for the book flipping effect
var sampleContent = [
  [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=709&q=80",
    "This the content for the right"
  ],
  [
    "https://images.unsplash.com/photo-1599008633840-052c7f756385?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
    "Partner of the second page"
  ],
  [
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
    "I'm with you bro"
  ],
  [
    "https://images.unsplash.com/photo-1599008633840-052c7f756385?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
    "Yes, another one"
  ],
  [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=709&q=80",
    "The end"
  ]
];
var animation = document.getElementsByClassName("flipper");
animation[0].addEventListener("animationend", animEvent, false);

$(document).ready(function() {
  var animation = null;
  var cpContent = sampleContent[0];
  $("#curpage").val(0);
  $("#btnPrev").attr("disabled", true);
  $(".programs-content-left")
    .children("img:first-child")
    .attr("src", cpContent[0]);
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
      var cpContent = sampleContent[curpage];
      $(".programs-content-left")
        .children("img:first-child")
        .attr("src", cpContent[0]);
      $(".programs-content-right").html(cpContent[1]);
      $(".programs-content-left").removeClass("hide");
      $(".programs-content-right").removeClass("hide");
      break;
  }
}
// Book flipping effects ends here
console.log("Window Height" + $(window).innerHeight());
console.log("Window Height" + $(document).innerHeight());
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
    distance = $(this).offset().top - (scrollTop + $(window).innerHeight());
    console.log(distance);
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
