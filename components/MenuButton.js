"use client";
import { motion } from "framer-motion";

const MenuButton = ({
  isOpen = false,
  width = 24,
  height = 20,
  strokeWidth = 3,
  color = "#fff",
  transition = null,
  lineProps = null,
  ...props
}) => {
  const variant = isOpen ? "opened" : "closed";
  const top = {
    closed: {
      rotate: 0,
      translateY: 0.5,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  };
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: -0.5,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  };
  lineProps = {
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    // mixBlendMode: "exclusion",
    transition,
    ...lineProps,
  };
  const unitHeight = 4;
  const unitWidth = (unitHeight * width) / height;

  return (
    <motion.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow="visible"
      preserveAspectRatio="none"
      width={width}
      height={height}
      {...props}
    >
      <motion.path d={`M 0 0 L ${unitWidth} 0`} variants={top} {...lineProps} />
      <motion.path
        d={`M 0 2 L ${unitWidth} 2`}
        variants={center}
        {...lineProps}
      />
      <motion.path
        d={`M 0 4 L ${unitWidth} 4`}
        variants={bottom}
        {...lineProps}
      />
    </motion.svg>
  );
};

export { MenuButton };