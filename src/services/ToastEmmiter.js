import { toast } from "react-toastify";

class ToastEmitter {
  static info(message) {
    toast.info(message);
  }
  static error(message) {
    toast.error(message);
  }
  static success(message) {
    toast.success(message);
  }
}

export default ToastEmitter;
