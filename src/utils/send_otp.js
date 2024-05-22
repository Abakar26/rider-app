import axios from 'axios';
import { toast } from 'material-react-toastify';

const sendOTP = (phoneNum, navigate, resend = false) => {
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/v1/riders/send_otp`, {
      riders: { contact_number: phoneNum }
    })
    .then((response) => {
      localStorage.setItem('rider', JSON.stringify({ id: response.rider }));
      if (resend) {
        localStorage.removeItem('phoneNumber');
      } else {
        localStorage.setItem('phoneNumber', phoneNum);
        navigate('/login_verify');
      }
    })
    .catch((error) => {
      toast.error(error.response?.data?.message);
    });
};

export default sendOTP;
