import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateKeystoreModal extends Component {

	static propTypes = {
    hideMenu: PropTypes.bool,
    formData: PropTypes.object,
    keystoreTypes: PropTypes.array,
	}

	render() {

	}
}



import { Form } from 'semantic-ui-react';

import { getKeystoreComponent } from '~/keystoreTypes';

import KeystoreSelector from './keystore_selector';

export default class KeystoreCreationForm extends Component {
  static propTypes = {
    hideMenu: PropTypes.bool,
    formData: PropTypes.object,
    keystoreTypes: PropTypes.array,
  }
  static defaultProps = {
    hideMenu: false,
  }
  render() {
    debugger

    const { hideMenu, formData, keystoreTypes } = this.props;
    const KeystoreTypeCreationForm = getKeystoreComponent({ type: 'creationForm', id: formData.type });
    const keystoreType = formData.type && keystoreTypes.find(ks => ks.id === formData.type);
    return (
      <Form.Field>
        {!hideMenu && <KeystoreSelector {...this.props} keystoreType={keystoreType} />}
        {keystoreType &&
          <Form.Field>
            <KeystoreTypeCreationForm {...this.props} keystoreType={keystoreType} />
          </Form.Field>
        }
      </Form.Field>
    );
  }
}