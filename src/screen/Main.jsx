import React from 'react';
import '../assets/style/screen.main.scss';
import Config from '../Config';
import Spiner from '../modal/Spiner';
import Toast from '../modal/Toast';
import BaseScreen from '../router/BaseScreen';
import { ScreenPage } from '../router/Page';
import LotteryGame from '../scenes/LotteryGame';
import NetApi from '../utils/NetApi';
import Tool, { ModalTool } from '../utils/Tool';
import FixedModal from '../widget/FixedModal';
import Minirefresh from '../widget/Minirefresh';
import Navbar from '../widget/Navbar';
import { TabSlide, TabSwiper } from '../widget/Swiper';
import ToolbarMenu from '../widget/ToolbarMenu';
import Login from './Login';

class Main extends BaseScreen {
    static _path = '/main'

    _swiperCompRef = null

    _navbarCompRef = null

    _jsondata = null

    constructor(props) {
        super(props)
        this._jsondata = require('../assets/json/lotterys.json')
        this.state = {
            title: Config.LANGUAG_USE.appname,
            refresh: {
                up: {
                    isLock: true,
                    isAuto: true,
                    loadFull: {
                        isEnable: true,
                    }
                },
                down: {
                    isAuto: false,
                    loadFull: {
                        isEnable: true,
                    }
                }
            },
            data: {
                ctc: this._jsondata.ctc,
                gfc: this._jsondata.gfc
            }
        }
    }

    onCreate() {
        super.onCreate()

        this.pushPopups([{
            pame: {
                id: 'toolbarmenu',
                // x: 0, y: 0,
                // className: '' // 作用于弹出壳
            },
            comp: (
                <FixedModal className={'common-boxsize-full-number common-boxsize-background'} onClick={(e) => {
                    this.closePopup('toolbarmenu')
                }}>
                    <ToolbarMenu className={'pos-absolute-nosize'} style={{
                        left: Tool.getScreenSize().w - 101, top: 46
                    }} onItemClick={(item, key, e) => {
                        Config.setAppTheme(item.key)
                    }} />
                </FixedModal>
            )
        }])

        console.warn('screen main on create!')
    }

    onStart() {
        console.warn('screen main on start!')
    }

    onResume() {
        console.warn('screen main on resume!')
    }

    onPause() {
        console.warn('screen main on pause!')
    }

    onStop() {
        console.warn('screen main on stop!')
    }

    onData(data) {
        super.onData(data)

        console.warn('screen main on data', data)
    }

    onNativeBack(isStacktop, data) {
        super.onNativeBack(isStacktop, data)
    }

    onTab1ItemClick(item, key, e) {
        this.startModal({ // 意图跳转 不会改变 内置路由池
            component: Spiner,
            path: Spiner._path,
            opts: {
                props: {
                }
            }
        }, {
            message: '这是main页面传递的Spiner数据'
        }, (comp) => {
            comp.setText('你好,SpaRouter世界!', true)
        })

        ModalTool.showToast(null, (comp) => {
            comp.setText('你好,SpaRouter世界', Toast.LONG)
        })

        // 如果 Toast 在内置路由池内 则可以:
        // this.navigationModal(Toast._path, null, (comp) => { comp.setText('哈哈哈哈😄------') })

        console.error('tab1 click item', item, ' key', key)
    }

    onTab2ItemClick(item, key, e) {
        this.startScreen({
            component: Login,
            path: Login._path,
            opts: {
                props: {
                }
            }
        }, {
            message: '这是main页面传递的数据'
        })

        console.error('tab2 click item', item, ' key', key)
    }

    setCtcData(games = []) {
        let _data = this.state.data

        for (let _it of _data.ctc) {
            _it.games = games.filter((_gt) => {
                return _it.id === _gt.class
            })
        }

        return _data.ctc
    }

    setGfcData(games = []) {
        let _data = this.state.data

        for (let _it of _data.gfc) {
            _it.games = games.filter((_gt) => {
                return _it.id === _gt.class
            })
        }

        return _data.gfc
    }

