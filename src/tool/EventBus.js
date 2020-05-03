import Tool from './Tool'

export default class EventBus {
    eventsubs = []

    constructor() {
        this.eventsubs = []
    }

    emit(_event) { // 事件发布
        if (!_event) { return false }

        _event.theme = _event.theme ? _event.theme : 'all'

        let succ = false

        for (let i = 0; i < this.eventsubs.length; i++) {
            let _it = this.eventsubs[i]

            if (_it.theme === _event.theme && _it.callBack) {
                _it.callBack(_event)

                succ = true
            }
        }

        return succ
    }

    emits(_events) { // 事件组发布
        if (!_events || _events.length === 0) {
            return
        }

        for (let i = 0; i < _events.length; i++) {
            this.emit(_events[i])
        }
    }

    subscribe(theme = 'all', index, handle) { // 事件订阅,index唯一标识
        if (!handle || !index || this._checkIndex(index) >= 0) {
            return false
        }

        this.eventsubs.push({
            theme: theme,
            index: index,
            callBack: handle
        })

        console.log('event sub theme:' + theme + ' index:' + index)

        return true
    }

    subscribeForce(theme = 'all', handle) {
        if (!handle) {
            return
        }

        let index = Tool.uuid()

        this.eventsubs.push({
            theme: theme,
            index: index,
            callBack: handle
        })

        console.log('event subForce theme:' + theme + ' index:' + index)

        return index
    }

    // 取消订阅
    unsubscribe(index) {
        if (this.eventsubs.length === 0 || !index) {
            return false
        }

        let i = this._checkIndex(index)

        if (i >= 0) {
            this.eventsubs.splice(i, 1)

            return true
        } else {
            return false
        }
    }

    // 订阅标识检查
    _checkIndex(index) {
        if (!index) {
            return -2
        }

        // 无效标识
        for (let i = 0; i < this.eventsubs.length; i++) {
            let _it = this.eventsubs[i]

            if (_it.index === index) {
                return i // 已存在的标识
            }
        }

        return -1 // 该标识不存在
    }
}
