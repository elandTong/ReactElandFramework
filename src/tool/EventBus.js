
export default class EventBus {
    subs = []

    constructor() {
        this.subs = []
    }

    emit(event) {
        if (!event) { return false }
        event.theme = event.theme || 'all'
        let succ = false
        for (let i = 0; i < this.subs.length; i++) {
            let _it = this.subs[i]
            if (_it.theme === event.theme && _it.callBack) {
                _it.callBack(event)
                succ = true
            }
        }
        return succ
    }

    onemit(theme = 'all', handle) {
        if (!handle) { return false }
        this.subs.push({
            theme: theme,
            callBack: handle
        })
        return true
    }

    remove(handle) {
        if (!handle) { return false }
        let i = this.check(handle)
        if (i === -1) {
            return false
        } else {
            this.subs.splice(i, 1)
            return true
        }
    }

    check(handle) {
        for (let i = 0; i < this.subs.length; i++) {
            if (this.subs[i].callBack === handle) {
                return i
            }
        }

        return -1
    }
}
