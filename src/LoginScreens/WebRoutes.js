/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
import '../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChangePasswordScreen from './ChangePasswordScreen';
import HelpCenter from './HelpCenter';
import Home from './Home';
import LoginScreen from './LoginScreen';
import Logistics from '../LogisticsModule/Logistics';
import LogisticsHistory from '../LogisticsModule/LogisticsHistory';
import ProfileScreen from './ProfileScreen';
import SettingScreen from './SettingScreen';
import { ForgotPasswordScreen } from './ForgotPasswordScreen';
import CollectOrderStepsScreen from '../LogisticsModule/CollectOrderStepsScreen';

function WebRoutes({ locationCoordinates }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/logistics"
          element={<Logistics locationCoordinates={locationCoordinates} />}
        />
        <Route path="/" exact element={<Home />} />
        <Route path="/forgot_password" element={<ForgotPasswordScreen />} />
        <Route path="/change_password" element={<ChangePasswordScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/settings" element={<SettingScreen />} />
        <Route path="/help_center" element={<HelpCenter />} />
        <Route path="/collect_order" element={<CollectOrderStepsScreen />} />
        <Route path="/logistics_history" element={<LogisticsHistory />} />
        <Route path="/login" exact element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default WebRoutes;
