import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { PurchaseMain } from '../cmps/PurchaseMain.jsx'
import { PurchaseAside } from '../cmps/PurchaseAside.jsx'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { orderService } from '../services/order'
import { userService } from '../services/user'

import { loadGigs } from '../store/actions/gig.actions.js'


export function GigPurchasePage() {

    const gigs = useSelector((storeState) => storeState.gigModule.gigs)
    const navigate = useNavigate()
    const { gigId } = useParams()
    const gig = gigs.find((gig) => gig._id === gigId)

    const queryParams = new URLSearchParams(window.location.search)
    const Selectedpackage = queryParams.get('package')

    const initPurchaseState = {
        crdNum: '',
        expDate: '',
        pinCode: '',
        crdName: '',
    }
    const [formPaymentData, setFormPaymentData] = useState(initPurchaseState)


    useEffect(() => {
        const loadGigsInfo = async () => {
            try {
                await loadGigs()
            } catch (err) {
                console.error("Error loading gig: ", err)
            }
        }
        loadGigsInfo()
    }, [gig, navigate])

    async function createOrder() {
        try {
            const newOrder = await orderService.createOrder(
                gig._id,
                gig.ownerId,
                gig.price,
                gig.title,
                gig.daysToMake
            )
            await orderService.save(newOrder);
        } catch (err) {
            console.error('Error Saving Order:', err);
            showErrorMsg('FAILED TO ORDER');
        }
    }

    return (
        <section className="gig-purchase flex">
            <PurchaseMain
                initPurchaseState={initPurchaseState}
                setFormPaymentData={setFormPaymentData}
                formPaymentData={formPaymentData}
            />
            <PurchaseAside
                gig={gig}
                createOrder={createOrder}
                Selectedpackage={Selectedpackage}
            />
        </section>
    )

}

