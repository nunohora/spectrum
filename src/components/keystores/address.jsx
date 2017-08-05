import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import blockie from '~/helpers/blockie';
import web3Connect from '~/helpers/web3/connect';

import QrCode from '~/components/common/qr_code';
import AddressBalances from './address_balances';
import BaseTokenButton from './base_token';
import TokenButton from './token';

import { Card, Icon } from 'antd';

const KeystoreAddressHeader = (keystore) =>
  <div>
      <Icon name={keystore.type.icon} />
      <span>{keystore.type.name}</span>
      <span>{keystore.type.subtitle}</span>
  </div>

const KeystoreAddress = ({ address, web3Redux, keystore }) =>
  <Card
    title={KeystoreAddressHeader(keystore)}
    extra={<Image src={blockie(address.address)} shape="rounded" size="mini" />}
  >
    <code style={{ fontSize: '0.8em' }}>{address.address}</code>
    <div>
      {address.networks.map(network => (
        <BaseTokenButton key={network.id} {...{ network, address, web3Redux }} />
      ))}
      {address.tokens.map(token => (
        <TokenButton key={token.id} {...{ token, address, web3Redux }} />
      ))}
    </div>
  </Card>

KeystoreAddress.propTypes = {
  address: PropTypes.object.isRequired,
  web3Redux: PropTypes.object.isRequired,
}

export default web3Connect(KeystoreAddress)