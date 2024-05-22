/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
// Imports

import './styles.css';
import { MenuItem, Select } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'material-react-toastify';
import { useNavigate } from 'react-router-dom';
import { PICKUP_STATUSES } from '../redux-store/constants/statusConstants';
import {
  setPractices,
  updatePracticeStatus,
  setEnroutedPractices
} from '../redux-store/slices/practicesSlice';

import { setUserStatus, destroyUser } from '../redux-store/slices/userSlice';

export function SelectStatus(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  const practices = useSelector((state) => state.practicesReducer.practices);
  const [enroutedPractice] = useSelector((state) => state.practicesReducer.enroutedPractices);

  const buttonStyle = {
    fontFamily: 'Mulish',
    backgroundColor: '#ffffff',
    textTransform: 'none',
    color: '#455066',
    fontSize: '13px',
    lineHeight: '16px',
    fontWeight: '400',
    letterSpacing: '0.01em'
  };

  /*
  This function returns filtered assigned
  and enrouted practices when state of practice
  order changes, and then we'll update data in redux
  */

  const updatePracticesData = () => {
    const tempData = JSON.parse(JSON.stringify(practices));
    let assignedPractices = [];
    let enroutedPracticesTemp = [];
    if (props.currentValue === 'En-route') {
      enroutedPracticesTemp = [];
      tempData.splice(enroutedPractice?.idx, 0, props.data);
      assignedPractices = [...tempData];
    } else {
      assignedPractices = [...tempData.filter((item) => item.id !== props.data.id)];
      const indexOf = tempData.findIndex((item) => item.id === props.data.id);
      enroutedPracticesTemp = [
        ...tempData
          .filter((item) => item.id === props.data.id)
          .map((item) => {
            return { ...item, idx: indexOf };
          })
      ];
    }
    return [assignedPractices, enroutedPracticesTemp];
  };

  // Event Handler
  const handleChange = (e) => {
    let newStatus = '';
    if (props.currentValue === 'Assigned') {
      newStatus = 'en-route';
    } else if (props.currentValue === 'En-route') {
      newStatus = 'assigned';
    }
    const data = {
      userId: user?.id,
      order: {
        old_status: props.currentValue.toLowerCase()
      },
      riders: {
        practice_id: props.data.id,
        status: e.target.value.toLowerCase()
      }
    };

    // For toggling state of practice
    dispatch(updatePracticeStatus(data))
      .unwrap()
      .then(() => {
        const [assignedPractices, enroutedPractices] = updatePracticesData();
        dispatch(setPractices(assignedPractices));
        dispatch(setEnroutedPractices(enroutedPractices));
        dispatch(setUserStatus(newStatus));
      })
      .catch((err) => {
        if (err?.error === 'You need to sign in or sign up before continuing.') {
          toast.error('Your session has been expired');
          dispatch(destroyUser());
          navigate('/login');
        }
        toast.error(err);
      });
  };

  return (
    <Select
      sx={{
        borderRadius: '20px',
        border: '1px',
        borderColor: '#8493AE',
        textAlign: 'center',
        padding: '2px 12px',
        width: '101px'
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            borderRadius: '0px',
            border: 'solid #CAD3E5'
          }
        },
        MenuListProps: { disablePadding: true }
      }}
      className="select-status"
      IconComponent={() => null}
      style={buttonStyle}
      value={props.currentValue}
      onChange={handleChange}>
      {PICKUP_STATUSES.map((element, index) => (
        <MenuItem
          value={element}
          key={index}
          sx={{
            p: '8px 12px',
            fontFamily: 'Mulish',
            fontSize: '12px',
            lineHeight: '15px',
            minHeight: 'fit-content',
            borderBottom: index === PICKUP_STATUSES.length - 1 ? '0px' : 'solid #CAD3E5'
          }}>
          {element}
        </MenuItem>
      ))}
    </Select>
  );
}
