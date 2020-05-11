import React from 'react';
import '../assets/style/active.main.scss';
import Config from '../config';
import BaseActived from '../router/BaseActived';
import { ActivePage } from '../router/Page';
import Tool from '../tool/Tool';
import Modal from '../widget/Modal';
import Navbar from '../widget/Navbar';
import { TabSlide, TabSwiper } from '../widget/Swiper';
import ListButton from '../widget/ListButton';
import ToolbarMenu from '../widget/ToolbarMenu';
import Login from './Login';

class Main extends BaseActived {
    static _path = '/main'

    _swiperCompRef = null

    _navbarCompRef = null

    constructor(props) {
        super(props)

        this.state = {
            title: Config.LANGUAGE_USE.appname
        }

        this.pushPopups([{
            pame: {
                id: 'toolbarmenu',
                // x: 0, y: 0,
                // className: '' // 作用于弹出壳
            },
            comp: (
                <Modal className={'common-boxsize-full-number'} onClick={(e) => {
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

        this.init()
    }

    init() {
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

                        this.startActive({
                            component: Login,
                            path: Login._path,
                            opts: {
                                props: {
                                }
                            }
                        }, (comp) => {
                            comp.onData('test start active ondata')
                        })
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
                            <div className={'common-boxsize-full active-main-slide-background'}>
                                <ListButton opts={{
                                    items: [{ name: '1111' }, { name: '2222' }, { name: '3333' }]
                                }} />
                            </div>
                        </TabSlide>

                        <TabSlide>
                            <div className={'common-boxsize-full active-main-slide-background'}>
                            </div>
                        </TabSlide>
                    </TabSwiper>
                </div>
            </ActivePage>
        )
    }
}

export default Main
