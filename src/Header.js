import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Header = () => {
  const [clicked, setClick] = useState(null);
  const [disabled, setDisabled] = useState(false);

  let menu = useRef(null);
  let blackBackground = useRef(null);
  let redBackground = useRef(null);

  const handleMenu = () => {
    disableMenu();
    setClick(!clicked);
  };

  const disableMenu = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 800);
  };

  useEffect(() => {
    if (clicked) {
      gsap.to(menu, {
        duration: 0,
        css: {
          display: "block"
        }
      });

      gsap.to([blackBackground, redBackground], {
        duration: 0,
        opacity: 1,
        height: "100%"
      });

      gsap.from([blackBackground, redBackground], {
        duration: 0.8,
        height: 0,
        transformOrigin: "right top",
        skewY: 2,
        ease: "power3.inOut",
        stagger: {
          amount: 0.1
        }
      });
    } else {
      gsap.to([redBackground, blackBackground], {
        duration: 0.8,
        height: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.15
        }
      });

      gsap.to(menu, {
        duration: 1,
        css: {
          display: "none"
        }
      });
    }
  }, [clicked]);

  return (
    <header>
      <button disabled={disabled} className="menu-btn" onClick={handleMenu}>
        {clicked ? "Close" : "Menu"}
      </button>
      <div ref={el => (menu = el)} className="menu">
        <div
          ref={el => (blackBackground = el)}
          className="black-background"
        ></div>
        <div ref={el => (redBackground = el)} className="red-background"></div>
      </div>
    </header>
  );
};

export default Header;
