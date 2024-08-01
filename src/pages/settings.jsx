import React from 'react'
import { useBattery } from 'react-use';
const settings = () => {
  const battery = useBattery();

  // Destructuring battery properties
  const { isSupported, level, charging, dischargingTime, chargingTime } =
    battery;

  //Check if browser support Battery API
  if (!isSupported) {
    return (
      <div>
        <strong>Battery sensor</strong>: <span>Not supported</span>
      </div>
    );
  }

  return (
    <div>
      <strong>Charge level</strong>:&nbsp;&nbsp;{" "}
      <span>{(level * 100).toFixed(0)}%</span> <br />
      <strong>Charging</strong>:&nbsp;&nbsp;{" "}
      <span>{charging ? "Yes" : "No"}</span> <br />
      <strong>Charging time</strong>:&nbsp;&nbsp;
      <span>{chargingTime ? chargingTime : "Finished"}</span> <br />
      <strong>Discharging time</strong>:&nbsp;&nbsp;{" "}
      <span>{dischargingTime}</span>
    </div>
  );
}

export default settings
