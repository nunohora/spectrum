import './keystores.style.less';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Table, Label, Segment, Header, Icon } from 'semantic-ui-react';

import { createKeystore, updateKeystore, deleteKeystore } from '~/actions/keystore';
import { getKeystores } from '~/selectors';

import KeystoreModal from './keystore_modal';
import KeystoreEditForm from './keystore_edit_form';
import Address from './address';
import KeystoreButtons from './keystore_buttons';

import {
  Col,
  Row,
} from 'antd';

const KeystoreItem = (props) =>
  props.keystores.map(keystore => 
      <div>
        {keystore.addresses.map(address => (
          <Address {...props} key={address.address} keystore={keystore} address={address} />
        ))}
      </div>
  )

const Keystores = (props) =>
  <div className="Keystores">
    <Row>
      <Col span={12}>
        <div>
          <h2>Keystores</h2>
        </div>
        <div>
          Manage your Accounts
        </div>
      </Col>
      <Col 
        className="Keystores-buttons"
        span={12}
      >
        <KeystoreButtons {...props} />
      </Col>
    </Row>
    <Row span={24}>
      {!props.keystores ?
        <Message
          info
          icon="key"
          header="No Keystores Created"
          content="Please create or import a new keystore"
        />
        :
        KeystoreItem(props)
      }
    </Row>        
  </div>

Keystores.propTypes = {
  keystores: PropTypes.array.isRequired,
  updateKeystore: PropTypes.func.isRequired,
  deleteKeystore: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  keystores: getKeystores(state),
});

const actions = {
  createKeystore,
  updateKeystore,
  deleteKeystore,
};

export default connect(mapStateToProps, actions)(Keystores);
