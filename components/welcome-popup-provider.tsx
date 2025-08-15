"use client"

import { WelcomePopup } from "@/components/ui/welcome-popup"
import { FloatingConsultationButton } from "@/components/ui/floating-consultation-button"
import { useWelcomePopup } from "@/hooks/use-welcome-popup"

interface WelcomePopupProviderProps {
  children: React.ReactNode
}

export function WelcomePopupProvider({ children }: WelcomePopupProviderProps) {
  const { 
    isPopupOpen, 
    showFloatingButton, 
    openPopup, 
    closePopup,
    resetPopup,
    showPopupImmediately 
  } = useWelcomePopup()

  // Pro vývojáře - přidání funkcí do window objektu pro testování
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    (window as any).welcomePopup = {
      open: openPopup,
      close: closePopup,
      reset: resetPopup,
      showImmediately: showPopupImmediately
    }
  }

  return (
    <>
      {children}
      
      {/* Welcome Popup */}
      <WelcomePopup 
        isOpen={isPopupOpen} 
        onClose={closePopup} 
      />
      
      {/* Plovoucí tlačítko pro konzultaci */}
      <FloatingConsultationButton 
        onOpen={openPopup}
        isVisible={showFloatingButton}
      />
    </>
  )
}
