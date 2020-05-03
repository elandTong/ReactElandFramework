import React from 'react'
import Resource from '../tool/Resource'
import Config from '../config'
import Marquee from 'react-marquee';

class MarqueeBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            height: 34,
            padding: 20,
            radius: 18,
            background: 'rgba(30,30,30,0.8)',
            icon: {
                src: Resource.getIconRes('icon_gongao'),
                height: '55%'
            },
            text: {
                size: 12,
                color: Config.Theme.color.font
            }
        }
    }

    render() {
        let _height = this.props.height ? this.props.height : this.state.height

        let _loop = this.props.loop ? this.props.loop : true

        let _style = {
            root: {
                width: '100%',
                height: _height,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: this.state.padding,
                paddingRight: this.state.padding,
                borderRadius: this.state.radius,
                background: this.state.background
            },
            cont: {
                width: '96%',
                fontSize: this.state.text.size,
                color: this.state.text.color
            }
        }

        return (
            <div style={_style.root}>
                <img src={this.state.icon.src} height={this.state.icon.height} alt={''} />

                <div style={_style.cont}>
                    <Marquee hoverToStop={true} leading={0} trailing={0} loop={_loop} text={this.props.text} />
                </div>
            </div>
        )
    }
}

export default MarqueeBar
