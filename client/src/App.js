import './app.scss';
import 'antd/dist/antd.css';
import SellerDashboard from './Components/SellerDashboard';
import AuthPage from './Components/Auth/AuthPage';

function App() {

  return (
    <div className="App">
      <AuthPage />
      <SellerDashboard />
      {/* <AuthPage /> */}
    </div>
  );
}

export default App;
