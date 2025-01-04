import { useState } from 'react'
import _ from 'lodash'


export function GigDetailsHeader ({gig, owner}){

    return (
        <>
        <section className= "gig-details-header">
        <h2>{gig.title}</h2>
        </section>
        </>
    )
}