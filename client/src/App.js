// import logo from './logo.svg';
import { useEffect } from 'react';
import './app.scss';
import SellerDashboard from './Components/SellerDashboard';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';

{/* <Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route> */}

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard', { replace: true });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<SellerDashboard />} />
      </Routes>
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
