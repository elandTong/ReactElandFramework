import React from 'react';
import '../assets/style/screen.main.scss';
import Config from '../Config';
import Spiner from '../modal/Spiner';
import Toast from '../modal/Toast';
import BaseScreen from '../router/BaseScreen';
import { ScreenPage } from '../router/Page';
import CategoryList from '../scenes/CategoryList';
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

    _games = null

    constructor(props) {
        super(props)

        this.onTab1ItemClick = this.onTab1ItemClick.bind(this)
        this.onTab2ItemClick = this.onTab2ItemClick.bind(this)

        this._games = require('../assets/json/games.json')

        this.state = {
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
            category: {
                tab1: this._games.tab1,
                tab2: this._games.tab2
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

        console.warn('tab1 click item', item, ' key', key)
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

        console.warn('tab2 click item', item, ' key', key)
    }

    update(comp) {
        setTimeout(() => {
            let _category = this.state.category

            _category.tab1.sort(() => {
                return .5 - Math.random()
            })

            _category.tab2.sort(() => {
                return .5 - Math.random()
            })

            this.setState({ category: _category })

            if (comp instanceof Minirefresh) {
                comp.endDownLoading(true)
            }
        }, 2000)
    }

    renderContent({ theme, language, getapp }) {
        return (
            <ScreenPage opts={{
                toolbar: {
                    title: language.appname,
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
                            name: language.ctcname
                        }, {
                            name: language.gfcname
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
                                    {Tool.insertSplitline(this.state.category.tab1.filter((item) => {
                                        return item.games && item.games.length > 0
                                    }).map((item, key) => {
                                        return (
                                            <CategoryList key={key}
                                                data={item}
                                                icon={require(`../assets/res/icon/games/game_${item.id}.png`)}
                                                onItemClick={this.onTab1ItemClick} />
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
                                    {Tool.insertSplitline(this.state.category.tab2.filter((item) => {
                                        return item.games.length > 0
                                    }).map((item, key) => {
                                        return (
                                            <CategoryList key={key}
                                                data={item}
                                                icon={require(`../assets/res/icon/games/game_${item.id}.png`)}
                                                onItemClick={this.onTab2ItemClick} />
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