    setData(games = []) {
        let _data = this.state.data

        let _hkgs = []

        for (let _it of games) {
            switch (_it.apicode) {
                case 'lottery': {
                    _data.ctc = this.setCtcData(_it.games)
                    break
                }
                case 'gfc': {
                    _data.gfc = this.setGfcData(_it.games)
                    break
                }
                case 'lotto': {
                    _hkgs = _it.games
                    break
                }
                default: {
                    break
                }
            }
        }

        for (let _it of _data.ctc) {
            if (_it.id === 'hk6') {
                _it.games = _it.games.concat(_hkgs)
            }
        }

        this.setState({ data: _data })

        console.error('main update setdata', _data)
    }

    update(comp) {
        NetApi.call('game/getGames', {}, (data) => {
            if (data.code === 0) {
                for (let _item of data.result) {
                    if (_item.no === 10) {
                        this.setData(_item.games)
                        break
                    }
                }

                if (comp instanceof Minirefresh) {
                    comp.endDownLoading(true)
                }
            }
        }, (err) => {
            if (comp instanceof Minirefresh) {
                comp.endDownLoading(false)
            }
        })
    }

    renderContent({ theme, language, getapp }) {
        return (
            <ScreenPage opts={{
                toolbar: {
                    title: this.state.title,
                    hideBack: true,
                    hideMenu: false,
                    onBack: (e) => {
                    },
                    onMenu: (e) => {
                        this.showPopup('toolbarmenu')
                    }
                },
                hideToolbar: false
            }}>
                <div style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <Navbar initIndex={0} opts={{
                        items: [{
                            name: Config.LANGUAG_USE.ctcname
                        }, {
                            name: Config.LANGUAG_USE.gfcname
                        }],
                        onSelect: (key, e) => {
                        }
                    }} getSwiper={() => {
                        return this._swiperCompRef
                    }} ref={(comp) => {
                        if (comp) {
                            this._navbarCompRef = comp
                        }
                    }} />

                    <TabSwiper init={0}
                        allowTouchMove={true}
                        width={'100%'}
                        height={Tool.getScreenContHeight() - 45}
                        onSelect={(i) => {
                        }}
                        getNavbar={() => {
                            return this._navbarCompRef
                        }}
                        ref={(comp) => {
                            if (comp) {
                                this._swiperCompRef = comp
                            }
                        }}>
                        <TabSlide>
                            <div className={'common-boxsize-full'}>
                                <Minirefresh className={'screen-main-slide-background'} options={this.state.refresh}
                                    pullDown={(comp) => {
                                        this.update(comp)
                                    }}>
                                    {Tool.insertSplitline(this.state.data.ctc.filter((item) => {
                                        return item.games && item.games.length > 0
                                    }).map((item, key) => {
                                        return (
                                            <LotteryGame key={key} data={item} onItemClick={(subitem, subkey, e) => {
                                                this.onTab1ItemClick(subitem, subkey, e)
                                            }} />
                                        )
                                    }))}
                                </Minirefresh>
                            </div>
                        </TabSlide>

                        <TabSlide>
                            <div className={'common-boxsize-full'}>
                                <Minirefresh className={'screen-main-slide-background'} options={this.state.refresh}
                                    pullDown={(comp) => {
                                        this.update(comp)
                                    }}>
                                    {Tool.insertSplitline(this.state.data.gfc.filter((item) => {
                                        return item.games.length > 0
                                    }).map((item, key) => {
                                        return (
                                            <LotteryGame key={key} data={item} onItemClick={(subitem, subkey, e) => {
                                                this.onTab2ItemClick(subitem, subkey, e)
                                            }} />
                                        )
                                    }))}
                                </Minirefresh>
                            </div>
                        </TabSlide>
                    </TabSwiper>
                </div>
            </ScreenPage>
        )
    }
}

export default Main
