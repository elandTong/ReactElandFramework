import React from 'react';
import '../assets/style/screen.main.scss';
import Config from '../Config';
import Spiner from '../modal/Spiner';
import Toast from '../modal/Toast';
import BaseScreen from '../router/BaseScreen';
import { ScreenPage } from '../router/Page';
import CategoryList from '../scenes/CategoryList';
import ResUtil from '../utils/ResUtil';
import Tool, { ModalTool } from '../utils/Tool';
import DrawerMenu from '../widget/DrawerMenu';
import FixedModal from '../widget/FixedModal';
import FixedModalGroup from '../widget/FixedModalGroup';
import GestureLock from '../widget/GestureLock';
import Mask from '../widget/Mask';
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
        this.renderToolbar = this.renderToolbar.bind(this)
        this.renderMenu = this.renderMenu.bind(this)
        this.renderDrawerMenu = this.renderDrawerMenu.bind(this)
        this.onMenu = this.onMenu.bind(this)
        this.onBack = this.onBack.bind(this)
        this.closeDrawerHandle = this.closeDrawerHandle.bind(this)
        this.onMenuItemClick = this.onMenuItemClick.bind(this)
        this.onTab1ItemClick = this.onTab1ItemClick.bind(this)
        this.onTab2ItemClick = this.onTab2ItemClick.bind(this)

        this._games = require('../assets/json/games.json')

        this.state = {
            drawerMenu: {
                open: false,
                position: 'right',
                style: {
                },
                maskStyle: {
                },
                render: this.renderDrawerMenu,
                closeHandle: this.closeDrawerHandle
            },
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
            },
            menuFixedModal: {
                visible: false,
                style: { width: '100%', height: '100%' }
            },
            testFixedModal: {
                visible: false
            }
        }
    }

    onStart() {
        if (!Tool.isEmpty(Tool.getLocalStorage(GestureLock._STORAGE_KEY))) {
            import('../modal/GestureLockVerify').then((data) => {
                this.startModal({
                    component: data.default,
                    path: data.default._path,
                    options: { props: {} }
                }, {}, (comp) => {
                })
            })
        }

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

    onTab1ItemClick(item, key, e) {
        this.startModal({ // 意图跳转 不会改变 内置路由池
            component: Spiner,
            path: Spiner._path,
            options: {
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
            options: {
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

    onMenu(e) {
        let _menu = this.state.menuFixedModal
        _menu.visible = true
        this.setState({ menuFixedModal: _menu })

        let _drawer = this.state.drawerMenu
        _drawer.open = !_drawer.open
        this.setState({ drawerMenu: _drawer })
    }

    onBack(e) {
    }

    onMenuItemClick(item, key, e) {
        e.stopPropagation()

        let _test = this.state.testFixedModal
        _test.visible = true
        this.setState({ testFixedModal: _test })

        Config.setAppTheme(item.key)
    }

    closeDrawerHandle(e) {
        let _drawer = this.state.drawerMenu
        _drawer.open = !_drawer.open
        this.setState({ drawerMenu: _drawer })
    }

    renderDrawerMenu() {
        return (
            <div></div>
        )
    }

    renderToolbar(screen) {
        return (
            <div style={{
                width: '100%', height: '100%', background: 'red'
            }}></div>
        )
    }

    renderMenu() {
        return (
            <Mask className={'common-boxsize-full-number common-boxsize-background'} onClick={(e) => {
                let _menu = this.state.menuFixedModal
                _menu.visible = false
                this.setState({ menuFixedModal: _menu })
            }}>
                <ToolbarMenu className={'pos-absolute-nosize'} style={{
                    left: Tool.getScreenSize().w - 101, top: 46
                }} onItemClick={this.onMenuItemClick} />
            </Mask>
        )
    }

    renderContent({ theme, language, getapp }) {
        return (
            <React.Fragment>
                <DrawerMenu {...this.state.drawerMenu}>
                    <ScreenPage options={{
                        toolbarOptions: {
                            title: language.appname,
                            hideBack: true,
                            hideMenu: false,
                            onBack: this.onBack,
                            onMenu: this.onMenu
                        },
                        // renderToolbar: this.renderToolbar,
                        hideToolbar: false
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%'
                        }}>
                            <Navbar initIndex={0}
                                options={{
                                    items: [{ name: language.ctcname }, { name: language.gfcname }],
                                    onSelect: (key, e) => { }
                                }}
                                getSwiper={() => { return this._swiperCompRef }}
                                ref={(comp) => { this._navbarCompRef = comp }} />

                            <TabSwiper init={0}
                                allowTouchMove={true}
                                width={'100%'}
                                height={Tool.getScreenContHeight() - 45}
                                onSelect={(i) => { }}
                                getNavbar={() => { return this._navbarCompRef }}
                                ref={(comp) => { this._swiperCompRef = comp }}>
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
                                                        icon={ResUtil.requireIcon(`games/game_${item.id}.png`, theme)}
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
                                                        icon={ResUtil.requireIcon(`games/game_${item.id}.png`, theme)}
                                                        onItemClick={this.onTab2ItemClick} />
                                                )
                                            }))}
                                        </Minirefresh>
                                    </div>
                                </TabSlide>
                            </TabSwiper>
                        </div>
                    </ScreenPage>
                </DrawerMenu>

                <FixedModalGroup>
                    <FixedModal {...this.state.menuFixedModal}>
                        {this.renderMenu()}
                    </FixedModal>

                    <FixedModal {...this.state.testFixedModal} onClick={(e) => {
                        let _test = this.state.testFixedModal
                        _test.visible = false
                        this.setState({ testFixedModal: _test })
                    }}>
                        <div style={{
                            width: 200,
                            height: 200,
                            fontSize: 20,
                            color: 'yellow',
                            background: 'red'
                        }} >
                            <span>{'这是模态组件!'}</span>
                        </div>
                    </FixedModal>
                </FixedModalGroup>
            </React.Fragment>
        )
    }
}

export default Main
