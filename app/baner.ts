import React, { useState } from 'react';

const ServiceHub = ({ onServiceChange, activeService = 'klimatizace' }) => {
  const [currentActive, setCurrentActive] = useState(activeService);

  const services = [
    {
      id: 'klimatizace',
      title: 'Klimatizace',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
          {/* Vnitřní jednotka klimatizace */}
          <rect x="4" y="8" width="16" height="6" rx="1" strokeWidth="2"/>
          <path d="M6 11h12" strokeWidth="1"/>
          <path d="M6 12h12" strokeWidth="1"/>
          {/* Sněhová vločka */}
          <path d="M12 4l0 3M12 17l0 3M8 6l8 0M8 18l8 0M9 5l6 6M15 5l-6 6M9 19l6-6M15 19l-6-6" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'tepelna-cerpadla',
      title: 'Tepelná Čerpadla',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
          {/* Venkovní jednotka tepelného čerpadla */}
          <rect x="3" y="9" width="18" height="10" rx="2" strokeWidth="2"/>
          {/* Ventilátor */}
          <circle cx="8" cy="14" r="2.5" strokeWidth="1.5"/>
          <path d="M6.5 14h3M8 12.5v3" strokeWidth="1"/>
          {/* Výměník */}
          <path d="M13 11v6M14.5 11v6M16 11v6M17.5 11v6" strokeWidth="1"/>
          {/* Tepelné šipky */}
          <path d="M12 6l-1-1v2M12 6h-2" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M16 6l-1-1v2M16 6h-2" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 'elektroinstalace',
      title: 'Elektroinstalace',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
          {/* Elektrický panel */}
          <rect x="5" y="4" width="14" height="16" rx="1" strokeWidth="2"/>
          {/* Jističe/spínače */}
          <rect x="7" y="6" width="3" height="2" rx="0.5" strokeWidth="1"/>
          <rect x="14" y="6" width="3" height="2" rx="0.5" strokeWidth="1"/>
          <rect x="7" y="10" width="3" height="2" rx="0.5" strokeWidth="1"/>
          <rect x="14" y="10" width="3" height="2" rx="0.5" strokeWidth="1"/>
          <rect x="7" y="14" width="3" height="2" rx="0.5" strokeWidth="1"/>
          <rect x="14" y="14" width="3" height="2" rx="0.5" strokeWidth="1"/>
          {/* Blesk symbol pro elektřinu */}
          <path d="M11 2l-2 6h2l-2 6 4-6h-2l2-6z" fill="currentColor"/>
          {/* Smart indikátory */}
          <circle cx="11" cy="18" r="0.5" fill="currentColor"/>
          <circle cx="13" cy="18" r="0.5" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'rekuperace',
      title: 'Rekuperace',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
          {/* Rekuperační jednotka */}
          <rect x="6" y="8" width="12" height="8" rx="1" strokeWidth="2"/>
          {/* Výměník tepla - horizontální linie */}
          <path d="M8 10h8M8 12h8M8 14h8" strokeWidth="1"/>
          {/* Studený vzduch vstup (modrá) */}
          <path d="M2 11l3 0" strokeWidth="2" opacity="0.7"/>
          <path d="M4 10l1 1l-1 1" strokeWidth="2" opacity="0.7"/>
          {/* Teplý vzduch výstup (červená) */}
          <path d="M19 13l3 0" strokeWidth="2"/>
          <path d="M21 12l1 1l-1 1" strokeWidth="2"/>
          {/* Výfuk studeného vzduchu */}
          <path d="M2 13l3 0" strokeWidth="1" opacity="0.5"/>
          <path d="M4 12l1 1l-1 1" strokeWidth="1" opacity="0.5"/>
          {/* Přívod teplého vzduchu */}
          <path d="M19 11l3 0" strokeWidth="1" opacity="0.5"/>
          <path d="M21 10l1 1l-1 1" strokeWidth="1" opacity="0.5"/>
          {/* Tepelný symbol */}
          <circle cx="12" cy="12" r="1.5" strokeWidth="1"/>
        </svg>
      )
    },
    {
      id: 'fotovoltaika',
      title: 'Fotovoltaika',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
          {/* Fotovoltaické panely */}
          <rect x="4" y="10" width="7" height="5" rx="0.5" strokeWidth="2"/>
          <rect x="13" y="10" width="7" height="5" rx="0.5" strokeWidth="2"/>
          {/* Mřížka panelů */}
          <path d="M7.5 10v5M4 12.5h7M13 12.5h7M16.5 10v5" strokeWidth="1"/>
          {/* Slunce */}
          <circle cx="12" cy="5" r="2" strokeWidth="1.5"/>
          <path d="M12 1v1M12 8v1M16 5h1M7 5H6M15 2l0.5 0.5M8.5 7.5l-0.5-0.5M15 8l0.5-0.5M8.5 2.5l-0.5 0.5" strokeWidth="1" strokeLinecap="round"/>
          {/* Elektrické připojení */}
          <path d="M12 15v2" strokeWidth="2"/>
          <rect x="10" y="17" width="4" height="2" rx="0.5" strokeWidth="1"/>
          {/* Elektrické šipky */}
          <path d="M8 17l1-1h-1l1-1" strokeWidth="1" strokeLinecap="round"/>
          <path d="M16 17l1-1h-1l1-1" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  const handleServiceClick = (serviceId) => {
    setCurrentActive(serviceId);
    if (onServiceChange) {
      onServiceChange(serviceId);
    }
  };

  return (
    <div className="flex items-center gap-0 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.05)_inset]">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => handleServiceClick(service.id)}
          className={`
            flex flex-col items-center justify-center rounded-2xl cursor-pointer
            transition-all duration-300 ease-out text-white
            w-32 h-28 flex-shrink-0
            hover:transform hover:-translate-y-1 hover:scale-105
            ${currentActive === service.id 
              ? 'bg-blue-500 shadow-[0_10px_25px_rgba(59,130,246,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset] transform -translate-y-0.5' 
              : 'bg-transparent hover:bg-white/20 hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)]'
            }
          `}
          aria-label={service.title}
        >
          <div className="mb-2 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            {service.icon}
          </div>
          <span className="text-xs font-semibold text-center leading-tight px-1">
            {service.title}
          </span>
        </button>
      ))}
    </div>
  );
};

// Demo komponenta pro ukázku
const Demo = () => {
  const [selectedService, setSelectedService] = useState('klimatizace');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex flex-col items-center justify-center p-8">
      <div className="mb-12 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Service Hub Component</h1>
        <p className="text-xl opacity-90">Aktuálně vybraná služba: <span className="font-semibold text-blue-300">{selectedService}</span></p>
      </div>
      
      <ServiceHub 
        activeService={selectedService}
        onServiceChange={setSelectedService}
      />
      
      <div className="mt-8 text-center text-white/70 max-w-md">
        <p className="text-sm">
          Klikněte na kteroukoliv službu pro změnu aktivního stavu. 
          Komponenta má plnou podporu pro Tailwind CSS a glassmorphism efekty.
        </p>
      </div>
    </div>
  );
};

export default Demo;