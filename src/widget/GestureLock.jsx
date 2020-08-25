import PropType from 'prop-types'
import React from 'react'
import '../assets/style/comp.gesture.lock.scss'
import BaseContext from '../BaseContext'
import Tool from '../utils/Tool'
import Button from './Button'

class GestureLock extends BaseContext {
    static _STORAGE_KEY = 'GestureLockPassword'

    static propTypes = {
        canvasWidth: PropType.number,
        canvasHeight: PropType.number,
        verifyPassword: PropType.string,
        type: PropType.string,
        innerDiameterSize: PropType.number,
        outerDiameterSize: PropType.number,
        offsetX: PropType.number,
        offsetY: PropType.number,
        showLine: PropType.bool,
        lineColor: PropType.string,
        outerColor: PropType.string,
        insideColor: PropType.string,
        touchColor: PropType.string,
        resultHandle: PropType.func
    }

    static defaultProps = {
        canvasWidth: window.document.body.clientWidth,
        canvasHeight: 350,
        verifyPassword: null,
        type: GestureLock.TYPE_VERIFY,
        innerDiameterSize: 17.5,
        outerDiameterSize: 25,
        offsetX: 50,
        offsetY: 30,
        showLine: true,
        lineColor: null,
        outerColor: null,
        insideColor: null,
        touchColor: null,
        resultHandle: function (val) {
        }
    }

    static TYPE_SETTING = 'setting'
    static TYPE_VERIFY = 'verify'

    _canvas = null
    _canvasContext = null
    _pointsLocation = []
    _theme = null

    constructor(props) {
        super(props)
        this.onCanvasRef = this.onCanvasRef.bind(this)
        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        this.onResetClick = this.onResetClick.bind(this)
        this.state = {
            tipsKey: 0
        }
    }

