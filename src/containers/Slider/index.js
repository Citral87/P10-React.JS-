import { useEffect, useRef, useState } from "react";  // Ajout de useRef aux imports
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  
  const timeoutRef = useRef(null);  //  Création de la référence pour le timeout

  useEffect(() => {
    if(timeoutRef.current !== null){  //  Annulation du timeout précédent
      clearTimeout(timeoutRef.current);
    }
    
    //  Démarrage d'un nouveau timeout (anciennement dans la fonction nextCard)
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) => {
        if (!byDateDesc) {
          return prevIndex;
        }
        return (prevIndex + 1) % byDateDesc.length;
      });
    }, 5000);

    //  Annulation du timeout lorsque le composant est démonté
    return () => {
      if(timeoutRef.current !== null){
        clearTimeout(timeoutRef.current);
      }
    };
  }, [byDateDesc, index]);  // Ajout de index aux dépendances de l'effet

  const handleClick = (idx) => {  // Ajout de la fonction handleClick
    setIndex(idx);
  };

  if (!byDateDesc) {
    return null;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
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
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={event.title}  // Changement de la clé de l'input de pagination
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handleClick(radioIdx)}  //  Appel de handleClick lors du clic sur l'input
              readOnly  //  Ajout de readOnly à l'input
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
