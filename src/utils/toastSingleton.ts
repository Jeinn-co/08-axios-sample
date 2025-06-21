import toast from 'react-hot-toast';

let lastMessage = '';
let lastToastTime = 0;

export function showToast(type: 'success' | 'error' | 'info', message: string) {
  const now = Date.now();
  if (message === lastMessage && now - lastToastTime < 2000) {
    return; // 阻擋 2 秒內重複訊息
  }
  lastMessage = message;
  lastToastTime = now;

  if (type === 'success') toast.success(message);
  else if (type === 'error') toast.error(message);
  else toast(message);
}
