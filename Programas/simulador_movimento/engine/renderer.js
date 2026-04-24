// engine/renderer.js

// Escala visual: 1 metro no sistema matematico = 50 pixels no canvas.
const PIXELS_PER_METER = 50;

export function drawGrid(ctx, canvas) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const step = PIXELS_PER_METER;

  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;

  for (let i = -Math.ceil(canvas.width / (2 * step)); i <= Math.ceil(canvas.width / (2 * step)); i += 1) {
    const x = centerX + i * step;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let i = -Math.ceil(canvas.height / (2 * step)); i <= Math.ceil(canvas.height / (2 * step)); i += 1) {
    const y = centerY - i * step;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

export function drawCoordinateSystem(ctx, canvas) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.stroke();

  ctx.strokeStyle = "#22c55e";
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.stroke();

  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#1f2937";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#1f2937";
  ctx.font = "11px Inter, sans-serif";
  ctx.textAlign = "center";

  const maxX = Math.ceil(canvas.width / (2 * PIXELS_PER_METER));
  for (let i = -maxX; i <= maxX; i += 1) {
    if (i === 0) continue;
    const x = centerX + i * PIXELS_PER_METER;
    ctx.beginPath();
    ctx.moveTo(x, centerY - 5);
    ctx.lineTo(x, centerY + 5);
    ctx.stroke();
    ctx.fillText(`${i}`, x, centerY + 15);
  }

  ctx.textAlign = "right";
  const maxY = Math.ceil(canvas.height / (2 * PIXELS_PER_METER));
  for (let i = -maxY; i <= maxY; i += 1) {
    if (i === 0) continue;
    const y = centerY - i * PIXELS_PER_METER;
    ctx.beginPath();
    ctx.moveTo(centerX - 5, y);
    ctx.lineTo(centerX + 5, y);
    ctx.stroke();
    ctx.fillText(`${i}`, centerX - 10, y + 4);
  }

  ctx.font = "bold 12px Inter, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("(0,0)", centerX + 8, centerY - 8);
  ctx.fillText("x (m)", canvas.width - 42, centerY - 8);
  ctx.fillText("y (m)", centerX + 8, 16);
}

export function drawVector(ctx, x, y, vx, vy, color) {
  const endX = x + vx;
  const endY = y + vy;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  const angle = Math.atan2(vy, vx);
  const size = 6;

  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - size * Math.cos(angle - Math.PI / 6),
    endY - size * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    endX - size * Math.cos(angle + Math.PI / 6),
    endY - size * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

export function mathToPixels(x, y, canvas) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  return {
    px: centerX + x * PIXELS_PER_METER,
    py: centerY - y * PIXELS_PER_METER
  };
}

export function pixelsToMath(px, py, canvas) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  return {
    x: (px - centerX) / PIXELS_PER_METER,
    y: (centerY - py) / PIXELS_PER_METER
  };
}

export function render(ctx, canvas, objects, options) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(ctx, canvas);
  drawCoordinateSystem(ctx, canvas);
  objects.forEach((obj) => obj.draw(ctx, canvas, options));
}

export function getScale() {
  return PIXELS_PER_METER;
}

export function getPixelsPerMeter() {
  return PIXELS_PER_METER;
}
