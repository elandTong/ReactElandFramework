import React from 'react';
import BaseActived from '../router/BaseActived';
import { ActivePage } from '../router/Page';
import Tool from '../tool/Tool';
import Banner from '../widget/Banner';
import Button from '../widget/Button';
import ListButton from '../widget/ListButton';
import MarqueeBar from '../widget/MarqueeBar';
import Minirefresh from '../widget/Minirefresh';
import Navbar from '../widget/Navbar';
import Preblock from '../widget/Preblock';
import SearchBar from '../widget/SearchBar';
import { TabSlide, TabSwiper } from '../widget/Swiper';
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
                    <Preblock opts={{
                        loadStatus: false,
                        sorryStatus: false,
                        sorryOpts: {
                            button: {
                                active: true,
                                onClick: (e) => {
                                }
                            }
                        }
                    }}>
                        <div>{'hahhhshahs哈哈哈·'}</div>
                    </Preblock>
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
                <Minirefresh options={{
                    up: {
                        isAuto: true,
                        loadFull: {
                            isEnable: true,
                        }
                    },
                    down: {
                        isAuto: true
                    }
                }} pullDown={(comp) => {
                    if (comp instanceof Minirefresh) {
                        setTimeout(() => {
                            comp.endDownLoading(true, '更新成功!')
                        }, 3000)
                    }
                }} pullUp={(comp) => {
                    if (comp instanceof Minirefresh) {
                        setTimeout(() => {
                            comp.endUpLoading(true)
                        }, 3000)
                    }
                }}>
                    {'ashahjabkbasbuyysavbhjsav'.split('').map((it, key) => {
                        return (
                            <div style={{
                                width: '100%',
                                height: 52,
                                marginBottom: 2,
                                background: 'red'
                            }}>
                                {`这是一条数据 ${it} key:${key}`}
                            </div>
                        )
                    })}
                </Minirefresh>
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
            id: 'testpopupid1',
            x: 100, y: 100
        }, (
            <div style={{
                width: 100,
                height: 100,
                background: 'blue'
            }} onClick={(e) => {
                this.closePopup('testpopupid1')
            }} />
        ))
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

                        this.showPopup('testpopupid1')
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
                            name: '111'
                        }, {
                            name: '222'
                        }, {
                            name: '333'
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
                            <div style={{
                                width: '100%',
                                height: '100%'
                            }}>
                                <Button className={'_test_classname_button_'} style={{
                                }} opts={{
                                    name: '按钮期号',
                                    solid: false,
                                    onClick: (e) => {
                                    }
                                }} />
                            </div>
                        </TabSlide>
                        <TabSlide>
                            <div style={{
                                width: '100%',
                                height: '100%'
                            }}>
                                <ListButton initIndex={0} opts={{
                                    items: [{
                                        name: '111'
                                    }, {
                                        name: '222'
                                    }, {
                                        name: '333'
                                    }],
                                    onChange: (item, key) => {
                                    }
                                }} />
                            </div>
                        </TabSlide>
                        <TabSlide>
                            <div style={{
                                width: '100%',
                                height: '100%'
                            }}>
                                <Banner opts={{
                                    items: [
                                        { src: 'https://pjd.bctt.cc/LG/pjd/h5/pic/app/HomeBanner0.png' },
                                        { src: 'https://pjd.bctt.cc/LG/pjd/h5/pic/app/HomeBanner0.png' },
                                        { src: 'https://pjd.bctt.cc/LG/pjd/h5/pic/app/HomeBanner0.png' }
                                    ],
                                    navActive: false,
                                    pagActive: true,
                                    onActiveIndex: (index) => {
                                    },
                                    onItemClick: (it, key, e) => {
                                    }
                                }} className={'_test_banner_classname_'} style={{
                                    width: '100%',
                                    height: 100
                                }} />

                                <MarqueeBar text={'哈哈哈哈睡觉啊不信你看下阿克肖年科就安心叫阿卡哈哈哈哈睡觉啊不信你看下阿克肖年科就安心叫阿卡哈哈哈哈睡觉啊不信你看下阿克肖年科就安心叫阿卡'} />

                                <SearchBar className={'_test_search_classname'} style={{
                                    marginTop: 20
                                }} onSearch={(v) => {
                                }} onChange={(v) => {
                                }} />
                            </div>
                        </TabSlide>
                    </TabSwiper>
                </div>
            </ActivePage>
        )
    }
}

export default Main

export { Main, Test, Test2 };
