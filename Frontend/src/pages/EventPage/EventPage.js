import React from 'react'
import Header from '../../Components/Header/Header'
import { Page } from '../../Components/HomePage/HomePage.styles'
import AsideDesktop from '../../Components/AsideDesktop/AsideDesktop'
import EventDisplay from '../../Components/EventDisplay/EventDisplay'

export default function EventPage() {
  return (
    <>
      <Header />
      <Page
        style={{
          width: "100%",
        }}
      >
        <AsideDesktop />
        <EventDisplay />
        </Page>
    </>
  )
}
