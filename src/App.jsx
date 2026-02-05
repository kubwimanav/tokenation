import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'
import './components/Auth.css'
import Game from './components/Game'
import LayoutToken from './tokenman/LayoutToken'
import AvailableTable from './tokenman/AvailableTable'
import LandingLayout from './components/LandingLayout'
import TokenHome from './tokenman/TokenHome'
import AdminLayout from './admindashboard/AdminLayout'
import AdminHome from './admindashboard/AdminHome'
import UserManagement from './admindashboard/userManagement'
import AdminCommission from './admindashboard/AdminCommission'
import UserHistory from './tokenman/UserHistory'
import GameHistory from './tokenman/GameHistory'
import CommissionPage from './tokenman/CommissionPage'
import AdminAvailableTable from './admindashboard/AdminAvailableTable'
import ScrollTop from './components/ScrollTop'
import Otpverification from './components/Otpverification'

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Load saved language preference
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedLanguage') || 'en'
    }
    return 'en'
  })

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' }
  ]

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    })

    // Apply saved language preference on load
    const savedLanguage = localStorage.getItem('selectedLanguage')
    if (savedLanguage && savedLanguage !== 'en') {
      // Small delay to ensure Google Translate is loaded
      setTimeout(() => {
        handleLanguageChange(savedLanguage)
      }, 1000)
    }

    // SANTECH-style Google Translate implementation
    const initializeGoogleTranslate = () => {
      const hideTranslateBanner = () => {
        // Hide banner frame
        const bannerFrames = document.querySelectorAll('.goog-te-banner-frame, .skiptranslate')
        bannerFrames.forEach((frame) => {
          if (frame instanceof HTMLElement) {
            frame.style.display = 'none'
            frame.style.visibility = 'hidden'
            frame.style.height = '0'
          }
        })

        // Prevent body from shifting
        document.body.style.top = '0'
        document.body.style.position = 'static'

        // Hide iframes
        const iframes = document.querySelectorAll('iframe[title*="translate"], iframe[name*="google"]')
        iframes.forEach((iframe) => {
          if (iframe instanceof HTMLElement) {
            iframe.style.display = 'none'
            iframe.style.visibility = 'hidden'
            iframe.style.height = '0'
            iframe.style.width = '0'
          }
        })
      }

      const initializeTranslateElement = () => {
        const element = document.getElementById('google_translate_element')
        if (!element) {
          setTimeout(initializeTranslateElement, 200)
          return
        }

        const google = window.google
        if (google && google.translate && google.translate.TranslateElement) {
          if (!window.googleTranslateElementInstance) {
            window.googleTranslateElementInstance = new google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,fr,rw',
                autoDisplay: false,
              },
              'google_translate_element'
            )
          }
          
          // Hide banner after initialization
          setTimeout(hideTranslateBanner, 100)
        }
      }

      window.googleTranslateElementInit = initializeTranslateElement

      const scriptId = 'google-translate-script'
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script')
        script.id = scriptId
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        script.async = true
        script.onload = () => {
          setTimeout(hideTranslateBanner, 500)
        }
        document.body.appendChild(script)
      } else {
        initializeTranslateElement()
      }

      // Monitor and hide banner when it appears
      const observer = new MutationObserver(() => {
        hideTranslateBanner()
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })

      // Initial hide and periodic check
      hideTranslateBanner()
      const hideInterval = setInterval(hideTranslateBanner, 2000)

      return () => {
        observer.disconnect()
        clearInterval(hideInterval)
      }
    }

    const cleanup = initializeGoogleTranslate()
    return cleanup
  }, [])

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode)
    
    // Save language preference
    localStorage.setItem('selectedLanguage', langCode)
    
    // SANTECH-style cookie approach without page reload
    const hostname = window.location.hostname
    const hasDomain = hostname.includes('.')
    const expires = 'Thu, 01 Jan 1970 00:00:00 GMT'

    const clearGoogleTranslateCookie = () => {
      document.cookie = `googtrans=;expires=${expires};path=/;`
      if (hasDomain) {
        document.cookie = `googtrans=;expires=${expires};path=/;domain=${hostname};`
      }
    }

    const setGoogleTranslateCookie = (value) => {
      const cookieValue = `/en/${value}`
      document.cookie = `googtrans=${cookieValue};path=/;`
      if (hasDomain) {
        document.cookie = `googtrans=${cookieValue};path=/;domain=${hostname};`
      }
    }

    if (langCode === 'en') {
      clearGoogleTranslateCookie()
    } else {
      setGoogleTranslateCookie(langCode)
    }

    // Trigger Google Translate without page reload
    let attempts = 0
    const maxAttempts = 25

    const dispatchChange = () => {
      const combo = document.querySelector('.goog-te-combo')
      if (combo) {
        const targetValue = langCode === 'en' ? 'en' : langCode
        if (combo.value !== targetValue) {
          combo.value = targetValue
        }
        combo.dispatchEvent(new Event('change'))
      } else if (attempts < maxAttempts) {
        attempts += 1
        setTimeout(dispatchChange, 200)
      }
    }

    dispatchChange()
  }





 

  return (
    <Router>
      <ScrollTop />
      <div className="app">
        {/* Hidden Google Translate Element */}
        <div id="google_translate_element" style={{ display: "none" }}></div>

        {/* Navigation */}

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <LandingLayout
                selectedLanguage={selectedLanguage}
                handleLanguageChange={handleLanguageChange}
                languages={languages}
              />
            }
          >
            <Route
              index
              element={
                <Home
                  selectedLanguage={selectedLanguage}
                  handleLanguageChange={handleLanguageChange}
                  languages={languages}
                />
              }
            />

            <Route
              path="/game"
              element={<Game selectedLanguage={selectedLanguage} />}
            />
            <Route
              path="/login"
              element={<Login selectedLanguage={selectedLanguage} />}
            />
            <Route
              path="/register"
              element={<Register selectedLanguage={selectedLanguage} />}
            />
            <Route
              path="/otp"
              element={<Otpverification selectedLanguage={selectedLanguage} />}
            />
          </Route>

          <Route
            path="/token"
            element={<LayoutToken selectedLanguage={selectedLanguage} />}
          >
            <Route
              index
              element={<TokenHome selectedLanguage={selectedLanguage} />}
            />
            <Route
              path="token"
              element={<TokenHome selectedLanguage={selectedLanguage} />}
            />
            <Route
              path="commission"
              element={<CommissionPage selectedLanguage={selectedLanguage} />}
            />
            <Route
              path="tokentable"
              element={<AvailableTable selectedLanguage={selectedLanguage} />}
            />
            <Route
              path="userhistory"
              element={<UserHistory selectedLanguage={selectedLanguage} />}
            />
            <Route
              path="gamehistory"
              element={<GameHistory selectedLanguage={selectedLanguage} />}
            />
          </Route>

          <Route
            path="/admin"
            element={<AdminLayout selectedLanguage={selectedLanguage} />}
          >
            <Route
              index
              element={<AdminHome selectedLanguage={selectedLanguage} />}
            />
            <Route
              path="admin"
              element={<AdminHome selectedLanguage={selectedLanguage} />}
            />
            <Route
              path="adminuser"
              element={<UserManagement selectedLanguage={selectedLanguage} />}
            />
            <Route
              path="admincommission"
              element={<AdminCommission selectedLanguage={selectedLanguage} />}
            />
            <Route
              path="admintable"
              element={
                <AdminAvailableTable selectedLanguage={selectedLanguage} />
              }
            />
          </Route>

          <Route
            path="/token"
            element={<LayoutToken selectedLanguage={selectedLanguage} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App