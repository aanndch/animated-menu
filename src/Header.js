import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Header = () => {
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu"
  });

  const [disabled, setDisabled] = useState(false);

  let menu = useRef(null);
  let reveal1 = useRef(null);
  let reveal2 = useRef(null);

  const handleMenu = () => {
    disableMenu();

    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: "Close"
      });
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        menuName: "Menu"
      });
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        menuName: "Close"
      });
    }
  };

  const disableMenu = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  useEffect(() => {
    if (state.clicked === false) {
      gsap.to([reveal2, reveal1], {
        duration: 0.8,
        height: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.07
        }
      });

      gsap.to(menu, {
        duration: 1,
        css: {
          display: "none"
        }
      });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      gsap.to(menu, {
        duration: 0,
        css: {
          display: "block"
        }
      });

      gsap.to([reveal1, reveal2], {
        duration: 0,
        opacity: 1,
        height: "100%"
      });

      gsap.from([reveal1, reveal2], {
        duration: 0.8,
        height: 0,
        transformOrigin: "right top",
        skewY: 2,
        ease: "power3.inOut",
        stagger: {
          amount: 0.1
        }
      });
    }
  }, [state]);

  return (
    <header>
      <button disabled={disabled} className="menu-btn" onClick={handleMenu}>
        {state.menuName}
      </button>
      <div ref={el => (menu = el)} className="menu">
        <div ref={el => (reveal1 = el)} className="secondary-background"></div>
        <div ref={el => (reveal2 = el)} className="background"></div>
      </div>
    </header>
  );
};

export default Header;
