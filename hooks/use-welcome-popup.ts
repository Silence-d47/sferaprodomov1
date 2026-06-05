'use client';

import { useState, useEffect } from 'react';

export function useWelcomePopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    // Zobrazit plovoucí tlačítko vždy po načtení stránky
    setShowFloatingButton(true);
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
    setHasShownPopup(true);
    sessionStorage.setItem('welcome-popup-shown', 'true');
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    // Po zavření popupu zůstane plovoucí tlačítko viditelné
    setShowFloatingButton(true);
  };

  // Funkce pro resetování (užitečné pro testování)
  const resetPopup = () => {
    sessionStorage.removeItem('welcome-popup-shown');
    setIsPopupOpen(false);
    setShowFloatingButton(false);
    setHasShownPopup(false);
  };

  // Funkce pro okamžité zobrazení popupu (užitečné pro testování)
  const showPopupImmediately = () => {
    setIsPopupOpen(true);
    setHasShownPopup(true);
    sessionStorage.setItem('welcome-popup-shown', 'true');
  };

  return {
    isPopupOpen,
    showFloatingButton,
    hasShownPopup,
    openPopup,
    closePopup,
    resetPopup,
    showPopupImmediately,
  };
}
