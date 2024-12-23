class LocalStorageServices {
  static setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static getItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  static clearAll() {
    localStorage.clear();
  }
}

export default LocalStorageServices;
