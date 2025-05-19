function dark() {
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  var width, height, starCount, ctx;
  var speed = 0.05;
  var canvas = document.getElementById("universe");
  var initial = true;

  var colorGiant = "180,184,240";
  var colorStar = "226,225,142";
  var colorComet = "226,225,224";
  var stars = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    starCount = 0.216 * width;
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
  }

  function drawStars() {
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < stars.length; i++) {
      var star = stars[i];
      star.move();
      star.fadeIn();
      star.fadeOut();
      star.draw();
    }
  }

  function Star() {
    this.reset = function () {
      this.giant = chance(3);
      this.comet = !this.giant && !initial && chance(10);
      this.x = random(0, width - 10);
      this.y = random(0, height);
      this.r = random(1.1, 2.6);

      this.dx =
        random(speed, 6 * speed) +
        (this.comet ? speed * random(50, 120) : 0) +
        2 * speed;
      this.dy =
        -random(speed, 6 * speed) -
        (this.comet ? speed * random(50, 120) : 0);

      this.fadingOut = null;
      this.fadingIn = true;
      this.opacity = 0;
      this.opacityTresh = random(0.2, 1 - 0.4 * (this.comet ? 1 : 0));
      this.do = random(0.0005, 0.002) + (this.comet ? 0.001 : 0);
    };

    this.fadeIn = function () {
      if (this.fadingIn) {
        this.fadingIn = !(this.opacity > this.opacityTresh);
        this.opacity += this.do;
      }
    };

    this.fadeOut = function () {
      if (this.fadingOut) {
        this.fadingOut = !(this.opacity < 0);
        this.opacity -= this.do / 2;

        if (this.x > width || this.y < 0) {
          this.fadingOut = false;
          this.reset();
        }
      }
    };

    this.draw = function () {
      ctx.beginPath();

      if (this.giant) {
        ctx.fillStyle = "rgba(" + colorGiant + "," + this.opacity + ")";
        ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
      } else if (this.comet) {
        ctx.fillStyle = "rgba(" + colorComet + "," + this.opacity + ")";
        ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

        for (var i = 0; i < 30; i++) {
          ctx.fillStyle =
            "rgba(" +
            colorComet +
            "," +
            (this.opacity - (this.opacity / 20) * i) +
            ")";
          ctx.rect(this.x - (this.dx / 4) * i, this.y - (this.dy / 4) * i - 2, 2, 2);
          ctx.fill();
        }
      } else {
        ctx.fillStyle = "rgba(" + colorStar + "," + this.opacity + ")";
        ctx.rect(this.x, this.y, this.r, this.r);
      }

      ctx.closePath();
      ctx.fill();
    };

    this.move = function () {
      this.x += this.dx;
      this.y += this.dy;

      if (this.fadingOut === false) this.reset();

      if (this.x > width - width / 4 || this.y < 0) {
        this.fadingOut = true;
      }
    };

    setTimeout(() => {
      initial = false;
    }, 50);
  }

  function chance(percent) {
    return Math.floor(Math.random() * 1000 + 1) < 10 * percent;
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // 初始化
  resize();
  window.addEventListener("resize", resize, false);

  (function init() {
    ctx = canvas.getContext("2d");
    for (var i = 0; i < starCount; i++) {
      stars[i] = new Star();
      stars[i].reset();
    }
    drawStars();
  })();

  (function animate() {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      drawStars();
    }
    window.requestAnimationFrame(animate);
  })();
}

dark();
