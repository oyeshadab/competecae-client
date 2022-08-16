import React, { useEffect, useState } from 'react';

function useNavbarEffect(initial: string, effect: string, scroll: number) {
  const [navbar, setNavbar] = useState(initial);
  useEffect(() => {
    const scrollEffect = () => {
      if (window.scrollY >= scroll) {
        setNavbar(effect);
      } else if (window.scrollY <= 20) {
        setNavbar(initial);
      }
    };

    scrollEffect();
    window.addEventListener('scroll', scrollEffect);
  }, []);

  return navbar;
}

export default useNavbarEffect;
