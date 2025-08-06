import React, { useState, useEffect } from 'react';

const HeroServiceSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      title: "Profesionální klimatizace pro váš domov",
      description: "Zajistíme vám dokonalé klima ve vašem domě s našimi špičkovými klimatizačními systémy. Instalace, servis a poradenství na nejvyšší úrovni.",
      cta: "Zjistit více",
      gradient: "from-blue-600/80 to-blue-500/60"
    },
    {
      title: "Tepelná čerpadla nové generace",
      description: "Ekologické a úsporné řešení pro vytápění i chlazení. Využijte nejmodernější technologie pro maximální komfort a minimální náklady.",
      cta: "Kontaktujte nás",
      gradient: "from-emerald-600/80 to-green-500/60"
    },
    {
      title: "Komplexní servis a údržba",
      description: "Pravidelná údržba prodlouží životnost vašeho zařízení a zajistí optimální výkon. Spolehněte se na naše odborné služby.",
      cta: "Rezervovat servis",
      gradient: "from-orange-500/80 to-amber-500/60"
    }
  ];

  const services = [
    {
      icon: "❄️",
      title: "Klimatizace",
      description: "Instalace a servis klimatizačních jednotek pro domácnosti i komerční prostory.",
      featured: true,
      colorClass: "blue"
    },
    {
      icon: "🔥",
      title: "Tepelná čerpadla",
      description: "Ekologické vytápění využívající obnovitelné zdroje energie pro efektivní provoz.",
      featured: false,
      colorClass: "green"
    },
    {
      icon: "🔧",
      title: "Servis",
      description: "Pravidelná kontrola a údržba vašich zařízení pro jejich spolehlivý provoz.",
      featured: false,
      colorClass: "amber"
    },
    {
      icon: "💨",
      title: "Ventilace",
      description: "Systémy nuceného větrání pro zdravé vnitřní prostředí s vysokou účinností.",
      featured: false,
      colorClass: "pink"
    },
    {
      icon: "📊",
      title: "Poradenství",
      description: "Odborné konzultace a návrhy řešení na míru podle vašich potřeb.",
      featured: false,
      colorClass: "purple"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const serviceSection = document.getElementById('services');
    if (serviceSection) {
      observer.observe(serviceSection);
    }

    return () => observer.disconnect();
  }, []);

  const getIconColorClasses = (colorClass: string) => {
    const colorMap = {
      blue: 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600',
      green: 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600',
      amber: 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600',
      pink: 'bg-gradient-to-br from-pink-100 to-pink-200 text-pink-600',
      purple: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600'
    };
    return colorMap[colorClass as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <>
      {/* Hero Carousel Section */}
      <section className="hero-carousel">
        <div className="carousel-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className={`carousel-overlay bg-gradient-to-br ${slide.gradient}`} />
              <div className="slide-content">
                <div className="slide-inner">
                  <h1 className="slide-title">{slide.title}</h1>
                  <p className="slide-description">{slide.description}</p>
                  <a href="#services" className="cta-button">
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="carousel-nav">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Přejít na snímek ${index + 1}`}
            />
          ))}
        </div>

        {/* Custom Shape Divider */}
        <div className="shape-divider">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      {/* Service Hub Section */}
      <section className="service-hub" id="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Naše služby</h2>
            <p className="section-description">
              Komplexní řešení pro vytápění, chlazení a ventilaci. Specializujeme se na nejmodernější technologie s důrazem na kvalitu a spolehlivost.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-card ${service.featured ? 'featured' : ''} ${
                  isVisible ? 'animate-in' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="service-card-content">
                  <div className={`service-icon ${getIconColorClasses(service.colorClass)}`}>
                    {service.icon}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <a href="#" className="service-link">
                    Zjistit více
                    <span className="service-arrow">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Hero Carousel Styles */
        .hero-carousel {
          position: relative;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
        }

        .carousel-slide.active {
          opacity: 1;
        }

        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .slide-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          padding: 0 2rem;
        }

        .slide-inner {
          max-width: 800px;
          animation: slideUp 1s ease-out;
        }

        .slide-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .slide-description {
          font-size: clamp(1rem, 2vw, 1.2rem);
          margin-bottom: 2rem;
          opacity: 0.95;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: white;
          color: #2563eb;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
        }

        /* Carousel Navigation */
        .carousel-nav {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 3;
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        .nav-dot.active {
          background: white;
          transform: scale(1.2);
        }

        /* Shape Divider */
        .shape-divider {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          transform: rotate(180deg);
        }

        .shape-divider svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 80px;
          transform: rotateY(180deg);
        }

        .shape-fill {
          fill: #f8f9fa;
        }

        /* Service Hub */
        .service-hub {
          background-color: #f8f9fa;
          padding: 6rem 0;
          position: relative;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
        }

        .section-description {
          font-size: 1.2rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Service Grid - 5 cards in one row */
        .service-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .service-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
          transition: all 0.3s ease-in-out;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
        }

        .service-card.animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2563eb, #3b82f6);
          transform: scaleX(0);
          transition: all 0.3s ease-in-out;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .service-card.featured {
          border: 2px solid #2563eb;
        }

        .service-card.featured::before {
          transform: scaleX(1);
        }

        .service-card-content {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .service-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .service-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #111827;
        }

        .service-description {
          color: #6b7280;
          margin-bottom: 1rem;
          line-height: 1.5;
          font-size: 0.9rem;
          flex-grow: 1;
        }

        .service-link {
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease-in-out;
          font-size: 0.9rem;
          margin-top: auto;
        }

        .service-link:hover {
          gap: 0.75rem;
          color: #3b82f6;
        }

        .service-arrow {
          transition: all 0.3s ease-in-out;
        }

        /* Animations */
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 1400px) {
          .service-grid {
            gap: 1.25rem;
          }
          .service-card {
            padding: 1.25rem;
          }
        }

        @media (max-width: 1200px) {
          .service-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-carousel {
            height: 70vh;
            min-height: 500px;
          }

          .slide-content {
            padding: 0 1rem;
          }

          .service-hub {
            padding: 4rem 0;
          }

          .service-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .service-card {
            padding: 1.5rem;
          }

          .container {
            padding: 0 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default HeroServiceSection;



css : /* Reset a základní styly */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #111827;
}

/* Smooth scrolling pro celou stránku */
html {
  scroll-behavior: smooth;
}

/* Focus states pro accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}