import React from 'react';
import '../assets/style/comp.search.scss';
import Tool from '../tool/Tool';

class SearchBar extends React.Component {
    _props = {
        onSearch: null, onChange: null
    }

    constructor(props) {
        super(props)

        this.state = {
            currMode: 0, // 0: start 1: end
            val: ''
        }
    }

    onSearchClick(e) {
        if (this.state.currMode === 0) {
            if (Tool.isEmpty(this.state.val)) { return }

            this.setState({ currMode: 1 })

            if (this.props.onSearch) {
                this.props.onSearch(this.state.val)
            }
        } else {
            this.setState({ currMode: 0, val: '' })

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

        if (Tool.isEmpty(v)) {
            this.setState({ currMode: 0 })
        }
    }

    getIcon() {
        if (this.state.currMode === 0) {
            return (
                <img className={'comp-search-submit-icon'}
                    src={require('../assets/res/icon/ic_serch_start.png')}
                    alt={'search'} />
            )
        } else {
            return (
                <img className={'comp-search-submit-icon'}
                    src={require('../assets/res/icon/ic_serch_clear.png')}
                    alt={'search'} />
            )
        }
    }

    render() {
        return (
            <div className={`display-space comp-search-root ${this.props.className || ''}`} style={this.props.style}>
                <input className={'comp-search-input'}
                    placeholder={this.props.placeholder}
                    value={this.state.val} onChange={(e) => {
                        this.onSearchChanged(e.target.value)
                    }} />

                <div className={'click-out-ripple comp-search-submit-root'} onClick={(e) => {
                    this.onSearchClick(e)
                }}> {this.getIcon()} </div>
            </div>
        )
    }
}

export default SearchBar
