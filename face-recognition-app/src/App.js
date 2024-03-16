import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import styled, { keyframes } from 'styled-components';
import { GlobalStyle } from './globalStyles';

const blueLineAnimation = keyframes`
  0% {
    top: 0;
    background-color: #007bff; /* Start with blue color */
  }
  50% {
    top: calc(100% - 2px);
    background-color: #ff0000; /* Transition to red color */
  }
  100% {
    top: 0;
    background-color: #007bff; /* Transition back to blue color */
  }
`;

const Wrapper = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const ScanButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: purple; /* Change to purple on hover */
  }
`;

const Timer = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  color: #ffcc00; /* Golden yellow color */
  font-family: Arial, sans-serif;
`;

const CameraContainer = styled.div`
  position: relative;
  width: 640px;
  height: 480px;
  margin: 0 auto;
  overflow: hidden;
`;

const BlueLine = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #007bff; /* Blue color */
  animation: ${blueLineAnimation} 2s linear infinite;
`;

const Message = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: red; /* Change to red color */
  font-family: Arial, sans-serif;
`;

const App = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [scanningCompleted, setScanningCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const webcamRef = React.useRef(null);

  useEffect(() => {
    if (scanningCompleted) {
      // Reset timer and close camera after scanning is completed
      setTimer(0);
      setIsCameraOn(false);
    }
  }, [scanningCompleted]);

  const startTimer = () => {
    let timeLeft = 15; // 15 seconds
    const countdown = setInterval(() => {
      timeLeft--;
      setTimer(timeLeft);
      if (timeLeft === 0) {
        clearInterval(countdown);
        setScanningCompleted(true);
      }
    }, 1000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleScanFace = () => {
    setIsCameraOn(true);
    setScanningCompleted(false);
    startTimer();
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Face Recognition</h1>
        <ScanButton onClick={handleScanFace}>Start Scan</ScanButton>
        {isCameraOn && (
          <CameraContainer>
            <Webcam
              audio={false}
              height={480}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={640}
            />
            <BlueLine />
          </CameraContainer>
        )}
        {!isCameraOn && !scanningCompleted && <Message>Please enable camera access</Message>}
        {scanningCompleted && <Message>Face Scanned Successfully</Message>}
        <Timer>{formatTime(timer)}</Timer>
      </Wrapper>
    </>
  );
};

export default App;
