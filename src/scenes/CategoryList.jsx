import React from 'react'
import '../assets/style/scenes.category.list.scss'
import BaseContext from '../BaseContext'
import Tool from '../utils/Tool'
import PropTypes from 'prop-types'
import TouchEffect from '../widget/TouchEffect'

class CategoryList extends BaseContext {
    constructor(props) {
        super(props)
        this.state = { itemwidth: '23.5%' }
    }

    onItemClick(item, key, e) {
        if (this.props.onItemClick) { this.props.onItemClick(item, key, e) }
    }

    renderContent({ theme, language, getapp }) {
        return (
            <div className={'common-display-space-between scenes-category-list-root'}>
                <img className={'scenes-category-list-imag'} src={this.props.icon} alt={'categoryList'} />
                <div className={'common-display-warp-space-between scenes-category-list-cont-root'}>
                    {Tool.pushFillin(this.props.data.games.map((item, key) => {
                        return (
                            <ListItem key={key} className={`${key > 3 ? 'scenes-category-list-item-margin' : ''}`} data={item} onClick={(e) => {
                                this.onItemClick(item, key, e)
                            }} />
                        )
                    }), this.state.itemwidth, 4)}
                </div>
            </div>
        )
    }
}

class ListItem extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        data: PropTypes.object,
        onClick: PropTypes.func
    }

    static defaultProps = {
        className: '',
        style: null,
        data: {},
        onClick: function (e) {
        }
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    getStatusClassname() {
        switch (this.props.data.status) {
            case 1: {
                return 'scenes-category-list-item-tips-status-1'
            }
            case 2: {
                return 'scenes-category-list-item-tips-status-2'
            }
            default: {
                return 'scenes-category-list-item-tips-status-3'
            }
        }
    }

    getNameClassname() {
        return Boolean(this.props.data.bold) ? 'scenes-category-list-item-name' : ''
    }

    renderContent({ theme, language }) {
        return (
            <TouchEffect className={`scenes-category-list-item-root ${this.props.className} common-display-center`}
                style={Object.assign({}, this.props.style)}
                onClick={this.props.onClick}>
                <div className={'common-display-column'}>
                    <span className={`common-text-singleline ${this.getNameClassname()}`}>
                        {this.props.data.sname || 'notName'}
                    </span>
                    <span className={`common-text-singleline scenes-category-list-item-tips ${this.getStatusClassname()}`}>
                        {this.props.data.tips || language.enter}
                    </span>
                </div>
            </TouchEffect>
        )
    }
}

export default CategoryList
