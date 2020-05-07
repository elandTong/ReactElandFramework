import React from 'react'
import Popup from "./window/Popup"
import Spiner from "./window/Spiner"
import MessageNotice from './widget/MessageNotice'

class Testing {
    static Test1() {
        this.navigationWindow(Spiner._path, (comp) => {
            comp.setText('你好!哈哈')

            setTimeout(() => { comp.close() }, 3000)
        })

        return this
    }

    static Test2() {
        this.navigationWindow(Popup._path, (comp) => {
            comp.onComp((
                <MessageNotice opts={{
                    title: '标题',
                    content: '你好我是SPA框架',
                    onSure: (e) => {
                        comp.close()
                    }
                }} />
            ), {
                width: MessageNotice._size.w,
                height: MessageNotice._size.h,
                angleClose: false,
                outClose: false,
                pos: {
                    align: 'center',
                    left: 10, top: 10
                },
                onClose: (e) => {
                }
            })
        })
    }
}

export default Testing
