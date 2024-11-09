import { useState, useEffect} from 'react';
import bike from '../images/bike.png'; 
import boyfriend from '../images/boyfriend.png';
import car from '../images/car.png';
import pension from '../images/pension.png';
import smile from '../images/smile.png';
import sport from '../images/sport.png';
import together from '../images/together.png';
import walk from '../images/walk.png';
import { PiPaperPlaneFill } from "react-icons/pi";
import '../Styles/Slider.css';


const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  // Información para cada card
  const cardsData = [
    {
      image: bike,
      title: 'Savings',
      text: 'Whatever it is you want to save for, our range of savings accounts can help. Find the right account for you.',
      link: 'https://www.lloydsbank.com/savings.html?WT.ac=hp/prod-carousel/savings',
      buttonText: 'Savings products',
    },
    {
      image: boyfriend,
      title: 'Personal Loans',
      text: 'Find out how much you could borrow before you apply.The amount we lend and the rate we offer you will be dependent on your personal circumstances.',
      link: 'https://www.lloydsbank.com/loans.html?WT.ac=hp/prod-carousel/loans',
      buttonText: 'Get a quote now',
    },
    {
      image: car,
      title: 'Car leasing',
      text: 'Lease a new car in just a few taps online or in our app.',
      link: 'https://www.lloydsbank.com/car-finance/car-leasing.html?WT.ac=hp/prod-carousel/car-leasing',
      buttonText: 'Discover car leasing',
    },
    {
      image: pension,
      title: 'Ready-Made Pension',
      text: 'Get a pension that’s ready to go in minutes. You can view, track and top up your pension savings anytime, anywhere – through our app. Capital at risk.',
      link: '/pension-plan',
      buttonText: 'Pension products',
    },
    {
      image: smile,
      title: 'Current accounts',
      text: 'Take a look at our range of current accounts to find the right one for you.',
      link: '/health-insurance',
      buttonText: 'Explore our accounts',
    },
    {
      image: sport,
      title: 'Credit Cards',
      text: 'Invest in your health and well-being with our sport savings account.',
      link: '/sport-savings',
      buttonText: 'Check your eligibility',
    },
    {
      image: together,
      title: 'Mortgages',
      text: 'Find a mortgage deal that best suits your needs. Explore and compare our mortgage rates, online or in our app.',
      link: '/family-savings',
      buttonText: 'Find your mortgage',
    },
    {
      image: walk,
      title: 'Life insurance',
      text: 'When life has other plans, its good to have a back-up. Protect you and your loved ones with up to £500k of life or critical illness cover, provided by Scottish Widows.',
      buttonText: 'View our life insurance',
      link: '/travel-fund',
    },
  ];

  const totalCards = cardsData.length;

  useEffect(() => {
    const updateCardWidth = () => {
      const cardElement = document.querySelector('.card');
      if (cardElement) {
        // incluimos márgenes en el cálculo del ancho
        const cardStyle = window.getComputedStyle(cardElement);
        const marginLeft = parseFloat(cardStyle.marginLeft);
        const marginRight = parseFloat(cardStyle.marginRight);
        setCardWidth(cardElement.offsetWidth + marginLeft + marginRight);
      }
    };

    window.addEventListener('resize', updateCardWidth);
    updateCardWidth(); // inicializa el ancho de la tarjeta

    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalCards - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalCards - 1 : prevIndex - 1
    );
  };

  const isAtEnd = {
    prev: currentIndex === 0,
    next: currentIndex === totalCards - 1,
  };

  return (
    <div className="slider-container">
      <div className="left-panel">
        <h2>Our Products</h2>
      </div>
      <div className="slider-wrapper">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
        >
          {cardsData.map((card, index) => (
            <div key={index} className="card">
              {/* contenido de la tarjeta */}
              <img src={card.image} alt={card.title} />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <a href={card.link}><button>{card.buttonText}</button></a>
            </div>
          ))}
        </div>
        <div className="slider-controls">
          <button className="prev" onClick={prevSlide} disabled={isAtEnd.prev}>
            <PiPaperPlaneFill className="prev-icon rotated" /> {/* Ícono rotado */}
          </button>
          <button className="next" onClick={nextSlide} disabled={isAtEnd.next}>
            <PiPaperPlaneFill className="next-icon" /> {/* Ícono sin rotación */}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Slider;