import PropTypes from 'prop-types'
import React from 'react'
import '../assets/style/comp.select.panel.scss'
import BaseContext from '../BaseContext'
import ResUtil from '../utils/ResUtil'
import FixedModal from './FixedModal'
import FixedModalGroup from './FixedModalGroup'
import Mask from './Mask'
import TouchEffect from './TouchEffect'

class SelectPanel extends BaseContext {
    static propTypes = {
        items: PropTypes.array,
        currIndex: PropTypes.number,
        onItemClick: PropTypes.func,
        format: PropTypes.func
    }

    static defaultProps = {
        items: [],
        currIndex: 0,
        onItemClick: function (item, key, e) {
        },
        format: function (item) { return item.name }
    }

    constructor(props) {
        super(props)

        this.state = {
            panelStyle: {},
            fixedModal: {
                visible: false,
                style: { width: '100%', height: '100%' }
            }
        }
    }

    closePanel(e) {
        let _modal = this.state.fixedModal
        _modal.visible = false
        this.setState({ fixedModal: _modal })
    }

    onClick(e) {
        let _dom = e.currentTarget
        if (_dom instanceof HTMLElement) {
            let _modal = this.state.fixedModal
            _modal.visible = true
            this.setState({
                fixedModal: _modal,
                panelStyle: {
                    top: _dom.offsetTop + _dom.offsetHeight
                }
            })
        }
    }

    onItemClick(item, key, e) {
        this.closePanel()
        this.props.onItemClick(item, key, e)
    }

    renderContent({ theme, language }) {
        return (
            <React.Fragment>
                <TouchEffect className={'comp-select-panel-root common-display-center'} onClick={this.onClick.bind(this)}>
                    <span>{this.props.format(this.props.items[this.props.currIndex])}</span>
                    <img height={'40%'}
                        style={{ marginLeft: 10 }}
                        src={ResUtil.requireIcon(`ic_${this.state.fixedModal.visible ? 'bot' : 'top'}_arrow.png`)}
                        alt={'arrow'} />
                </TouchEffect>

                <FixedModalGroup>
                    <FixedModal {...this.state.fixedModal}>
                        <Mask style={{ background: 'rgba(0,0,0,0.2)' }} onClick={this.closePanel.bind(this)}>
                            <div className={'comp-select-panel-content'} style={Object.assign({}, this.state.panelStyle)}>
                                {this.props.items.map((item, key) => {
                                    let _selectClass = this.props.currIndex === key ? 'comp-select-panel-item-select' : ''
                                    let _deepClass = (Number(key) + 1) % 2 === 0 ? 'comp-select-panel-item-deep' : ''

                                    return (
                                        <TouchEffect key={key}
                                            className={`comp-select-panel-item common-display-space-between ${_deepClass} ${_selectClass}`}
                                            onClick={this.onItemClick.bind(this, item, key)}>
                                            <span>
                                                {this.props.format(item)}
                                            </span>

                                            {key === this.props.currIndex ? (
                                                <img height={'40%'} src={ResUtil.requireIcon('ic_hook.png')} alt={'hook'} />
                                            ) : (null)}
                                        </TouchEffect>
                                    )
                                })}
                            </div>
                        </Mask>
                    </FixedModal>
                </FixedModalGroup>
            </React.Fragment>
        )
    }
}

export default SelectPanel
