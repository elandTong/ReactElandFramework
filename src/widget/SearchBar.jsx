import React from 'react';
import '../assets/style/comp.search.scss';
import BaseContext from '../BaseContext';
import Tool from '../utils/Tool';

class SearchBar extends BaseContext {
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

    renderIcon({ theme, language }) {
        if (this.state.currMode === 0) {
            return (
                <img className={'comp-search-submit-icon'}
                    src={require(`../${theme.resources.iconPath}/ic_serch_start.png`)}
                    alt={'search'} />
            )
        } else {
            return (
                <img className={'comp-search-submit-icon'}
                    src={require(`../${theme.resources.iconPath}/ic_serch_clear.png`)}
                    alt={'search'} />
            )
        }
    }

    renderContent({ theme, language }) {
        return (
            <div className={`display-space comp-search-root ${this.props.className || ''}`} style={this.props.style}>
                <input className={'comp-search-input'}
                    placeholder={this.props.placeholder}
                    value={this.state.val} onChange={(e) => {
                        this.onSearchChanged(e.target.value)
                    }} />

                <div className={'click-out-ripple comp-search-submit-root'} onClick={(e) => {
                    this.onSearchClick(e)
                }}>
                    {this.renderIcon({ theme, language })}
                </div>
            </div>
        )
    }
}

export default SearchBar
