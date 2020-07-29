import React from 'react'

class BaseFrame extends React.Component {
    gohome(handle) { }

    finishScreen(screen) { }

    navigationScreen(path, data, handle) { }

    startScreen(intent = { component: null, path: null, opts: { props: {} } }, data, handle) { }

    getScreen(path) { return null }

    getScreenIntent(path) { return null }

    isScreenStackTop(screen) { return false }

    finishModal(modal) { }

    navigationModal(path, data, handle) { }

    startModal(intent = { component: null, path: null, opts: { props: {} } }, data, handle) { }

    getModal(path) { return null }

    getModalIntent(path) { return null }

    isModalStackTop(modal) { return false }
}

export default BaseFrame
