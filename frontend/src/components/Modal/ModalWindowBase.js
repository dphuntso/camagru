import { Component } from 'react';

class ModalWindowBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDialogOpened: false
        }
    }

    handleOpen () {
        console.log("this. is opneSTate")
        this.setState({isDialogOpened: true})
    }

    handleClose () {
        this.setState({isDialogOpened: false})
    }
}

export default ModalWindowBase;