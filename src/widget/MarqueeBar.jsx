import React from 'react';
import Marquee from 'react-marquee';
import '../assets/style/comp.marquee.scss';
import BaseContext from '../BaseContext';

class MarqueeBar extends BaseContext {
    constructor(props) {
        super(props)

        this.state = {}
    }

    renderContent({ theme, language }) {
        return (
            <div className={'comp-marquee-root'}>
                <img className={'comp-marquee-imag'} src={require(`../${theme.resources.iconPath}/ic_horn.png`)} alt={'marquee'} />

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
