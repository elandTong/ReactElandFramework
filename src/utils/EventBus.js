class EventBus {
    subs = []

    constructor() {
        this.subs = []
    }

    emit(event) {
        if (!event) {
            return false
        }

        event.theme = event.theme || 'all'

        let _succ = false

        for (let i = 0; i < this.subs.length; i++) {
            let _it = this.subs[i]

            if (_it.theme === event.theme && _it.handle) {
                _it.handle(event)

                _succ = true
            }
        }

        return _succ
    }

    onemit(theme = 'all', handle) {
        if (!handle) {
            return false
        }

        this.subs.push({
            theme: theme,
            handle: handle
        })

        return true
    }

    remove(handle) {
        if (!handle) {
            return false
        }

        let _startlen = this.subs.length

        this.subs = this.subs.filter((item) => {
            return !(item.handle === handle)
        })

        if (this.subs.length === _startlen) {
            return false
        } else {
            return true
        }
    }
}

class Emit {
    static _eventbus = new EventBus()

    static on(theme, handle) {
        return this._eventbus.onemit(theme, handle)
    }

    static exe(event) {
        return this._eventbus.emit(event)
    }

    static remove(handle) {
        return this._eventbus.remove(handle)
    }

    /**
     * 危险方法
     * 将清除所有事件监听
    */
    static reset() {
        this._eventbus = new EventBus()
    }
}

export { EventBus, Emit }

export default Emit
