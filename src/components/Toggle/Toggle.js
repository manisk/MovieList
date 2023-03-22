import { useState, useEffect } from "react";
import "./Toggle.scss";
export default function Toggle(
  props = {
    value: false,
    onChange: () => {},
  }
) {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
    props.onChange(!isActive);
  };

  useEffect(() => {
    setActive(props.value);
  }, [props.value]);

  return (
    <>
      <div
        className={isActive ? "toggle toogle-on" : "toggle toogle-off"}
        onClick={toggleClass}
      >
        <button>{isActive ? "ON" : "OFF"}</button>
      </div>
    </>
  );
}
