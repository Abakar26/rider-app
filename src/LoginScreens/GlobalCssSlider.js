/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
import 'material-react-toastify/dist/ReactToastify.css';
import * as geolib from 'geolib';
import React, { useEffect, useRef, useState } from 'react';
import actionCable from 'actioncable';
import { ToastContainer, toast } from 'material-react-toastify';
import { useSelector } from 'react-redux';
import WebRoutes from './WebRoutes';

function GlobalCssSlider() {
  const CableApp = {};
  const user = useSelector((state) => state.userReducer.user);
  const [channelConnection, setChannelConnection] = useState(false);
  const locationCoordinatesRef = useRef();
  const [channel, setChannel] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    location &&
      locationCoordinatesRef?.current &&
      channel &&
      channel.send({
        latitude: locationCoordinatesRef.current.latitude,
        longitude: locationCoordinatesRef.current.longitude
      });
  }, [location]);

  useEffect(() => {
    if (channelConnection) {
      navigator?.geolocation?.getCurrentPosition(
        (position) => {
          locationCoordinatesRef.current = position.coords;
          setLocation(position.coords);
        },
        error,
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      locationCoordinatesRef.current &&
        navigator?.geolocation?.watchPosition(success, error, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
    }
  }, [channelConnection]);

  useEffect(() => {
    if (user?.id) {
      CableApp.cable = actionCable.createConsumer(
        `${process.env.REACT_APP_BASE_URL}/cable?rider_token=${localStorage.getItem('authToken')}`
      );
      setChannel(
        CableApp.cable.subscriptions.create(
          {
            channel: 'RidersLocationChannel',
            rider_id: user?.id
          },
          {
            connected() {
              setChannelConnection(true);
            },
            disconnected: () => {
              setChannelConnection(false);
            }
          }
        )
      );
    }
  }, [user]);

  function success(position) {
    const difference = geolib.getPreciseDistance(
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      {
        latitude: locationCoordinatesRef?.current?.latitude,
        longitude: locationCoordinatesRef?.current?.longitude
      },
      0.01
    );
    if (difference > 15.0) {
      locationCoordinatesRef.current = position.coords;
      setLocation(position.coords);
    }
  }

  function error(err) {
    if (user && channelConnection) {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          toast.error('Location Services are off');
          break;
        default:
          break;
      }
    }
  }
  return (
    <>
      <WebRoutes locationCoordinates={locationCoordinatesRef?.current} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        hideProgressBar
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </>
  );
}

export default GlobalCssSlider;
