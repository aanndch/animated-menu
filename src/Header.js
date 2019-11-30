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
  let secondBackground = useRef(null);
  let background = useRef(null);

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
      gsap.to([background, secondBackground], {
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

      gsap.to([secondBackground, background], {
        duration: 0.8,
        opacity: 1,
        height: "100%"
      });

      gsap.from([secondBackground, background], {
        duration: 0.8,
        height: 0,
        opacity: 1,
        transformOrigin: "right top",
        skewY: 1,
        ease: "power3.inOut",
        stagger: {
          amount: 0.15
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
        <div
          ref={el => (secondBackground = el)}
          className="secondary-background"
        >
          <div ref={el => (background = el)} className="background"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
