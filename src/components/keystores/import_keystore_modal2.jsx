import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wallet from 'ethereumjs-wallet';
import Dropzone from 'react-dropzone';

import { autobind } from 'core-decorators';
import { getFileContents } from '~/helpers/fileUtils';

import { Header } from 'semantic-ui-react';
import {
	Button, 
	Form,
	Input,
	Modal, 
} from 'antd';

class ImportKeystoreModal extends Component {

	static propTypes = {
		visible: PropTypes.bool.isRequired,
	}

	constructor(props) {
		super(props);

		this.state = {
			confirmLoading: false,
			fileContent: null,
			error: null,
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
    	fileContent, 
    	password, 
    	keystore } = this.state;

  	if (this._mounted) {
  		this.setState({
  			error: null,
  			loading: true,
  		})
  	}

    try {
      const wallet = Wallet.fromV3(fileContent, password, true);
      const privateKey = wallet.getPrivateKey().toString('hex');
      this.props.onGetPrivateKey({ privateKey, password, name: keystore.name });
    } catch (error) {
    	if (this._mounted) {
    		this.setState({
    			error,
    			loading: false,
    		});
    	}
    }
  }

  @autobind
  handleUpdatePassword(e) {
    this.setState({ password: e.target.value });
  }

  @autobind
  handleFileDrop(files) {
  	const file = files[0];
    
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
  }

	render() {
		const { 
			fileContent,
			keystore,
			password,
		} = this.state;

		return (
			<Modal visible={this.props.visible}>
			 	{!fileContent ?
		      <Dropzone onDrop={this.handleFileDrop}>
		        <div className="ui padded one column grid">
		          <div className="center aligned column">
		            <i className="icon upload large" />
		            <p>Click or drag and drop keystore here to upload.</p>
		          </div>
		        </div>
		      </Dropzone>
			 		:
					<Form 
						layout="inline"
						onSubmit={this.onSubmit}
					>
		        <Header>
		          Unlock Keystore: {keystore.name}
		          <Header.Subheader>0x{keystore.address}</Header.Subheader>
		        </Header>
		        <Form.Item>
		          <Input
		            onChange={this.handleUpdatePassword}
		            value={password}
		            placeholder="Enter Password"
		            type="password"
		            size="large"
		          />
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
			 	}
			</Modal>
		)
	}
}

export default ImportKeystoreModal