import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        // Si byDateDesc n'est pas chargé, ne faites rien
        if (!byDateDesc) {
          return prevIndex;
        }

        // Si byDateDesc est chargé, incrémentez l'index
        return (prevIndex + 1) % byDateDesc.length;
      });
    }, 5000);
    
    // Nettoyez votre intervalle !
    return () => clearInterval(interval);
  }, [byDateDesc]);

  // Assurez-vous que byDateDesc est chargé avant de rendre le slider
  if (!byDateDesc) {
    return null;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={event.title} 
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (<input
              key={event.title}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
