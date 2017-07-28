import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { 
  createKeystore, 
  updateKeystore, 
  deleteKeystore, 
} from '~/actions/keystore';

import ImportKeystoreModal from './import_keystore_modal2';
import KeystoreCreationForm from './create_keystore_modal2';
import GenericTransaction from './generic_transaction';

import { 
  Button, 
  Modal,
} from 'antd';

const actions = {
  createKeystore,
  updateKeystore,
  deleteKeystore,
};

@connect(null, actions)
class KeystoreButtons extends Component {

  static propTypes = {
    createKeystore: PropTypes.func.isRequired,
    keystores: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      createVisible: false,
      importVisible: false,
    }
  }

  @autobind
  onCreateClick() {
    this.setState({ createVisible: true })
  }

  @autobind
  onImportClick() {
    this.setState({ importVisible: true })
  }

  render() {
    const {
      createVisible,
      importVisible
    } = this.state

    return (
      <div>
        {this.props.keystores.length && <GenericTransaction /> }
        <Button 
          icon="plus" 
          size="large"
          onClick={this.onCreateClick}
        >
          Create
        </Button>
        <Button 
          icon="upload" 
          size="large"
          onClick={this.onImportClick}
        >
          Import
        </Button>
        <ImportKeystoreModal visible={importVisible} {...this.props} />
      </div>
    )
  }
}

export default KeystoreButtons