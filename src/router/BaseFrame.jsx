import React from 'react'

class BaseFrame extends React.Component {
    gohome(handle) { }

    updataScreenIntentData(screen, data) { }

    updataModalIntentData(modal, data) { }

    finishScreen(screen) { }

    navigationScreen(path, data, handle) { }

    startScreen(intent = { component: null, path: null, options: { props: {} } }, data, handle) { }

    getScreenIntent(path) { return null }

    isScreenStackTop(screen) { return false }

    finishModal(modal) { }

    navigationModal(path, data, handle) { }

    startModal(intent = { component: null, path: null, options: { props: {} } }, data, handle) { }

    getModalIntent(path) { return null }

    isModalStackTop(modal) { return false }
}

export default BaseFrame
