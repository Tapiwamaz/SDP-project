import React from 'react'
import Header from '../../Components/Header/Header'
import { Page } from '../../Components/HomePage/HomePage.styles'
import AsideDesktop from '../../Components/AsideDesktop/AsideDesktop'
import { TicketContainer } from '../../Components/Ticket Container/TicketContainer'
const MyBooking = () => {
  return (
    <>
    <Header />
    <Page
      style={{
        width: "100%",
      }}
    >
      <AsideDesktop />
      <TicketContainer></TicketContainer>
      </Page>
  </>
  )
}

export default MyBooking
