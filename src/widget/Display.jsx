import PropTypes from 'prop-types'
import React from 'react'
import BaseContext from '../BaseContext'

const DisplayClassNames = {
    displayCenter: 'common-display-center',
    displaySpaceBetween: 'common-display-space-between',
    displaySpaceAround: 'common-display-space-around',
    displayColumn: 'common-display-column',
    displayWarp: 'common-display-warp',
    displaySpaceBetweenWarp: 'common-display-warp-space-between',
    displaySpaceAroundWarp: 'common-display-warp-space-around',
    displayCenterWarp: 'common-display-warp-center',
    displayCenterStartWarp: 'common-display-warp-center-start',
    displayCenterSpaceEvenlyWarp: 'common-display-warp-center-space-evenly',
    displayStart: 'common-display-start',
    displayEnd: 'common-display-end'
}

class DisplayCenter extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${DisplayClassNames.displayCenter}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

class DisplaySpaceBetween extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${DisplayClassNames.displaySpaceBetween}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

class DisplaySpaceAround extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${DisplayClassNames.displaySpaceAround}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

class DisplayColumn extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${DisplayClassNames.displayColumn}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

class DisplayWarp extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${DisplayClassNames.displayWarp}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

class DisplaySpaceBetweenWarp extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${DisplayClassNames.displaySpaceBetweenWarp}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

class DisplaySpaceAroundWarp extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${DisplayClassNames.displaySpaceAroundWarp}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

class DisplayCenterWarp extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${DisplayClassNames.displayCenterWarp}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

class DisplayCenterStartWarp extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${DisplayClassNames.displayCenterStartWarp}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

class DisplayCenterSpaceEvenlyWarp extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${DisplayClassNames.displayCenterSpaceEvenlyWarp}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

class DisplayStart extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${DisplayClassNames.displayStart}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

class DisplayEnd extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${DisplayClassNames.displayEnd}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

export {
    DisplayCenter,
    DisplaySpaceBetween,
    DisplaySpaceAround,
    DisplayColumn,
    DisplayWarp,
    DisplaySpaceBetweenWarp,
    DisplaySpaceAroundWarp,
    DisplayCenterWarp,
    DisplayCenterStartWarp,
    DisplayCenterSpaceEvenlyWarp,
    DisplayStart,
    DisplayEnd,
    DisplayClassNames
}
