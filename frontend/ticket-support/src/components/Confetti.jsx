import React, { useEffect } from 'react';
import '../components/basicstyle/form.css';

const Confetti = () => {
    useEffect(() => {
      const confettiContainer = document.getElementById('confetti-container');
      const confettiElements = Array.from({ length: 150 }, (_, index) => {
        const confetti = document.createElement('div');
        confetti.classList.add('konfeti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * 100}%`; 
        confetti.style.right = `${Math.random() * 100}%`;
        confetti.style.bottom = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
        return confetti;
      });

    return () => {
      confettiElements.forEach(confetti => {
        confetti.remove();
      });
    };
  }, []);

  return <div id="confetti-container" className="confetti-container"></div>;
};

export default Confetti;
