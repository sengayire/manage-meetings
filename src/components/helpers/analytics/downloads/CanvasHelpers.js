const addDonut = (ctx, offsetX, offsetY, middleAngle) => {
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.moveTo(100 + offsetX, 100 + offsetY);
  ctx.arc(100 + offsetX, 100 + offsetY, 55, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.font = '25px Arial';
  ctx.fillText(`${middleAngle}%`, 80 + offsetX, 110 + offsetY);
};

export const drawPieDonut = (canvas, sections, donut, middleAngle) => {
  const ctx = canvas.getContext('2d');

  const offset = 10;
  let beginAngle = 0;
  let endAngle = Math.PI * -0.5;
  let offsetX;
  let offsetY;
  let medianAngle;

  sections.forEach(({ angle, color }) => {
    beginAngle = endAngle;
    endAngle += angle;
    medianAngle = (endAngle + beginAngle) / 2;
    offsetX = donut ? 0 : (Math.cos(medianAngle) * offset) / 4;
    offsetY = donut ? 0 : (Math.sin(medianAngle) * offset) / 4;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(100 + offsetX, 100 + offsetY);
    ctx.arc(100 + offsetX, 100 + offsetY, 75, beginAngle, endAngle);
    ctx.lineTo(100 + offsetX, 100 + offsetY);
    ctx.fill();
    if (donut) {
      addDonut(ctx, offsetX, offsetY, middleAngle);
    }
  });
};

export const drawLine = (ctx, startX, startY, endX, endY, color) => {
  ctx.save();
  ctx.strokeSytle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
};

export const drawBar = (ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
};

export class BarChart {
  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.data = options.data;
    this.ctx = this.canvas.getContext('2d');
    this.labels = Object.keys(this.data);
    this.colors = options.colors;
  }

  getMaxValue() {
    let maxValue = 0;
    this.labels.forEach((date) => {
      maxValue = Math.max(maxValue, this.data[date]);
    });
    return maxValue;
  }

  draw() {
    const maxValue = this.getMaxValue();
    const {
      data, padding, gridColor,
    } = this.options;
    const { height, width } = this.canvas;
    const labels = Object.keys(data);

    const canvasActualHeight = height - (padding * 2);
    const canvasActualWidth = width - (padding * 2);

    let gridValue = 0.1;
    while (gridValue <= maxValue) {
      const gridX = (canvasActualWidth * (gridValue / maxValue)) + padding;
      drawLine(
        this.ctx,
        gridX,
        height - (padding + 4),
        gridX,
        0,
        this.options.gridColor,
      );

      this.ctx.save();
      this.ctx.fillStyle = gridColor;
      this.ctx.font = '14px Arial';
      this.ctx.fillText(gridValue, gridX - 5, height);
      this.ctx.restore();
      gridValue += maxValue / 4;
    }

    const numberOfBars = labels.length;
    const barSize = canvasActualHeight / numberOfBars;

    [...labels].reverse().forEach((label, i) => {
      const val = data[label] + 1;
      const barHeight = Math.round((canvasActualWidth * (val / maxValue)));
      drawBar(
        this.ctx,
        padding,
        (padding - 2) + (i * barSize),
        barHeight,
        barSize - 2,
        this.colors[i % this.colors.length],
      );
    });
  }
}
