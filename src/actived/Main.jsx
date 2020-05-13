import React from 'react';
import '../assets/style/active.main.scss';
import Config from '../config';
import BaseActived from '../router/BaseActived';
import { ActivePage } from '../router/Page';
import NetApi from '../tool/NetApi';
import Tool from '../tool/Tool';
import LotteryGame from '../widget/business/LotteryGame';
import Minirefresh from '../widget/Minirefresh';
import Modal from '../widget/Modal';
import Navbar from '../widget/Navbar';
import { TabSlide, TabSwiper } from '../widget/Swiper';
import ToolbarMenu from '../widget/ToolbarMenu';
import Toast from '../window/Toast';
import Login from './Login';
import Spiner from '../window/Spiner';

class Main extends BaseActived {
    static _path = '/main'

    _swiperCompRef = null

    _navbarCompRef = null

    _jsondata = require('../assets/json/lotterys.json')

    constructor(props) {
        super(props)

        this.state = {
            title: Config.LANGUAGE_USE.appname,
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

        this.pushPopups([{
            pame: {
                id: 'toolbarmenu',
                // x: 0, y: 0,
                // className: '' // 作用于弹出壳
            },
            comp: (
                <Modal className={'common-boxsize-full-number common-boxsize-background'} onClick={(e) => {
                    this.closePopup('toolbarmenu')
                }}>
                    <ToolbarMenu className={'pos-absolute-nosize'} style={{
                        left: Tool.getScreenSize().w - 101, top: 46
                    }} onItemClick={(item, key, e) => {
                        Config.setAppTheme(item.key)
                    }} />
                </Modal>
            )
        }])
    }

    onBroadcast(data) {
        super.onBroadcast(data)

        console.log('on broadcast for main', data)
    }

    onTab1ItemClick(item, key, e) {
        this.startWindow({ // 意图跳转 不会改变 内置路由池
            component: Login,
            path: Toast._path,
            opts: { props: {} }
        }, (comp) => {
            comp.setText('哈哈哈哈!')
        })

        // 如果 Toast 在内置路由池内 则可以:
        this.navigationWindow(Toast._path, (comp) => { comp.setText('哈哈哈哈------') })

        console.error('tab1 click item', item, ' key', key)
    }

    onTab2ItemClick(item, key, e) {
        this.startActive({
            component: Toast,
            path: Login._path,
            opts: { props: {} }
        }, (comp) => {
            comp.onData({})
        })

        // 如果 Login 在内置路由池内 则可以:
        this.navigationActive(Login._path, (comp) => { comp.onData({}) })

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

    render() {
        return (
            <ActivePage opts={{
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
                            name: Config.LANGUAGE_USE.ctcname
                        }, {
                            name: Config.LANGUAGE_USE.gfcname
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
                        height={Tool.getActContHeight() - 45}
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
                                <Minirefresh className={'active-main-slide-background'} options={this.state.refresh}
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
                                <Minirefresh className={'active-main-slide-background'} options={this.state.refresh}
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
            </ActivePage>
        )
    }
}

export default Main
