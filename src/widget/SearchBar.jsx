import React from 'react';
import Config from '../config';
import Resource from '../tool/Resource';
import Tool from '../tool/Tool';

class SearchBar extends React.Component {
    sh_start = 'start'

    sh_end = 'end'

    constructor(props) {
        super(props)

        this.state = {
            padding: 12,
            radius: 18,
            placeholder: '',
            currMode: this.sh_start, // start or end
            val: '',
            bg: 'rgba(80,80,80,0.5)',
            color: Config.Theme.color.font
        }
    }

    onSearchClick(e) {
        if (this.state.currMode === this.sh_start) {
            if (this.state.val === null || this.state.val === '') {
                Tool.showToast(Config.LanguageUse.search.none)

                return
            }

            this.setState({
                currMode: this.sh_end
            })

            if (this.props.onSearch) {
                this.props.onSearch(this.state.val)
            }
        } else {
            this.setState({
                val: '',
                currMode: this.sh_start
            })

            if (this.props.onSearch) {
                this.props.onSearch('')
            }
        }
    }

    onSearchChanged(v) {
        this.setState({ val: v })

        if (this.props.onChange) {
            this.props.onChange(v)
        }

        if (v === null || v === '') {
            this.setState({ currMode: this.sh_start })
        }
    }

    render() {

        let _style = {
            root: {
                width: '100%',
                height: this.props.height,
                paddingLeft: this.state.padding,
                paddingRight: this.state.padding,
                borderRadius: this.props.radius ? this.props.radius : this.state.radius,
                background: this.props.bg ? this.props.bg : this.state.bg
            },
            input: {
                width: '90%',
                height: '100%',
                outline: 'medium',
                border: 'none',
                background: 'transparent',
                fontSize: 14,
                color: this.props.color ? this.props.color : this.state.color
            },
            submit: {
                root: {
                    height: '60%'
                },
                icon: {
                    height: '100%'
                }
            }
        }

        let start = (
            <img src={Resource.getIconRes('icon_serch_start')} style={_style.submit.icon} alt={''} />
        )

        let end = (
            <img src={Resource.getIconRes('icon_serch_clear')} style={_style.submit.icon} alt={''} />
        )

        return (
            <div className={'display-space'} style={_style.root}>
                <input style={_style.input} placeholder={this.props.placeholder} value={this.state.val} onChange={(e) => {
                    this.onSearchChanged(e.target.value)
                }} />

                <div className={'click_out_ripple'} style={_style.submit.root} onClick={(e) => {
                    this.onSearchClick(e)
                }}>
                    {this.state.currMode === this.sh_start ? start : end}
                </div>
            </div>
        )
    }
}

export default SearchBar