    caculateNineCenterLocation(diffX, diffY) {
        let Re = []

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                Re.push({
                    X: (this.props.offsetX + col * diffX + (col * 2 + 1) * this.props.outerDiameterSize),
                    Y: (this.props.offsetY + row * diffY + (row * 2 + 1) * this.props.outerDiameterSize)
                })
            }
        }

        return Re
    }

    draw(context, pointsLocation, linePointArr, touchPoint) {
        if (linePointArr.length > 0) {
            context.beginPath()

            if (this.props.showLine) {
                for (let i = 0; i < linePointArr.length; i++) {
                    let pointIndex = linePointArr[i]
                    context.lineTo(pointsLocation[pointIndex].X, pointsLocation[pointIndex].Y)
                }
            }

            context.lineWidth = 2
            context.strokeStyle = this.props.lineColor || this._theme.color.theme
            context.stroke()
            context.closePath()

            if (touchPoint && this.props.showLine) {
                let lastPointIndex = linePointArr[linePointArr.length - 1]
                let lastPoint = pointsLocation[lastPointIndex]

                context.beginPath()
                context.moveTo(lastPoint.X, lastPoint.Y)
                context.lineTo(touchPoint.X, Math.abs(touchPoint.Y - this._canvas.offsetTop))
                context.stroke()
                context.closePath()
            }
        }

        for (let i = 0; i < pointsLocation.length; i++) {
            let Point = pointsLocation[i]

            context.fillStyle = this.props.outerColor || this._theme.color.theme
            context.beginPath()
            context.arc(Point.X, Point.Y, this.props.outerDiameterSize, 0, Math.PI * 2, true)
            context.closePath()
            context.fill()

            context.fillStyle = this.props.insideColor || this._theme.color.font_anti
            context.beginPath()
            context.arc(Point.X, Point.Y, this.props.innerDiameterSize, 0, Math.PI * 2, true)
            context.closePath()
            context.fill()

            if (linePointArr.indexOf(i) >= 0) {
                context.fillStyle = this.props.touchColor || this._theme.color.theme
                context.beginPath()
                context.arc(Point.X, Point.Y, this.props.outerDiameterSize, 0, Math.PI * 2, true)
                context.closePath()
                context.fill()
            }
        }
    }

    isPointTouched(touches, linePoint) {
        for (let i = 0; i < this._pointsLocation.length; i++) {
            if (linePoint.indexOf(i) >= 0) {
                continue
            }

            let currentPoint = this._pointsLocation[i]

            let xdiff = Math.abs(currentPoint.X - touches.pageX)
            let ydiff = Math.abs(currentPoint.Y - (touches.pageY - this._canvas.offsetTop))

            let dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5)

            if (dir <= this.props.outerDiameterSize) {
                if (linePoint.length > 0) {
                    let indexLast = linePoint[linePoint.length - 1] + 1
                    let index = i + 1
                    let pushIndex

                    if ((indexLast + index) % 2 === 0) {
                        if ((indexLast % 2) === 0 && (index % 2) === 0) {
                            if ((indexLast + index) / 2 === 5) {
                                pushIndex = 4

                                if (linePoint.indexOf(pushIndex) < 0) {
                                    linePoint.push(pushIndex)
                                }
                            }
                        } else {
                            if (indexLast !== 5 && index !== 5) {
                                pushIndex = (indexLast + index) / 2 - 1

                                if (linePoint.indexOf(pushIndex) < 0) {
                                    linePoint.push(pushIndex)
                                }
                            }
                        }
                    }
                }

                linePoint.push(i)

                break
            }
        }
    }

    _linePoint = [] // 绘制的密码

    onTouchStart(e) {
        requestAnimationFrame(() => {
            this.isPointTouched(e.touches[0], this._linePoint)
        })
    }

    _isTouchMoveDraw = false // move事件绘制控制

    onTouchMove(e) {
        e.preventDefault()

        if (this._isTouchMoveDraw) {
            return
        }

        this._isTouchMoveDraw = true

        requestAnimationFrame(() => {
            let touches = e.touches[0]

            this.isPointTouched(touches, this._linePoint)

            this._canvasContext.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)

            this.draw(this._canvasContext, this._pointsLocation, this._linePoint, {
                X: touches.pageX,
                Y: touches.pageY
            })

            this._isTouchMoveDraw = false
        })
    }

    onTouchEnd(e) {
        requestAnimationFrame(() => {
            this._canvasContext.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)

            this.draw(this._canvasContext, this._pointsLocation, this._linePoint, null)

            if (this._linePoint.length < 5) {
                this.setState({ tipsKey: 3 })
            } else {
                if (this.props.type === GestureLock.TYPE_VERIFY) {
                    this.verifyPassword(this._linePoint)
                } else {
                    this.setPassword(this._linePoint)
                }
            }

            this._canvasContext.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)

            this.draw(this._canvasContext, this._pointsLocation, [], null)

            this._linePoint = []
        })
    }

    initTouchEvent() {
        this._canvas.addEventListener('touchstart', this.onTouchStart, false)
        this._canvas.addEventListener('touchmove', this.onTouchMove, false)
        this._canvas.addEventListener('touchend', this.onTouchEnd, false)
    }

    removeTouchEvent() {
        this._canvas.removeEventListener('touchstart', this.onTouchStart, false)
        this._canvas.removeEventListener('touchmove', this.onTouchMove, false)
        this._canvas.removeEventListener('touchend', this.onTouchEnd, false)
    }

    _isTwiceInput = false // 是否第二次输入
    _tempLinePoint = [] // 记录首次绘制的密码

    setPassword(linePoint) {
        if (this._isTwiceInput) { // 再次绘制
            if (this._tempLinePoint.join('') === linePoint.join('')) {
                this.setState({ tipsKey: 4 })

                this.resetChange()

                if (this.props.resultHandle) {
                    this.props.resultHandle(linePoint.join(''))
                }
            } else { // 重复绘制错误
                this.setState({ tipsKey: 2 })
            }
        } else { // 首次绘制
            this._isTwiceInput = true

            this._tempLinePoint = linePoint

            this.setState({ tipsKey: 1 })
        }
    }

    verifyPassword(linePoint) {
        if (Tool.isEmpty(this.props.verifyPassword)) {
            this.setState({ tipsKey: 5 })

            if (this.props.resultHandle) {
                this.props.resultHandle(null)
            }
        } else {
            if (this.props.verifyPassword === linePoint.join('')) {
                this.setState({ tipsKey: 6 })

                this.resetChange()

                if (this.props.resultHandle) {
                    this.props.resultHandle(this.props.verifyPassword)
                }
            } else {
                this.setState({ tipsKey: 7 })
            }
        }
    }

    resetChange() {
        this._isTwiceInput = false
        this._tempLinePoint = []
    }

    drawPoints() {
        let X = (this.props.canvasWidth - 2 * this.props.offsetX - this.props.outerDiameterSize * 2 * 3) / 2
        let Y = (this.props.canvasHeight - 2 * this.props.offsetY - this.props.outerDiameterSize * 2 * 3) / 2
        this._pointsLocation = this.caculateNineCenterLocation(X, Y)
        this.draw(this._canvasContext, this._pointsLocation, [], null)
    }

    componentDidMount() {
        this._canvasContext = this._canvas.getContext('2d')

        this.drawPoints()
        this.initTouchEvent()

        console.warn('gestureLock did mount')
    }

    componentDidUpdate() {
        if (this._isReDrawPoints) {
            this.drawPoints()
            this._isReDrawPoints = false
        }

        console.warn('gestureLock did update')
    }

    _isReDrawPoints = false

    componentWillReceiveProps(nextProps, nextContext) {
        if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
            this._isReDrawPoints = true
        }

        console.warn('gestureLock will receive')
    }

    componentWillUnmount() {
        this.removeTouchEvent()
    }

    onCanvasRef(comp) {
        this._canvas = comp
    }

    onResetClick(e) {
        this.resetChange()

        this.setState({ tipsKey: 0 })
    }

    renderContent({ theme, language }) {
        if (this._theme && JSON.stringify(theme.color) !== JSON.stringify(this._theme.color)) {
            this._isReDrawPoints = true
        }

        this._theme = theme

        return (
            <div className={'display-column comp-gesture-lock-root'}>
                <span>
                    {this.props.type === GestureLock.TYPE_VERIFY ? (language.verifyGesture) : (language.settingGesture)}
                </span>

                <canvas className={'comp-gesture-lock-canvas'}
                    width={this.props.canvasWidth}
                    height={this.props.canvasHeight}
                    ref={this.onCanvasRef} />

                <span>
                    {language.gestureTips[this.state.tipsKey]}
                </span>

                {this.props.type === GestureLock.TYPE_SETTING ? (
                    <Button style={{ marginTop: 20 }}
                        options={{
                            width: '40%', height: 36,
                            name: language.reset,
                            solid: true,
                            onClick: this.onResetClick
                        }} />
                ) : (null)}
            </div>
        )
    }
}

export default GestureLock
