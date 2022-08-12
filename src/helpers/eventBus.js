class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, handler) {
    if (!this[eventName]) {
      this[eventName] = [];
    }
    this[eventName].push(handler);

    return () => {
      this.off(eventName, handler);
    };
  }

  off(eventName, handler) {
    if (!this[eventName]) {
      return;
    }
    const handlerIndex = this[eventName].indexOf(handler);
    this[eventName].splice(handlerIndex, 1);
  }

  emit(eventName, payload) {
    if (!this[eventName]) {
      return;
    }
    this[eventName].forEach(handler => handler(payload));
  }
}

export default new EventBus();
