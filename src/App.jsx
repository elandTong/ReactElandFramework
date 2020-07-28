import React from 'react';
import Login from './screen/Login';
import Main from './screen/Main';
import APPContext from './APPContext';
import Config from './config';
import Frame from './router/Frame';
import { RouterTool } from './utils/Tool';
import Popup from './modal/Popup';
import Spiner from './modal/Spiner';
import Toast from './modal/Toast';

class Application extends React.Component {
  _frame = null

  constructor(props) {
    super(props)

    this.state = {
      param: {
        screens: [{
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
        modals: [{
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
          classNameScreenAnimation={null}
          classNameModalAnimation={null}
          ref={(comp) => {
            this.onCompRef(comp)
          }} />
      </APPContext.Provider>
    )
  }
}

export default Application
