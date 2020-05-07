import React from 'react';
import Marquee from 'react-marquee';
import '../assets/style/comp.marquee.scss';

class MarqueeBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className={'comp-marquee-root'}>
                <img className={'comp-marquee-imag'} src={require('../assets/res/icon/ic_horn.png')} alt={'marquee'} />

                <div className={'comp-marquee-cont'}>
                    <Marquee hoverToStop={true}
                        leading={0} trailing={0}
                        loop={this.props.loop || true}
                        text={this.props.text} />
                </div>
            </div>
        )
    }
}

export default MarqueeBar
