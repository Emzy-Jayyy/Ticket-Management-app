import React from "react";

import { COLORS } from "../constants/colors";

const DecorativeCircle = ({
  size,
  top,
  left,
  right,
  bottom,
  opacity = 0.1,
  color = COLORS.primary,
}) => {
  const hexAlpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        background: `radial-gradient(circle, ${color}${hexAlpha} 0%, transparent 70%)`,
        border: `2px solid ${color}33`,
      }}
    />
  );
};

export default DecorativeCircle;
