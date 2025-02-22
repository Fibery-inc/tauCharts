import $ from "jquery";

$(function () {
  //$(function() {
  //
  //    var exampleLink = $('.example-link'),
  //        header =  $('.header');
  //
  //    $('.wrapper').fullpage({
  //        anchors:['main', 'examples', 'latest', 'about'],
  //        autoScrolling: false,
  //        scrollingSpeed: 1200,
  //        responsiveWidth: 960,
  //        responsiveHeight: 800,
  //        //fixedElements: '.header',
  //        fitToSection: false,
  //        'css3': true,
  //
  //        'onLeave': function(index, nextIndex, direction) {
  //            if (index == 1 && direction == 'down') {
  //                header.removeClass('main-view').addClass('not-main-view');
  //                exampleLink.addClass('change-link');
  //            }
  //            else if (index == 2 && direction == 'up') {
  //                header.removeClass('not-main-view').addClass('main-view');
  //                exampleLink.removeClass('change-link');
  //            }
  //
  //
  //        }
  //    });
  //});

  function LogoController() {
    var o = {
      e: $("section.main .promo"),
      le: $("section.main .promo").find(".main-logo"),
      size: {
        x: 0,
        y: 0,
      },
      scroll: {
        threshold: 200,
        current: 0,
        rate: 0,
        multiplier: 2,
      },
      logobg: {
        size: {
          x: 0,
          y: 0,
        },
        target: {
          x: 0,
          y: 0,
        },
        threshold: 0,
        progress: 0,
      },
      getBackgroundSize: function () {
        o.size.x = o.e.outerWidth();
        o.size.y = o.e.outerHeight();
        // console.log(o.size.x);
        o.logobg.size.x = o.le.width();
        o.logobg.size.y = o.le.height();
      },
      getThreshold: function () {
        o.scroll.threshold = o.e.height();
        o.logobg.threshold = $("section.main .description").outerHeight() - $(".header").outerHeight();
        o.logobg.target.x = 135;
        o.logobg.target.y = 15;
      },
      getRate: function () {
        o.scroll.rate = o.scroll.current / o.scroll.threshold;
        o.logobg.progress = o.scroll.current / o.logobg.threshold;
        if (o.scroll.rate <= 0) {
          o.scroll.rate = 0;
        }
        if (o.scroll.rate >= 1) {
          o.scroll.rate = 1;
        }
        if (o.logobg.progress < 0) {
          o.logobg.progress = 0;
        }
        if (o.logobg.progress >= 1) {
          o.logobg.progress = 1;
        }
      },
      setBackground: function () {
        var difference = (o.size.x * o.scroll.multiplier - o.size.x) * o.scroll.rate;
        var size = o.size.x + difference;
        var string = size + "px " + o.size.y + "px";
        o.e.css("background-size", string);
      },
      setLogoBgSize: function () {
        var dX = o.logobg.size.x - o.logobg.target.x;
        var dY = o.logobg.size.y - o.logobg.target.y;
        var x = o.logobg.size.x - dX * o.logobg.progress;
        var y = o.logobg.size.y - dY * o.logobg.progress;
        var str = x + "px " + y + "px";
        var opacity = 1.5 - o.logobg.progress;
        if (opacity > 1) {
          opacity = 1;
        }
        if (opacity < 0) {
          opacity = 0;
        }
        o.le.css({
          "background-size": str,
          opacity: opacity,
        });
      },
      highlightArrow: function () {
        var arr = $("section.examples").find(".navigator .next-chart");
        if (o.scroll.current >= $("section.examples").offset().top && !arr.is(".highlighted")) {
          arr.addClass("highlighted");
        }
      },
      onWindowScroll: function (e) {
        var t = e.currentTarget;
        var scr = t.scrollY;
        o.scroll.current = scr;
        o.getRate();
        o.highlightArrow();
        o.setBackground();
        o.setLogoBgSize();
      },
      onWindowResize: function (e) {
        o.getBackgroundSize();
        o.getThreshold();
        o.getRate();
        o.setBackground();
        o.setLogoBgSize();
      },
      setHandlers: function () {
        $(window).on("scroll", o.onWindowScroll);
        $(window).on("resize", o.onWindowResize);
      },
    };
    o.getBackgroundSize();
    o.getThreshold();
    o.getRate();
    o.setBackground();
    o.setHandlers();
    return o;
  }

  $(document).ready(function () {
    LogoController();
  });
  $(function () {
    var header = $(".header"),
      menuBtn = header.find(".menu-bth"),
      exampleLink = $(".example-link");

    menuBtn.on("click", function () {
      $(this).parent().toggleClass("expand");
    });

    var menuHeight, promoHeight;
    var oldScroll = 0,
      oScroll2 = 0;

    function updateHeights() {
      menuHeight = header.outerHeight();
      promoHeight = $(".promo").outerHeight();
    }

    updateHeights();

    function moveEditorRightPanel() {
      var wy = $(window).scrollTop();
      var threshold = $(".section.examples").offset().top - $("header.header").outerHeight();
      var threshold2 = $(".section.examples").offset().top + $(".section.examples").outerHeight() - 100;
      var e = $(".section.examples .controls .controls-place");
      var rpe = $(".section.examples .controls");
      if (wy > threshold && wy < oScroll2) {
        e.addClass("shifted-down");
      } else {
        e.removeClass("shifted-down");
      }
      if (wy > threshold && wy < threshold2) {
        e.css("position", "fixed");
        e.css("width", $(".editor.right-panel").outerWidth());
        e.css("right", "0");
        e.css("z-index", "9999");
        rpe.addClass("controls-fixed");
      } else {
        e.css("position", "static");
        e.css("width", "auto");
        e.css("right", "auto");
        rpe.removeClass("controls-fixed");
      }
      oScroll2 = wy;
    }

    function updateMenuClass() {
      var threshold = $(".main-logo").offset().top - menuHeight;
      var hidethreshold = promoHeight;
      if ($(window).scrollTop() >= threshold) {
        header.addClass("not-main-view");
        exampleLink.addClass("change-link");
      } else {
        header.removeClass("not-main-view");
        exampleLink.removeClass("change-link");
      }
      if ($(window).scrollTop() >= hidethreshold && $(window).scrollTop() < oldScroll) {
        header.removeClass("menu-hidden");
      } else if ($(window).scrollTop() >= hidethreshold) {
        header.addClass("menu-hidden");
      } else {
        header.removeClass("menu-hidden");
      }

      oldScroll = $(window).scrollTop();
    }

    var lastTestimonial = 99999;

    function ShowTestimonial(i) {
      $(".side.review .review-item").hide();
      $("#review-item-" + i).show();
      return i;
    }

    function GetRandomI() {
      var e = $(".side.review .review-item"),
        n = e.length;
      var i = Math.round(Math.random() * 100) % n;
      if (i === lastTestimonial) {
        i = GetRandomI();
      } else {
        lastTestimonial = i;
      }
      return i;
    }

    function RandomizeTestimonials() {
      ShowTestimonial(GetRandomI());
    }

    $(window).resize(function () {
      updateHeights();
      updateMenuClass();
      moveEditorRightPanel();
    });

    $(document).scroll(function () {
      updateMenuClass();
      moveEditorRightPanel();
    });
    $(document).ready(function () {
      RandomizeTestimonials();
    });
    $(".side.review .refresh").click(function () {
      window.ga("send", "event", "link", "click", "testimonials");
      RandomizeTestimonials();
    });
  });

  $(function () {
    $("a.ex-link").click(function () {
      const location = document.location;
      if (
        location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
        location.hostname === this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000
          );
          return false;
        }
      }
    });
  });

  $(function () {
    var socialsLine = $(".link-side.social"),
      socialItem = socialsLine.find(".about-link");

    socialItem.each(function () {
      var hoverItem = $(this);

      hoverItem.on("mouseenter", function () {
        $(this).addClass("hover");
      });

      hoverItem.on("mouseleave", function () {
        $(this).removeClass("hover");
      });
    });
  });
});
