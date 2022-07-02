// import logo from './logo.svg';
import './app.scss';
import SellerDashboard from './Components/SellerDashboard';

import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <SellerDashboard />
    </div>
  );
}

/*
    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
*/ 

export default App;
