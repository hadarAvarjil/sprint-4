import SvgIcon from './SvgIcon.jsx'
import { packages } from '../services/gig.service'
import { Link } from 'react-router-dom'

export function PurchaseAside({
    gig,
    createOrder,
    Selectedpackage,
    handleSubmit,
}) {
    const serviceFee = 30.62
    const vat = 105.63
    const total = packages[Selectedpackage].price + serviceFee + vat  
    const packagesType = "Wind - For Start Ups"

    return (

        <aside className="purchase-aside">
            <div className="package-details">
                <div className="gig-title">
                    <img src={gig.imgUrls[0]} alt="Gig Thumbnail" className="gig-thumbnail" />
                    <p>{gig.title}</p>
                </div>
                <div className="package-name flex">
                    <h4>{packagesType}</h4>
                    <span>${packages[Selectedpackage].price}</span>
                </div>
                <ul className="package-includes">
                    {packages[Selectedpackage].features.map((feature, idx) => (
                        <li key={idx}>
                            <SvgIcon iconName="checkmarkBlackIcon" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="promo-code">
                <input type="text" placeholder="Enter promo code" />
            </div>

            <div className="price-breakdown">
                <div className="price-row">
                    <span>Service fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="price-row">
                    <span>VAT</span>
                    <span>${vat.toFixed(2)}</span>
                </div>
                <div className="price-row total">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
                <div className="delivery-time">
                    <span>Total delivery time</span>
                    <span>{packages[Selectedpackage].deliveryTime} days</span>
                </div>
            </div>

            <button className="confirm-pay-btn" onClick={handleSubmit}>
                Confirm & Pay
            </button>
            <p className="ssl-notice">
                <SvgIcon iconName="lock" />
                SSL Secure Payment
            </p>
        </aside>
    )
}