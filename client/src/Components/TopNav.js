import './topNav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function TopNav() {
    return (
        <div className="topnav">
            <FontAwesomeIcon icon={faBars} />
            <h1>Ecommerce</h1>
        </div>
    );
}