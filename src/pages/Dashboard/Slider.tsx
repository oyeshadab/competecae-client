import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import './slider-style.css';

export default function Slider() {
  const [level, setLevel] = useState<number>(10);

  return (
    <div className="flex gap-4">
      <ReactSlider
        className="horizontal-slider-input"
        thumbClassName="horizontal-slider-thumb-input"
        trackClassName="horizontal-slider-track-input"
        onChange={(value) => setLevel(value)}
        value={level}
      />
      <span>{level}</span>
    </div>
  );
}
