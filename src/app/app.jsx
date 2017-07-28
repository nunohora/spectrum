import React, { Component } from 'react';
import { 
  HashRouter, 
  Switch,
  Route,
} from 'react-router-dom';

import { Layout } from 'antd';

import TransactionSigningOverlay from '~/components/transactions/transaction_signing_overlay';
import MainNav from './MainNav'
import StartupOverlay from '~/components/common/startup_overlay';
import ConnectionStatus from '~/components/common/connection_status';

import Keystores from '~/components/keystores';
import Config from '~/components/config';
import Dapplets from '~/components/dapplets';
import FooterContent from '~/components/common/footer';

const { 
  Header,
  Footer,
  Content,
} = Layout

const showOverlay = process.env.NODE_ENV === 'production';

const App = () =>
  <div className="App">
    <TransactionSigningOverlay />
    {showOverlay && <StartupOverlay />}
    <HashRouter>
      <Layout>
        <Header className="App-header">
          <MainNav />
        </Header>
        <Content className="App-content">
          <Switch>
            <Route exact path="/" component={Keystores} />
            <Route path="/config" component={Config} />
            <Route path="/dapplets" component={Dapplets} />
          </Switch>            
        </Content>        
        <Footer>
          <FooterContent />
        </Footer>
      </Layout>
    </HashRouter>
  </div>

export default App