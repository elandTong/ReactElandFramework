/*
 * @Author: Eland.Tong
 * @Date: 2020-04-22 17:38:57
 * @Description: comp testing
 */
import DialogBox from './modal/DialogBox'
import Spiner from './modal/Spiner'
import { RouterTool } from './utils/Tool'

class Testing {
    static Test1() {
        RouterTool.navigationModal(Spiner._path, {}, (comp) => {
            comp.setText('你好!哈哈', true)
        })
    }

    static Test2() {
        RouterTool.navigationModal(DialogBox._path, {
            title: '标题',
            content: '你好我是SPA框架',
            onSure: (e) => {
            }
        })
    }
}

export default Testing
