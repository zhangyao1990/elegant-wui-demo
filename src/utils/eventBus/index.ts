type Listener = (...args: any[]) => void

class CustomEventEmitter {
  private events: { [eventName: string]: Listener[] } = {}

  on(eventName: string, listener: Listener): void {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(listener)
  }

  off(eventName: string, listener: Listener): void {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((l) => l !== listener)
    }
  }

  emit(eventName: string, ...args: any[]): void {
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener) => listener(...args))
    }
  }

  removeAllListeners(eventName: string): void {
    this.events[eventName] = []
  }
}

const customEventBus = new CustomEventEmitter()

export default customEventBus
