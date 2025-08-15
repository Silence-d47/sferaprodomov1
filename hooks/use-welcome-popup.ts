"use client"

import { useState, useEffect } from "react"

export function useWelcomePopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [showFloatingButton, setShowFloatingButton] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)

  useEffect(() => {
    // Kontrola, zda už byl popup zobrazen v této session
    const popupShown = sessionStorage.getItem("welcome-popup-shown")
    
    if (!popupShown) {
      // Zobrazení popupu po 5 sekundách
      const timer = setTimeout(() => {
        setIsPopupOpen(true)
        setHasShownPopup(true)
        sessionStorage.setItem("welcome-popup-shown", "true")
      }, 5000)

      return () => clearTimeout(timer)
    } else {
      // Pokud už byl popup zobrazen, zobrazíme plovoucí tlačítko
      setShowFloatingButton(true)
    }
  }, [])

  const openPopup = () => {
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
    // Po zavření popupu zobrazíme plovoucí tlačítko
    setShowFloatingButton(true)
  }

  // Funkce pro resetování (užitečné pro testování)
  const resetPopup = () => {
    sessionStorage.removeItem("welcome-popup-shown")
    setIsPopupOpen(false)
    setShowFloatingButton(false)
    setHasShownPopup(false)
  }

  // Funkce pro okamžité zobrazení popupu (užitečné pro testování)
  const showPopupImmediately = () => {
    setIsPopupOpen(true)
    setHasShownPopup(true)
    sessionStorage.setItem("welcome-popup-shown", "true")
  }

  return {
    isPopupOpen,
    showFloatingButton,
    hasShownPopup,
    openPopup,
    closePopup,
    resetPopup,
    showPopupImmediately
  }
}
