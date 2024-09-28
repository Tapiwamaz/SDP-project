import React, { useState } from 'react'
import { mockNotifications } from '../../MockData/MockData'
import Header from '../Header/Header'
import { ArrowLeftCircleIcon,PlusCircleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router'
import { formatDistanceToNow } from 'date-fns'
import { Top, Card,StyledPlus,LoadingCard } from './Notifications.styles'

import noResultsImage from "../../Images/noResults.svg";


const Notifications = () => {
  const navigate = useNavigate();
  const noNotification = [
    { Notifications: "no" },
    { Notifications: "no" },
    { Notifications: "no" },
    { Notifications: "no" },
    { Notifications: "no" },
  ];

  const [loaded,setLoaded]=useState(true);
  const sortedNotifications = mockNotifications.sort((a, b) => new Date(b.time) - new Date(a.time));
  const createNotification=()=>{
    console.log("hello");
    
  }



  return (
    <div>
      <Header />
      <Top>
        <ArrowLeftCircleIcon
          width={40}
          onClick={() => navigate(-1)}
        />
        <h3>Notifications</h3>
        <StyledPlus onClick={createNotification}></StyledPlus>
      
      </Top>
      {loaded?

      mockNotifications.length>0?sortedNotifications
        .map((noti) => (
          <Card key={noti.notification_id}>
            <div className="headerNoti">
              <img src={'https://photographylife.com/wp-content/uploads/2018/11/Moeraki-Boulders-New-Zealand.jpg'} alt="profile" />
              <div className='leftNoti'>
              <h5> {noti.name}</h5>
              <p>{formatDistanceToNow(new Date(noti.time), { addSuffix: true })}</p>



              </div>
            </div>
            <p>{noti.message}</p>
          </Card>
        ))
        :
        <>
        <img src={noResultsImage} alt="No Results" />
        <h3>No Notifications found</h3>
      </> 
      :
    //   Loading
    noNotification.map((noti)=>(
        <LoadingCard></LoadingCard>

       ))
      }

    </div>
  );
}

export default Notifications;

