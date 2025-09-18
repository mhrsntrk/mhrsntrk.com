import { useEffect, useRef, useState } from 'react';

const PixelAnimation = () => {
  const gridRef = useRef(null);
  const dotsRef = useRef([]);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Profile picture map (32×32)
  const profileMap = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,0,2,2,2,2,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,0,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,3,2,2,3,3,3,2,3,2,0,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,3,2,2,3,3,2,2,3,2,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,2,4,2,3,3,4,2,3,2,1,2,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,2,2,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,2,2,3,3,1,2,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,2,3,2,1,1,3,1,3,2,0,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,2,1,4,4,3,1,2,0,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,0,1,2,2,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,2,2,3,4,4,4,3,3,3,3,3,3,4,4,4,2,2,2,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,1,1,1,1,
    1,1,1,1,1,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,1,1,1,1,
    1,1,1,1,1,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,2,1,1,1,
    1,1,1,1,1,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,1,1,1,
    1,1,1,1,1,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,1,1,1,
    1,1,1,1,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,1,1,1,
    1,1,1,1,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,1,1,
    1,1,1,1,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,1,1,
    1,1,1,1,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,1,1,
    1,1,1,1,2,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,2,1,1,
    1,1,1,1,2,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,2,1,1,
  ];

  // Base color palette (for dark mode)
  const baseColors = ['#000000', '#404040', '#808080', '#c0c0c0', '#ffffff'];
  
  // Invert colors for light mode
  const colors = isDarkMode ? baseColors : baseColors.slice().reverse();

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Theme detection effect
  useEffect(() => {
    const checkTheme = () => {
      const darkMode = document.documentElement.classList.contains('dark') || 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(darkMode);
    };

    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkTheme);
    };
  }, []);

  useEffect(() => {
    if (!gridRef.current || prefersReducedMotion) return;

    // Create dots for 96×32 grid (3072 total)
    const dots = [];
    for (let i = 0; i < 3072; i++) {
      const dot = document.createElement('div');
      dot.className = 'pixel-dot';
      gridRef.current.appendChild(dot);
      dots.push(dot);
    }
    dotsRef.current = dots;

    // Set initial colors
    const updateColors = () => {
      const currentColors = isDarkMode ? baseColors : baseColors.slice().reverse();
      dots.forEach((dot, index) => {
        const col = index % 96;
        const row = Math.floor(index / 96);
        
        // Portrait area (center 32×32)
        if (col >= 32 && col < 64) {
          const portraitCol = col - 32;
          const portraitIndex = row * 32 + portraitCol;
          if (portraitIndex < profileMap.length) {
            const colorLevel = profileMap[portraitIndex];
            dot.style.background = currentColors[colorLevel];
          }
        } else {
          dot.style.background = currentColors[1]; // background color
        }
      });
    };

    updateColors();

    // Start animation
    setIsVisible(true);
    startAnimation();

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [prefersReducedMotion, isDarkMode]);

  // Update colors when theme changes
  useEffect(() => {
    if (dotsRef.current.length > 0) {
      const currentColors = isDarkMode ? baseColors : baseColors.slice().reverse();
      dotsRef.current.forEach((dot, index) => {
        const col = index % 96;
        const row = Math.floor(index / 96);
        
        // Portrait area (center 32×32)
        if (col >= 32 && col < 64) {
          const portraitCol = col - 32;
          const portraitIndex = row * 32 + portraitCol;
          if (portraitIndex < profileMap.length) {
            const colorLevel = profileMap[portraitIndex];
            dot.style.background = currentColors[colorLevel];
          }
        } else {
          dot.style.background = currentColors[1]; // background color
        }
      });
    }
  }, [isDarkMode]);

  const startAnimation = () => {
    if (prefersReducedMotion) return;

    const createEnhancedPoppingLights = () => {
      const numberOfPops = Math.floor(Math.random() * 6) + 8; // 8-14 dots
      
      for (let i = 0; i < numberOfPops; i++) {
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * 3072);
          const dot = dotsRef.current[randomIndex];
          if (!dot) return;
          
          const col = randomIndex % 96;
          const row = Math.floor(randomIndex / 96);
          
          // Main pop animation
          dot.classList.remove('pixel-pop', 'pixel-ripple');
          setTimeout(() => {
            dot.classList.add('pixel-pop');
            
            // Create ripple effect on neighboring dots
            const neighbors = [
              {r: row-1, c: col}, {r: row+1, c: col},
              {r: row, c: col-1}, {r: row, c: col+1},
              {r: row-1, c: col-1}, {r: row-1, c: col+1},
              {r: row+1, c: col-1}, {r: row+1, c: col+1}
            ];
            
            neighbors.forEach(({r, c}, idx) => {
              if (r >= 0 && r < 32 && c >= 0 && c < 96) {
                const neighborIndex = r * 96 + c;
                const neighborDot = dotsRef.current[neighborIndex];
                
                if (neighborDot) {
                  setTimeout(() => {
                    neighborDot.classList.add('pixel-ripple');
                    setTimeout(() => neighborDot.classList.remove('pixel-ripple'), 2000);
                  }, idx * 100);
                }
              }
            });
            
            setTimeout(() => dot.classList.remove('pixel-pop'), 3000);
          }, 50);
          
        }, i * (Math.random() * 500 + 200));
      }
    };

    // Start continuous animation
    animationRef.current = setInterval(createEnhancedPoppingLights, 2500);
    
    // Initial animation
    setTimeout(createEnhancedPoppingLights, 800);
  };

  // Don't render if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="pixel-animation-container">
      <div 
        ref={gridRef} 
        className={`pixel-grid ${isVisible ? 'pixel-grid-visible' : ''}`}
      />
    </div>
  );
};

export default PixelAnimation;
