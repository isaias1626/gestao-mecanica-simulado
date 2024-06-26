"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { userLoginService } from '@/app/services/userLoginService'

const Home = () => {
  const router = useRouter()
  
  const ValidateLogin = () => {
    debugger;
    let isUserExist = userLoginService.VerifyAuth();

    if (isUserExist === true) {
      router.push('/dashboard/home')
    } else {
      router.push('/login');
    }

  };

  useEffect(() => {
    let test = "test";
    debugger;
    ValidateLogin();
  }, [])

  return (
    <div>
      {/* <Login /> */}
    </div>
  );
};


export default Home;