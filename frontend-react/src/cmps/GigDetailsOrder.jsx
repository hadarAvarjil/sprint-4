import React, { useState } from 'react'
import SvgIcon from './SvgIcon.jsx'

export function GigDetailsOrder({ gig, owner }) {

    const [activeTab, setActiveTab] = useState('Basic')

    const packages = {
        Basic: {
            price: '$173.18',
            description: '3 logo designs with white and transparent backgrounds (JPEG PNG) + Source file (.ai)',
            delivery: '4-day delivery',
            revisions: '3 Revisions',
        },
        Standard: {
            price: '$350.00',
            description: '5 logo designs with multiple variations, white & transparent backgrounds (JPEG PNG) + Source file (.ai)',
            delivery: '3-day delivery',
            revisions: '5 Revisions',
        },
        Premium: {
            price: '$600.00',
            description: 'Unlimited logo designs with premium support, white & transparent backgrounds (JPEG PNG) + Source file (.ai)',
            delivery: '2-day delivery',
            revisions: 'Unlimited Revisions',
        },
    }

    return (
        <div className="gig-details-order">
            <div className="tabs">
                {Object.keys(packages).map((tab) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                <p className="price">{packages[activeTab].price}</p>
                <p className="description">{packages[activeTab].description}</p>
                <div className="details-container">
                    <p className="detail-item">
                        <SvgIcon iconName="clock" />
                        {packages[activeTab].delivery}
                    </p>
                    <p className="detail-item">
                        <SvgIcon iconName="refresh" />
                        {packages[activeTab].revisions}
                    </p>
                </div>
                <div className="button-container">
                    <button className="continue-button">
                        Continue
                        <SvgIcon iconName="pageArrowRight" />
                    </button>
                </div>
            </div>
        </div>
    )
}

