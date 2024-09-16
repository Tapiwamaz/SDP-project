import React from 'react'
import Header from '../../Components/Header/Header'
import { Page } from '../../Components/HomePage/HomePage.styles'
import Tabs from '../../Components/Tabs/Tabs'
import AsideDesktop from '../../Components/AsideDesktop/AsideDesktop'
import { auth } from '../../firebase_config'

const AdminDashboard = () => {

  return (
    <>
    {auth?.currentUser?.uid===process.env.REACT_APP_ADMIN_ID?
        <>
        <Header />
        <Page
          style={{
            width: "100%",
          }}
        >
          <AsideDesktop />
          <Tabs></Tabs>
          </Page>
      </>
      :
      alert("You do not have authorization")

    }
    </>
  
  )
}

export default AdminDashboard
