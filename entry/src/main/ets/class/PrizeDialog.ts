import prompt from '@ohos.prompt';

export default class PrizeDialog {
  static showPrize(winner: string): void {
    prompt.showToast({
      message: `恭喜您获得：${winner}`,
      duration: 3000
    });
  }
}
