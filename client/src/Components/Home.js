import './home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faCoins, faBoxOpen, faTag } from '@fortawesome/free-solid-svg-icons';
/*

*/ 
export default function Home() {
    return (
        <div className="home container">
            <h2>Dashboard</h2>
            <button>today</button>
            <div className="analytics-box-items">
            <div className="analytics-box-item">
                    <div className="flex">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faShoppingBag} />
                        </div>
                        <p>Sales</p>
                    </div>
                    <h1>45</h1>
                </div>

                <div className="analytics-box-item">
                    <div className="flex">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faCoins} />
                        </div>
                        <p>Revenue</p>
                    </div>
                    <h1>45</h1>
                </div>
                <div className="analytics-box-item">
                    <div className="flex">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faCoins} />
                        </div>
                        <p>Revenue</p>
                    </div>
                    <h1>45</h1>
                </div>
                <div className="analytics-box-item">
                    <div className="flex">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faCoins} />
                        </div>
                        <p>Revenue</p>
                    </div>
                    <h1>45</h1>
                </div>
            </div>
        </div>
    );
}

/*
<FontAwesomeIcon icon={faBoxOpen} />
<FontAwesomeIcon icon={faTag} />
*/ 