import toast from 'react-hot-toast';

const popupError = (msg: string) => {
  return;
  toast.error(msg || 'Internal error');
};

const system = { popupError };
export default system;
