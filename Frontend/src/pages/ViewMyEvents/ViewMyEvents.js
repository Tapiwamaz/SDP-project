import React from 'react'
import Header from '../../Components/Header/Header'
import { Page } from '../../Components/HomePage/HomePage.styles'
import AsideDesktop from '../../Components/AsideDesktop/AsideDesktop'
import MyEvents from '../../Components/ViewEvents/MyEvents/MyEvents'
import ScrollToTopButton from '../../Components/ScrollToTop/ScrollToTopButton'

const ViewMyEvents = ({userID}) => {
  return (
    <>
    <Header />
    <Page
      style={{
        width: "100%",
      }}
    >
      <AsideDesktop />
      <MyEvents  />
      <ScrollToTopButton/>
      </Page>
  </>
  )
}

export default ViewMyEvents
