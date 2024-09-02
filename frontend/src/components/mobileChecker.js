import { SpeedDial } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;
    setIsMobile(isMobileDevice);
  };
  window.addEventListener('resize', handleResize);
  handleResize(); // Initialize the value on the first render
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const StyledSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #240439;
    &:hover {
      background-color: #440080;
    }
  }
`;
