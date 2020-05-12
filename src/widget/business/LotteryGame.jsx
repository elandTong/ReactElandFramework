import React from 'react'
import '../../assets/style/busscomp.lottery.scss'
import Config from '../../config'
import Tool from '../../tool/Tool'

class LotteryGameItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    getStatusClassname() {
        switch (this.props.data.status) {
            case 'FP': {
                return 'busscomp-lottery-item-tips-fp'
            }
            case 'GP': {
                return 'busscomp-lottery-item-tips-gp'
            }
            default: {
                return 'busscomp-lottery-item-tips-sj'
            }
        }
    }

    getNameClassname() {
        return this.props.data.apicode === 'lotto' ? 'busscomp-lottery-item-name' : ''
    }

    render() {
        return (
            <div className={`display-center busscomp-lottery-item-root click-out-ripple ${this.props.className || ''}`}
                style={this.props.style}
                onClick={this.props.onClick}>
                <div className={'display-column'}>
                    <span className={`common-text-singleline ${this.getNameClassname()}`}>
                        {this.props.data.sname || 'noname'}
                    </span>

                    <span className={`common-text-singleline busscomp-lottery-item-tips ${this.getStatusClassname()}`}>
                        {this.props.data.tips || Config.LANGUAGE_USE.enter}
                    </span>
                </div>
            </div>
        )
    }
}

class LotteryGame extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    onItemClick(item, key, e) {
        if (this.props.onItemClick) {
            this.props.onItemClick(item, key, e)
        }
    }

    render() {
        return (
            <div className={'display-space busscomp-lottery-root'}>
                <img className={'busscomp-lottery-imag'} src={require(`../../assets/res/icon/lottery/game_${this.props.data.id}.png`)} alt={'lotterygame'} />

                <div className={'display-warp busscomp-lottery-cont-root'}>
                    {Tool.pushFillin(this.props.data.games.map((item, key) => {
                        return (
                            <LotteryGameItem key={key} className={`${key > 3 ? 'busscomp-lottery-item-margin' : ''}`} data={item} onClick={(e) => {
                                this.onItemClick(item, key, e)
                            }} />
                        )
                    }), '23.5%', 4)}
                </div>
            </div>
        )
    }
}

export default LotteryGame
