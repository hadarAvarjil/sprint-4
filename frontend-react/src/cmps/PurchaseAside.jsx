import SvgIcon from './SvgIcon.jsx'
import { packages } from '../services/gig.service.js'
import { Link } from 'react-router-dom'

export function PurchaseAside({
    gig,
    createOrder,
    Selectedpackage,
    handleSubmit,
}) {
    const serviceFee = 30.62
    const vat = 105.63
    const total = Selectedpackage.price + serviceFee + vat
    
    
    return (
        
        <aside className="purchase-aside">
            <div className="package-details">
                <div className="gig-title">
                    {/* <img src={gig.imageUrl} alt="Gig Thumbnail" className="gig-thumbnail" /> */}
                    <p>{gig.title}</p>
                </div>
                <div className="package-name">
                    <h4>{Selectedpackage.name}</h4>
                    <span>₪{Selectedpackage.price}</span>
                </div>
                <ul className="package-includes">
                    {Selectedpackage.features.map((feature, idx) => (
                        <li key={idx}>
                            <SvgIcon iconName="checkmark" />
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
                    <span>₪{serviceFee.toFixed(2)}</span>
                </div>
                <div className="price-row">
                    <span>VAT</span>
                    <span>₪{vat.toFixed(2)}</span>
                </div>
                <div className="price-row total">
                    <span>Total</span>
                    <span>₪{total.toFixed(2)}</span>
                </div>
                <div className="delivery-time">
                    <span>Total delivery time</span>
                    <span>{Selectedpackage.deliveryTime} days</span>
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