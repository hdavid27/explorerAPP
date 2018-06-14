
import React, { Component } from 'react'

import { Modal, Button, FormControl } from 'react-bootstrap';
import { CREATE_FILE_MODE, CREATE_FOLDER_MODE, EDIT_MODE } from '../../actions/types';

export default class ModalView extends Component {

    constructor(props){
        super(props);

        this.state = {
            inputValue: this.props.value || ''
        }
    }

    onInputChange(e){
        this.setState({ 
            inputValue: e.target.value 
        });
    }

    onClose(e){
        this.props.onClose();
    }

    onSave(e){
        this.props.onSave(this.props.mode, this.state.inputValue);
    }

    render() {

        let title;

        if(this.props.mode == CREATE_FOLDER_MODE){
            title = <Modal.Title>Create new folder</Modal.Title>
        }

        if(this.props.mode == CREATE_FILE_MODE){
            title = <Modal.Title>Create new file</Modal.Title>
        }

        if(this.props.mode == EDIT_MODE){
            title = <Modal.Title>Edit name</Modal.Title>
        }

        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        {title}
                    </Modal.Header>
                
                    <Modal.Body>
                        <FormControl
                            type="text"
                            value={this.state.inputValue}
                            onChange={this.onInputChange.bind(this)}
                        ></FormControl>
                    </Modal.Body>
                
                    <Modal.Footer>
                        <Button onClick={this.onClose.bind(this)}>Close</Button>
                        <Button bsStyle="primary" onClick={this.onSave.bind(this)}>Save</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}
