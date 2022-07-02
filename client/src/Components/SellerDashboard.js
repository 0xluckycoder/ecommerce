import './sellerDashboard.scss';
import SideNav from './SideNav';
import TopNav from './TopNav';
import Home from './Home';

export default function SellerDashboard() {
    return (
        <div className="dashboard">
            <TopNav />
            <div className="content-wrapper">
                <SideNav />
                <Home />
            </div>
        </div>
    );
}