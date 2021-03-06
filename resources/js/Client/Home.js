import React, { useContext, useEffect } from 'react'
import BannerImage from '../../img/banner_1.jpg'
import Background from '../../img/background.png'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../store';
import { openNotification } from '../Helpers/Notification';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { momoSuccess } = useContext(AppContext);
  let navigate = useNavigate();
  
  useEffect(()=> {
    let orderId = searchParams.get("orderId")
    let resultCode = searchParams.get("resultCode")
    if(resultCode == 0){
      console.log(orderId)
      momoSuccess({orderId}).then((res)=>{
        openNotification(res.data)
        navigate("/my-order")
      })
    }
  }, [])
  return (
    <>
      <img src={BannerImage} className='responsive' />
      <img src={Background} className='responsive' />
    </>
  )
}

export default Home