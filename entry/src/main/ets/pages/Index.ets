@Entry
@Component
struct Index {
  @State message: string = '点击开始抽奖';
  @State isSpinning: boolean = false;

  build() {
    Column() {
      Text(this.message)
        .fontSize(24)
        .margin({ bottom: 50 })

      Button('开始抽奖')
        .width(200)
        .height(60)
        .fontSize(20)
        .enabled(!this.isSpinning)
        .onClick(() => {
          this.startLottery();
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }

  startLottery(): void {
    this.isSpinning = true;
    this.message = '抽奖中...';
    
    const prizes: string[] = ['一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '六等奖', '七等奖', '八等奖'];
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * prizes.length);
      this.message = '恭喜获得：' + prizes[randomIndex];
      this.isSpinning = false;
    }, 2000);
  }
}
