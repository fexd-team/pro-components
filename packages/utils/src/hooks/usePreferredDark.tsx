import { useState, useEffect } from 'react'

function usePreferredDark() {
  // State to keep track of the preferred dark mode
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Function to update the dark mode state based on the media query
    const updateIsDarkMode = (event) => {
      setIsDarkMode(event.matches)
    }

    // Create a media query list object
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

    // Set the initial state
    setIsDarkMode(mediaQueryList.matches)

    // Add event listener to handle changes
    mediaQueryList.addEventListener('change', updateIsDarkMode)

    // Cleanup function to remove the event listener
    return () => {
      mediaQueryList.removeEventListener('change', updateIsDarkMode)
    }
  }, [])

  return isDarkMode
}

export default usePreferredDark
