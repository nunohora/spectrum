import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wallet from 'ethereumjs-wallet';

import { autobind } from 'core-decorators';
import { getFileContents } from '~/helpers/fileUtils';

import { Header } from 'semantic-ui-react';
import {
  Button, 
  Form,
  Input,
  Modal,
  Upload, 
} from 'antd';

const PasswordForm = (props) => {
  const {
    form: { 
      getFieldDecorator, 
      getFieldError,
    },
    onSubmit,
    keystore,
    handleUpdatePassword,
  } = props;

  return (
    <Form 
      layout="inline"
      onSubmit={onSubmit}
    >
      <Header>
        Unlock Keystore: {keystore.name}
        <Header.Subheader>0x{keystore.address}</Header.Subheader>
      </Header>
      <Form.Item
        hasFeedback
      >
        {getFieldDecorator('password')(
          <Input
            onChange={handleUpdatePassword}
            placeholder="Enter Password"
            type="password"
            size="large"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          icon="unlock"
          htmlType="submit"
        >
          Unlock keystore
        </Button>
      </Form.Item>
    </Form>
  )
}

class ImportKeystoreModal extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      fileContent: null,
      password: '',
      keystore: null,
      privateKey: false,
    }

    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  @autobind
  onSubmit(e) {
    e.preventDefault();

    const {
      onGetPrivateKey,
      form,
    } = this.props

    const { 
      fileContent, 
      password, 
      keystore,
    } = this.state;

    this.setState({
      loading: true,
    })

    try {
      const wallet = Wallet.fromV3(fileContent, password, true);
      const privateKey = wallet.getPrivateKey().toString('hex');
      
      onGetPrivateKey({ privateKey, password, name: keystore.name });
    } catch (error) {
      if (this._mounted) {
        this.setState({ loading: false })
        form.setFields({
          password: { errors: [error.message] }
        })
      }
    }
  }

  @autobind
  handleUpdatePassword(e) {
    this.setState({ password: e.target.value });
  }

  @autobind
  handleFileDrop(file) {
    if (this._mounted) {
      this.setState({ error: null });
    }

    getFileContents(file).then((fileContent) => {
      try {
        const keystore = JSON.parse(fileContent);

        if (keystore.version !== 3) {
          throw new Error('Keystore type not supported');
        }
        if (this._mounted) {
          this.setState({ fileContent, keystore });
        }
      } catch (e) {
        throw new Error('Keystore type not supported');
      }
    }).catch(error => {
      if (this._mounted) {
        this.setState({ error });
      }
    })

    return false
  }

  render() {
    const { 
      fileContent,
      keystore,
      password,
      loading,
    } = this.state;

    const {
      visible,
      form,
      closeModal,
    } = this.props;

    return (
      <Modal
        closable={false}
        visible={visible}
        cancelText="Close"
        footer={[
          <Button 
            key="close" 
            size="large" 
            onClick={closeModal}>
            Close
          </Button>
        ]}
      >
        {!fileContent ?
          <Upload.Dragger
            action='/dummyAction'
            beforeUpload={this.handleFileDrop}
          >
            <div className="ui padded one column grid">
              <div className="center aligned column">
                <i className="icon upload large" />
                <p>Click or drag and drop keystore here to upload.</p>
              </div>
            </div>
          </Upload.Dragger>
          :
          <PasswordForm 
            onSubmit={this.onSubmit}
            handlePassword={this.handlePassword}
            keystore={keystore}
            password={password}
            form={form}
            loading={loading}
          />
        }
      </Modal>
    )
  }
}

export default Form.create()(ImportKeystoreModal)