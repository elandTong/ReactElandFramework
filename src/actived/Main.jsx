import React from 'react';
import ReactPullToRefresh from 'react-pull-to-refresh';
import BaseActived from '../router/BaseActived';
import { ActivePage } from '../router/Page';
import Tool from '../tool/Tool';
import MessageNotice from '../widget/MessageNotice';
import Navbar from '../widget/Navbar';
import { TabSlide, TabSwiper } from '../widget/Swiper';
import Popup from '../window/Popup';
import Login from './Login';

class Test extends BaseActived {
    static _path = '/test'

    constructor(props) {
        super(props)

        this.state = {
        }

        this.onBroadcast((data) => {
        })
    }

    componentDidMount() {
    }

    render() {
        return (
            <ActivePage opts={{
                toolbar: {
                    title: 'TestTitle',
                    hideBack: false,
                    hideMenu: false,
                    onBack: (e) => {
                        this.finish()
                    },
                    onMenu: (e) => {
                        this.navigationActive(Test2._path, (comp) => {
                            comp.onData(this._indata)
                        })
                    }
                }
            }}>
                <div style={{
                    width: '100%',
                    height: '100%'
                }}>
                    {'test1 active ...'}
                </div>
            </ActivePage>
        )
    }
}

class Test2 extends BaseActived {
    static _path = '/test2'

    constructor(props) {
        super(props)

        this.state = {
        }

        this.onBroadcast((data) => {
        })
    }

    componentDidMount() {
    }

    render() {
        return (
            <ActivePage opts={{
                toolbar: {
                    title: 'Test2Title',
                    hideBack: false,
                    hideMenu: false,
                    onBack: (e) => {
                        this.finish()
                    },
                    onMenu: (e) => {
                        this.navigationActive(Login._path, (comp) => {
                            comp.onData(this._indata)
                        })
                    }
                }
            }}>
                <div style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <ReactPullToRefresh
                        onRefresh={(e) => {
                        }}
                        className="your-own-class-if-you-want"
                        style={{
                            color: 'black',
                            textAlign: 'center'
                        }}>

                        <h3>Pull down to refresh</h3>
                        <div>
                            <div>{'1'}</div>
                            <div>{'1'}</div>
                            <div>{'1'}</div>
                            <div>{'1'}</div>
                        </div>

                        <div>etc.</div>
                    </ReactPullToRefresh>
                </div>
            </ActivePage>
        )
    }
}

class Main extends BaseActived {
    static _path = '/main'
    static _onupdate = 'MAIN_UPDATE'

    _swiperCompRef = null

    _navbarCompRef = null

    constructor(props) {
        super(props)

        Tool._mainAct = this

        this.state = {
        }

        Tool.onEmit(Main._onupdate, (data) => {
            switch (data.type) {
                case 'login': {
                    this.onUpdateStatus()
                    break
                }
                default: {
                    break
                }
            }
        })

        this.pushPopup({
            id: 'popupId1',
            x: 100, y: 100
        }, (
            <div style={{
                width: 100,
                height: 100,
                background: 'blue'
            }} />
        ))
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    onUpdateStatus() {
    }

    render() {
        return (
            <ActivePage opts={{
                toolbar: {
                    title: 'MainTitle',
                    hideBack: true,
                    hideMenu: false,
                    onBack: (e) => {
                    },
                    onMenu: (e) => {
                        this.navigationActive(Test._path, (comp) => {
                            comp.onData('home active click menu')
                        })

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
                                    this.showPopup('popupId1')

                                    setTimeout(() => {
                                        this.closePopup('popupId1')
                                    }, 3000)
                                }
                            })
                        })
                    }
                },
                hideToolbar: false,
                viewBackground2: '',
                toolBackground2: '',
                toolbarComp2: null
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'rgb(120,90,80)'
                }}>
                    <Navbar initIndex={0} opts={{
                        items: [{
                            name: '111'
                        }, {
                            name: '222'
                        }, {
                            name: '333'
                        }],
                        background: 'rgba(0,0,0,0)',
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
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: 'red'
                            }}>
                                <img src={require('../assets/res/icon/ic_menu.png')} height={100} alt={''} />
                            </div>
                        </TabSlide>
                        <TabSlide>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: 'blue'
                            }}></div>
                        </TabSlide>
                        <TabSlide>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: 'rgb(120,200,180)'
                            }}></div>
                        </TabSlide>
                    </TabSwiper>
                </div>
            </ActivePage>
        )
    }
}

export default Main

export { Main, Test, Test2 };
