'use client';

import { useEffect, useState } from 'react';
import {
  FaArrowAltCircleLeft,
  FaArrowLeft,
  FaBath,
  FaBed,
  FaBookmark,
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaGoogle,
  FaMapMarker,
  FaMoneyBill,
  FaPaperPlane,
  FaRulerCombined,
  FaTimes
} from 'react-icons/fa';

const icons = {
  arrowAltCircleLeft: FaArrowAltCircleLeft,
  arrowLeft: FaArrowLeft,
  bath: FaBath,
  bed: FaBed,
  bookmark: FaBookmark,
  check: FaCheck,
  exclamationCircle: FaExclamationCircle,
  exclamationTriangle: FaExclamationTriangle,
  google: FaGoogle,
  mapMarker: FaMapMarker,
  moneyBill: FaMoneyBill,
  paperPlane: FaPaperPlane,
  rulerCombined: FaRulerCombined,
  times: FaTimes
};

const HydrationSafeIcon = ({ name, className = '', ...props }) => {
  const [isMounted, setIsMounted] = useState(false);
  const Icon = icons[name];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!Icon) return null;

  if (!isMounted) {
    return (
      <span
        aria-hidden="true"
        className={className}
        suppressHydrationWarning
      />
    );
  }

  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    />
  );
};

export default HydrationSafeIcon;
