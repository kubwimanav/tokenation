import { useState, useEffect } from 'react'
import { FaMobileAlt, FaPhone, FaGamepad, FaLock, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowUp } from 'react-icons/fa'
import { MdPhone } from 'react-icons/md'
import billiardBg from '../assets/billiard.jpeg'
import yellowBg from '../assets/yellow.png'
import imigongoBorder from '../assets/imigongo.png'
import translations from '../translations.json'
import AOS from 'aos'
import { useLocation, useNavigate } from "react-router-dom";


function Home({ selectedLanguage, handleLanguageChange, languages }) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);



  // Translation function
  const t = (key) => {
    return translations[selectedLanguage]?.[key] || translations.en[key] || key;
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Translation function
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="home-page">
        {/* Hero Section */}
        <section
          id="home"
          className="hero"
          style={{ backgroundImage: `url(${billiardBg})` }}
        >
          <div className="hero-overlay"></div>
          <div className="bouncing-balls-container">
            <div className="bouncing-ball ball-1" style={{ left: "10%" }}>
              🎱
            </div>
            <div className="bouncing-ball ball-2" style={{ left: "20%" }}>
              🎱
            </div>
            <div className="bouncing-ball ball-3" style={{ left: "25%" }}>
              🎱
            </div>
            <div className="bouncing-ball ball-4" style={{ left: "75%" }}>
              🎱
            </div>
            <div className="bouncing-ball ball-5" style={{ left: "80%" }}>
              🎱
            </div>
            <div className="bouncing-ball ball-6" style={{ left: "90%" }}>
              🎱
            </div>
            <div className="bouncing-ball ball-7" style={{ left: "15%" }}>
              🎱
            </div>
            <div className="bouncing-ball ball-8" style={{ left: "85%" }}>
              🎱
            </div>
          </div>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="notranslate">
                {t("hero.title")
                  .split(" ")
                  .map((word, wordIndex) => (
                    <span key={wordIndex} className="word">
                      {word.split("").map((char, charIndex) => (
                        <span
                          key={`${wordIndex}-${charIndex}`}
                          style={{
                            animationDelay: `${(wordIndex * word.length + charIndex) * 0.1}s`,
                          }}
                        >
                          {char}
                        </span>
                      ))}
                      {wordIndex < t("hero.title").split(" ").length - 1 && (
                        <span
                          key={`${wordIndex}-space`}
                          style={{
                            animationDelay: `${(wordIndex * word.length + word.length) * 0.1}s`,
                          }}
                        >
                          &nbsp;
                        </span>
                      )}
                    </span>
                  ))}
              </h1>
              <p className="hero-subtitle notranslate">{t("hero.subtitle")}</p>
              <button
                className="cta-button notranslate"
                onClick={() => navigate("/login")}
              >
                {t("hero.cta")}
              </button>
            </div>
          </div>
        </section>
        <div
          className="section-border"
          style={{ backgroundImage: `url(${imigongoBorder})` }}
        ></div>

        {/* Services Section */}
        <section 
      id="services" 
      className="py-20 px-4 bg-white w-screen max-w-full overflow-x-hidden"
    >
      <div className="max-w-300 mx-auto px-4 w-full box-border">
        {/* Section Title */}
        <h2
          className="text-center text-[2.5rem] mb-12 text-black font-bold tracking-tight bg-contain bg-no-repeat bg-center py-6 px-8 inline-block relative left-1/2 -translate-x-1/2 md:text-[2.5rem] sm:text-[2rem] xs:text-[1.75rem]"
          style={{ backgroundImage: `url(${yellowBg})` }}
        >
          {t("services.title")}
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 sm:gap-5">
          {/* Service Card 1 */}
          <div
            className="bg-[#f5f5f5] p-8 rounded-xl text-center transition-all duration-300 border-2 border-[#e8e8e8] hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:border-amber-500 md:p-6 sm:p-5"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="text-3xl mb-4 text-amber-500 flex justify-center">
              <FaMobileAlt />
            </div>
            <h3 className="text-black mb-4 text-2xl font-semibold md:text-xl sm:text-lg">
              {t("services.webSystem.title")}
            </h3>
            <p className="text-gray leading-relaxed text-base md:text-xm">
              {t("services.webSystem.description")}
            </p>
          </div>

          {/* Service Card 2 */}
          <div
            className="bg-[#f5f5f5] p-8 rounded-xl text-center transition-all duration-300 border-2 border-[#e8e8e8] hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:border-amber-500 md:p-6 sm:p-5"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="text-3xl mb-4 text-amber-500 flex justify-center">
              <FaPhone />
            </div>
            <h3 className="text-black mb-4 text-2xl font-semibold md:text-xl sm:text-lg">
              {t("services.ussd.title")}
            </h3>
            <p className="text-gray leading-relaxed text-base md:text-xm">
              {t("services.ussd.description")}
            </p>
          </div>

          {/* Service Card 3 */}
          <div
            className="bg-[#f5f5f5] p-8 rounded-xl text-center transition-all duration-300 border-2 border-[#e8e8e8] hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:border-amber-500 md:p-6 sm:p-5"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="text-3xl mb-4 text-amber-400 flex justify-center">
              <FaGamepad />
            </div>
            <h3 className="text-black mb-4 text-2xl font-semibold md:text-xl sm:text-lg">
              {t("services.tokenSystem.title")}
            </h3>
            <p className="text-gray leading-relaxed text-base md:text-xm">
              {t("services.tokenSystem.description")}
            </p>
          </div>

          {/* Service Card 4 */}
          <div
            className="bg-[#f5f5f5] p-8 rounded-xl text-center transition-all duration-300 border-2 border-[#e8e8e8] hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:border-amber-500 md:p-6 sm:p-5"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="text-3xl mb-4 text-amber-400 flex justify-center">
              <FaLock />
            </div>
            <h3 className="text-black mb-4 text-2xl font-semibold md:text-xl sm:text-lg">
              {t("services.secure.title")}
            </h3>
            <p className="text-gray leading-relaxed text-base md:text-xm">
              {t("services.secure.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
        <div
          className="section-border"
          style={{ backgroundImage: `url(${imigongoBorder})` }}
        ></div>

        {/* About Section */}
        <section id="about" className="about">
          <div className="container">
            <h2
              className="section-title"
              style={{ backgroundImage: `url(${yellowBg})` }}
            >
              {t("about.title")}
            </h2>
            <div className="about-grid">
              <div className="about-left" data-aos="fade-right">
                <h3>{t("about.howItWorks.title")}</h3>
                <p>{t("about.howItWorks.description1")}</p>
                <p>{t("about.howItWorks.description2")}</p>
                <p>{t("about.howItWorks.description3")}</p>
              </div>
              <div className="about-right" data-aos="fade-left">
                <h3>{t("about.getStarted.title")}</h3>
                <div className="process-section">
                  <h4>{t("about.buyTokens.title")}</h4>
                  <ul className="process-list">
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("about.buyTokens.step1")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("about.buyTokens.step2")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("about.buyTokens.step3")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("about.buyTokens.step4")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("about.buyTokens.step5")}</span>
                    </li>
                  </ul>
                </div>
                <div className="process-section">
                  <h4>{t("about.placeBet.title")}</h4>
                  <ul className="process-list">
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("about.placeBet.step1")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("about.placeBet.step2")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("about.placeBet.step3")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("about.placeBet.step4")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("about.placeBet.step5")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="section-border"
          style={{ backgroundImage: `url(${imigongoBorder})` }}
        ></div>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <div className="container">
            <h2
              className="section-title"
              style={{ backgroundImage: `url(${yellowBg})` }}
            >
              {t("contact.title")}
            </h2>
            <div className="contact-grid">
              <div className="contact-left" data-aos="fade-right">
                <h3>{t("contact.getInTouch.title")}</h3>
                <p>{t("contact.getInTouch.description")}</p>
                <div className="contact-details">
                  <div className="contact-detail-item">
                    <div className="contact-icon">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h4>{t("contact.email")}</h4>
                      <p>info@tega.rw</p>
                    </div>
                  </div>
                  <div className="contact-detail-item">
                    <div className="contact-icon">
                      <MdPhone />
                    </div>
                    <div>
                      <h4>{t("contact.phone")}</h4>
                      <p>+250787462570</p>
                    </div>
                  </div>
                  <div className="contact-detail-item">
                    <div className="contact-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h4>{t("contact.location")}</h4>
                      <p>Kigali, Rwanda</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-right" data-aos="fade-left">
                <h3>{t("contact.supportHours.title")}</h3>
                <div className="support-section">
                  <h4>{t("contact.businessHours.title")}</h4>
                  <ul className="support-list">
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("contact.businessHours.weekdays")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("contact.businessHours.saturday")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("contact.businessHours.sunday")}</span>
                    </li>
                  </ul>
                </div>
                <div className="support-section">
                  <h4>{t("contact.customerSupport.title")}</h4>
                  <ul className="support-list">
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("contact.customerSupport.ussd")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("contact.customerSupport.liveChat")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("contact.customerSupport.email")}</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>{t("contact.customerSupport.phone")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="section-border"
          style={{ backgroundImage: `url(${imigongoBorder})` }}
        ></div>

        
      </div>
    </>
  );
}

export default Home
