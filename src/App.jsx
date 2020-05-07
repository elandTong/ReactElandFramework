import React from 'react';
import Login from './actived/Login';
import Main, { Test, Test2 } from './actived/Main';
import Frame from './router/Frame';
import Tool from './tool/Tool';
import Popup from './window/Popup';
import Spiner from './window/Spiner';
import Toast from './window/Toast';

class Application extends React.Component {
  _frame = null

  constructor(props) {
    super(props)

    this.state = {
      param: {
        actives: [{
          component: Main,
          path: Main._path,
          opts: {
            props: {
            }
          }
        }, {
          component: Test,
          path: Test._path,
          opts: {
            props: {
            }
          }
        }, {
          component: Test2,
          path: Test2._path,
          opts: {
            props: {
            }
          }
        }, {
          component: Login,
          path: Login._path,
          opts: {
            props: {
            }
          }
        }],
        windows: [{
          component: Toast,
          path: Toast._path,
          opts: {
            props: {
            }
          }
        }, {
          component: Spiner,
          path: Spiner._path,
          opts: {
            props: {
            }
          }
        }, {
          component: Popup,
          path: Popup._path,
          opts: {
            props: {
            }
          }
        }]
      }
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onCompRef(comp) {
    this._frame = comp

    Tool.MountFrame(comp)

    console.error('app routing frame on ref...')
  }

  render() {
    return (
      <Frame param={this.state.param} index={Main._path} ref={(comp) => {
        this.onCompRef(comp)
      }} />
    )
  }
}

export default Application
