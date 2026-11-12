import CommonConstants from './CommonConstants';
import PrizeData from './PrizeData';


export default class DrawModel {
  private prizes: PrizeData[] = [];
  private rotationAngle: number = 0;
  private isSpinning: boolean = false;

  constructor() {
    this.initPrizes();
  }

  private initPrizes(): void {
    for (let i = 0; i < CommonConstants.PRIZE_COUNT; i++) {
      this.prizes.push(new PrizeData(CommonConstants.PRIZE_NAMES[i], 1 / CommonConstants.PRIZE_COUNT));
    }
  }

  public draw(canvasContext: any, width: number, height: number): void {
    if (!canvasContext) return;

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;

    canvasContext.save();
    canvasContext.translate(centerX, centerY);
    canvasContext.rotate(this.rotationAngle * Math.PI / 180);

    const sliceAngle = 2 * Math.PI / CommonConstants.PRIZE_COUNT;
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

    for (let i = 0; i < CommonConstants.PRIZE_COUNT; i++) {
      canvasContext.beginPath();
      canvasContext.moveTo(0, 0);
      canvasContext.arc(0, 0, radius, i * sliceAngle, (i + 1) * sliceAngle);
      canvasContext.closePath();
      canvasContext.fillStyle = colors[i % colors.length];
      canvasContext.fill();

      canvasContext.save();
      canvasContext.rotate((i + 0.5) * sliceAngle);
      canvasContext.fillStyle = '#000000';
      canvasContext.font = '14px sans-serif';
      canvasContext.textAlign = 'center';
      canvasContext.fillText(this.prizes[i].name, radius / 2, 5);
      canvasContext.restore();
    }

    canvasContext.restore();
  }

  public startSpin(): Promise<string> {
    return new Promise((resolve) => {
      if (this.isSpinning) return;

      this.isSpinning = true;
      const randomAngle = 360 * 5 + Math.random() * 360;
      const duration = CommonConstants.ROTATION_DURATION;
      const startTime = Date.now();
      const startAngle = this.rotationAngle;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        this.rotationAngle = startAngle + randomAngle * easeProgress;

        if (progress < 1) {
          setTimeout(animate, 16);
        } else {
          this.isSpinning = false;
          const finalAngle = this.rotationAngle % 360;
          const prizeIndex = Math.floor((360 - finalAngle) / (360 / CommonConstants.PRIZE_COUNT)) % CommonConstants.PRIZE_COUNT;
          resolve(this.prizes[prizeIndex].name);
        }
      };

      animate();
    });
  }
}
