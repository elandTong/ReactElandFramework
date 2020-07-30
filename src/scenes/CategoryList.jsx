import React from 'react'
import { UseAPPContent } from '../APPContext'
import '../assets/style/scenes.category.list.scss'
import Tool from '../utils/Tool'

class CategoryList extends UseAPPContent {
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

    renderContent({ theme, language, getapp }) {
        return (
            <div className={'display-space scenes-category-list-root'}>
                <img className={'scenes-category-list-imag'} src={this.props.icon} alt={'lotterygame'} />

                <div className={'display-warp scenes-category-list-cont-root'}>
                    {Tool.pushFillin(this.props.data.games.map((item, key) => {
                        return (
                            <ListItem key={key} className={`${key > 3 ? 'scenes-category-list-item-margin' : ''}`} data={item} onClick={(e) => {
                                this.onItemClick(item, key, e)
                            }} />
                        )
                    }), '23.5%', 4)}
                </div>
            </div>
        )
    }
}

class ListItem extends UseAPPContent {
    constructor(props) {
        super(props)

        this.state = {
        }
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

    renderContent({ theme, language, getapp }) {
        return (
            <div className={`display-center scenes-category-list-item-root click-out-ripple ${this.props.className || ''}`}
                style={this.props.style}
                onClick={this.props.onClick}>
                <div className={'display-column'}>
                    <span className={`common-text-singleline ${this.getNameClassname()}`}>
                        {this.props.data.sname || 'notName'}
                    </span>

                    <span className={`common-text-singleline scenes-category-list-item-tips ${this.getStatusClassname()}`}>
                        {this.props.data.tips || language.enter}
                    </span>
                </div>
            </div>
        )
    }
}

export default CategoryList
