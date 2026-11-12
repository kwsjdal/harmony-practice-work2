import hiLog from '@ohos.hilog';

const TAG = 'DrawApp';

export default {
  error(message: string): void {
    hiLog.error(0x0000, TAG, message);
  },
  info(message: string): void {
    hiLog.info(0x0000, TAG, message);
  },
  debug(message: string): void {
    hiLog.debug(0x0000, TAG, message);
  }
};
