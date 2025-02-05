import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { PurchaseMain } from '../cmps/PurchaseMain.jsx'
import { PurchaseAside } from '../cmps/PurchaseAside.jsx'

import { orderService } from '../services/order'
import { userService } from '../services/user'
import { packages } from '../services/gig.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { socketService } from '../services/socket.service.js'


import { loadGigs } from '../store/actions/gig.actions.js'


export function GigPurchasePage() {

    const gigs = useSelector((storeState) => storeState.gigModule.gigs)
    const navigate = useNavigate()
    const { gigId } = useParams()
    const gig = gigs.find((gig) => gig._id === gigId)

    const queryParams = new URLSearchParams(window.location.search)
    const Selectedpackage = queryParams.get('package')
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    console.log(loggedInUser);



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

    const serviceFee = 30.62
    const vat = 105.63
    const total = gig ? packages[Selectedpackage].price + serviceFee + vat + gig.price : 0
    const gigFirstImgUrl = gig.imgUrls[0]

    async function createOrder(total) {

        try {
            const newOrder = await orderService.createOrder(
                loggedInUser._id,
                gig._id,
                gig.ownerId,
                gig.price = total,
                gig.title,
                gig.daysToMake,
                gigFirstImgUrl

            )
            await orderService.save(newOrder)            
            socketService.emit('notify_seller_new_order', { userId: newOrder.sellerId, user: loggedInUser })
            showSuccessMsg(
                {
                    title: 'ORDER ADDED',
                    body: `Find your next order!`,
                },
                {
                    userMsgLeft: '55%',
                    messageAreaPadding: '2em 1.5em 2em 7em',
                    msgStatusTranslateX: '-12em',
                }
            )
            navigate('/orders')
        } catch (err) {
            console.error('Error Saving Order:', err);
            showErrorMsg('FAILED TO ORDER');
        }
    }

    return (
        <section className="gig-purchase main grid ">
            <PurchaseMain
                initPurchaseState={initPurchaseState}
                setFormPaymentData={setFormPaymentData}
                formPaymentData={formPaymentData}
            />
            <PurchaseAside
                gig={gig}
                createOrder={createOrder}
                Selectedpackage={Selectedpackage}
                total={total}
            />
        </section>
    )

}

