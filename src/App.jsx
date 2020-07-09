import React from 'react';
import Login from './actived/Login';
import Main from './actived/Main';
import APPContext from './APPContext';
import Config from './config';
import Frame from './router/Frame';
import { RouterTool } from './tool/Tool';
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
      },
      appcontext: {
        theme: Config.Theme,
        language: Config.LANGUAG_USE,
        getapp: () => {
          return this
        }
      }
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  updateContextForTheme(data) {
    let _appcontext = this.state.appcontext

    _appcontext.theme = data || _appcontext.theme

    this.setState({
      appcontext: _appcontext
    })
  }

  updateContextForLanguage(data) {
    let _appcontext = this.state.appcontext

    _appcontext.language = data || _appcontext.language

    this.setState({
      appcontext: _appcontext
    })
  }

  onCompRef(comp) {
    this._frame = comp

    RouterTool.MountFrame(comp)

    console.error('app routing frame on ref...')
  }

  render() {
    return (
      <APPContext.Provider value={this.state.appcontext}>
        <Frame param={this.state.param}
          index={Main._path}
          classNameActiveAnimation={null}
          classNameWindowAnimation={null}
          ref={(comp) => {
            this.onCompRef(comp)
          }} />
      </APPContext.Provider>
    )
  }
}

export default Application
