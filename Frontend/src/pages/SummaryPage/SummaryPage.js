import { useLocation } from "react-router";
import { Page } from "../../Components/HomePage/HomePage.styles";
import AsideDesktop from "../../Components/AsideDesktop/AsideDesktop";
import Header from "../../Components/Header/Header";
import React, { useState } from "react";
import { auth } from "../../firebase_config";
import Summary from "../../Components/Summary/Summary";
export default function SummaryPage() {
  const event = useLocation().state.event;
  const amount = useLocation().state.amount;
  return (
    <>
      <Header />
      <Page
        style={
          {
            // height: "100%",
          }
        }
      >
        <AsideDesktop />
        <Summary event={event} amount= {amount} />
      </Page>
    </>
  );
}
