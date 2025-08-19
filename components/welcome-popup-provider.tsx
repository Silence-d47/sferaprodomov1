"use client"

import { useState, FormEvent } from 'react'

interface WelcomePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function WelcomePopup({ isOpen, onClose }: WelcomePopupProps) {
  // Stavy pro formulář
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState('') // Pro zobrazení zpráv jako "Děkujeme" nebo "Chyba"

  // Vaše URL je vložena zde
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxpEjOr45h3ErID2_GKH7dmeSy4nwLq8dCj_m9tnJqqC8snPQwMabH7kquuWIs4OCc-eg/exec';

  // Funkce pro odeslání formuláře
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Zabráníme obnovení stránky
    setIsSubmitting(true)
    setFormStatus('Odesílám...')

    const form = e.target as HTMLFormElement;

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        if (response.ok) {
            console.log('Success!', response)
            setFormStatus('Děkujeme za Váš zájem! Brzy se ozveme.')
            setIsSubmitting(false)
            
            // Po 3 sekundách zavřeme popup
            setTimeout(() => {
              onClose(); 
              // Resetujeme status pro příští otevření
              setTimeout(() => setFormStatus(''), 500); 
            }, 3000);
        } else {
            // Pokud server vrátí chybu (např. 4xx, 5xx)
            throw new Error('Chyba při odesílání na server.');
        }
      })
      .catch(error => {
        console.error('Error!', error.message)
        setFormStatus('Nastala chyba. Zkuste to prosím znovu.')
        setIsSubmitting(false)
      })
  }
  
  // Pokud není popup otevřený, nic nevykreslujeme
  if (!isOpen) {
    return null
  }

  // Vzhled komponentu (JSX)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
        
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Získejte Konzultaci Zdarma</h2>
        <p className="text-gray-600 mb-6 text-center">
          Zanechte nám svůj e-mail a my se vám ozveme s termínem pro nezávaznou konzultaci.
        </p>

        {/* Zobrazíme buď formulář, nebo zprávu o úspěchu */}
        {formStatus.startsWith('Děkujeme') ? (
          <div className="text-center text-green-600 font-semibold p-4">
            {formStatus}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email" // Tento 'name' se musí shodovat s kódem v Apps Script
              placeholder="Váš e-mail"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Odesílám...' : 'Odeslat'}
            </button>
            {/* Zobrazení chybové zprávy, pokud nějaká nastane */}
            {formStatus && !formStatus.startsWith('Odesílám') && !formStatus.startsWith('Děkujeme') && (
              <p className="text-red-500 text-sm mt-2 text-center">{formStatus}</p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}