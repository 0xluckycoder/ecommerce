import './app.scss';
import 'antd/dist/antd.css';
import SellerDashboard from './Components/SellerDashboard';
import ChooseRole from './Components/Auth/ChooseRole';

function App() {

  return (
    <div className="App">
      {/* <SellerDashboard /> */}
      <ChooseRole />
    </div>
  );
}

export default App;
