import MiniRefreshTools from 'minirefresh';
import 'minirefresh/dist/debug/minirefresh.css';
import React from 'react';
import '../assets/style/comp.minirefresh.cover.scss';
import Tool from '../utils/Tool';

class Minirefresh extends React.Component {
    _miniRefresh = null

    _miniRefreshComp = null

    _options = null

    constructor(props) {
        super(props)

        this.state = {
            id: `minirefresh-${Tool.uuid()}`
        }
    }

    componentDidMount() {
        this._options = this.props.options

        this._miniRefresh = new MiniRefreshTools.theme.defaults(Object.assign(this._options, {
            container: this._miniRefreshComp || '#minirefresh',
            down: Object.assign(this._options.down || {}, {
                callback: () => {
                    this._pulldown()
                }
            }),
            up: Object.assign(this._options.up || {}, {
                callback: () => {
                    this._pullup()
                }
            })
        }))
    }

    _pulldown() {
        if (this.props.pullDown) {
            this.props.pullDown(this)
        }
    }

    _pullup() {
        if (this.props.pullUp) {
            this.props.pullUp(this)
        }
    }

    endDownLoading(isSuccess, successTips) {
        this._miniRefresh.endDownLoading(isSuccess, successTips)
    }

    endUpLoading(isFinishUp) {
        this._miniRefresh.endUpLoading(isFinishUp)
    }

    render() {
        return (
            <div className={'minirefresh-root-safety'}>
                <div id={this.state.id} className={'minirefresh-wrap'} ref={(comp) => {
                    this._miniRefreshComp = comp
                }}>
                    <div className={`minirefresh-scroll ${this.props.className || 'comp-minirefresh-scroll'}`}>
                        <div className={'minirefresh-root-safety-content'}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Minirefresh
