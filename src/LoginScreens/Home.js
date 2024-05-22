import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return isLoading ? <SplashScreen isLoading={isLoading} /> : <LoginScreen isLoading={isLoading} />;
}

export default Home;
