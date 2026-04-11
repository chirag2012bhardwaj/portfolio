/* ── CUSTOM CURSOR ── */
var cur = document.getElementById("cursor");
var mx = -300,
  my = -300;
document.addEventListener("mousemove", function (e) {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + "px";
  cur.style.top = my + "px";
});
document.addEventListener("mouseleave", function () {
  cur.style.opacity = "0";
});
document.addEventListener("mouseenter", function () {
  cur.style.opacity = "1";
});

/* ── GRID CANVAS + CURSOR GLOW ── */
var canvas = document.getElementById("grid-canvas");
var ctx = canvas.getContext("2d");
var CELL = 10;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* base grid — small 20px cells */
  ctx.strokeStyle = "rgba(57,255,20,0.05)";
  ctx.lineWidth = 0.5;
  for (var x = 0; x <= canvas.width; x += CELL) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (var y = 0; y <= canvas.height; y += CELL) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  /* cursor coin glow */
  if (mx > -200) {
    var R = 26;
    var grad = ctx.createRadialGradient(mx, my, 0, mx, my, R);
    grad.addColorStop(0, "rgba(57,255,20,0.30)");
    grad.addColorStop(0.45, "rgba(57,255,20,0.12)");
    grad.addColorStop(1, "rgba(57,255,20,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(mx, my, R, 0, Math.PI * 2);
    ctx.fill();

    /* local grid brightening */
    var cx0 = Math.floor(mx / CELL) * CELL;
    var cy0 = Math.floor(my / CELL) * CELL;
    ctx.strokeStyle = "rgba(57,255,20,0.26)";
    ctx.lineWidth = 0.7;
    for (var di = -1; di <= 2; di++) {
      var lx = cx0 + di * CELL;
      if (lx < 0 || lx > canvas.width) continue;
      ctx.beginPath();
      ctx.moveTo(lx, cy0 - CELL);
      ctx.lineTo(lx, cy0 + 2 * CELL);
      ctx.stroke();
    }
    for (var dj = -1; dj <= 2; dj++) {
      var ly = cy0 + dj * CELL;
      if (ly < 0 || ly > canvas.height) continue;
      ctx.beginPath();
      ctx.moveTo(cx0 - CELL, ly);
      ctx.lineTo(cx0 + 2 * CELL, ly);
      ctx.stroke();
    }
  }

  requestAnimationFrame(drawGrid);
}
drawGrid();

/* ── SCROLL REVEAL ── */
function checkReveal() {
  var els = document.querySelectorAll(".reveal");
  for (var i = 0; i < els.length; i++) {
    var rect = els[i].getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.93) {
      els[i].classList.add("visible");
    }
  }
}
window.addEventListener("scroll", checkReveal, { passive: true });
checkReveal();
