import React, { useState, useEffect, useRef } from 'react';
import { getCharlas, getCharlasCursoIdRonda } from '../../../services/CharlasApi';
import DefaultImage from '../../../assets/Default_imaget.webp';
import styles from '../modules/Charlas.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ComentariosComponent from './ComentariosComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CharlaDetailsComponent from './CharlasDetailComponent';

const CharlasComponent = ({ idRonda }) => {
  const [charlas, setCharlas] = useState([]);
  const [centeredIndex, setCenteredIndex] = useState(0);
  const [currentDotBlock, setCurrentDotBlock] = useState(0);

  const sliderRef = useRef();

  useEffect(() => {
    fetchCharlas();
  }, [idRonda]);

  const fetchCharlas = async () => {
    const fetchFunction = idRonda ? getCharlasCursoIdRonda(idRonda) : getCharlas();
    const response = await fetchFunction;
    setCharlas(response);
  };

  const handleSlideChange = (currentIndex) => {
    setCenteredIndex(currentIndex);
    updateDotBlock(currentIndex);
  };

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const updateDotBlock = (currentIndex) => {
    const newBlock = Math.floor(currentIndex / 5);
    setCurrentDotBlock(newBlock);
  };

  const getGroupedDots = () => {
    // Validamos que `charlas` sea un array y tenga elementos
    const groupSize = 5;
    const validCharlas = Array.isArray(charlas) ? charlas : [];
    const dots = Array.from({ length: validCharlas.length }, (_, index) => index);
    const groupedDots = [];
    for (let i = 0; i < dots.length; i += groupSize) {
      groupedDots.push(dots.slice(i, i + groupSize));
    }
    return groupedDots;
  };

  const formatedDate = (date) => {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', dateOptions);
  };

  // Longitud de charlas calculada una sola vez, asegurándonos de que sea un array
  const charlasLength = Array.isArray(charlas) ? charlas.length : 0;
  const groupedDots = getGroupedDots();

  const sliderSettings = {
    dots: true,
    appendDots: (dots) => {
      const currentDots = groupedDots[currentDotBlock] || [];
      return (
        <ul style={{ bottom: '0' }} className="custom-dots">
          {currentDots.map((dot, index) => (
            <li key={index} style={{ margin: '0 5px' }}>
              {dots[dot]}
            </li>
          ))}
        </ul>
      );
    },
    infinite: charlasLength > 1,
    speed: 500,
    slidesToShow: charlasLength < 3 ? charlasLength : 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: '0',
    className: 'center-slide',
    draggable: true,
    swipeToSlide: true,
    accessibility: true,
    customPaging: (i) => <a><p className={`${styles.slickDotText}`}>{i + 1}</p></a>,
    afterChange: handleSlideChange,
    responsive: [
      { breakpoint: 600, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className={styles.container}>
      {!idRonda && <h1>Charlas</h1>}
      {charlasLength === 0 ? (
        <h2>No hay charlas</h2>
      ) : (
        <div style={{ width: '98%', margin: '0 auto', textAlign: 'center' }}>
          <div className={`${styles.slickSlider}`}>
            <Slider ref={sliderRef} {...sliderSettings} style={{ height: '350px' }}>
              {charlas.map((charla, index) => {
                const imageUrl = charla.imagenCharla && (charla.imagenCharla.endsWith(".jpg") || charla.imagenCharla.endsWith(".png"))
                  ? charla.imagenCharla
                  : DefaultImage;
                return (
                  <div key={charla.idCharla} className={`mb-4 ${styles.cardWrapper}`}>
                    <div className={styles.card}>
                      <LazyLoadImage
                        src={imageUrl}
                        alt="charla"
                        className={styles.cardImgTop}
                        onError={(e) => e.target.src = DefaultImage}
                      />
                      <div className={styles.cardBody}>
                        <h5 className={styles.cardTitle}>{charla.titulo}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
            <div className="d-flex justify-content-between">
              <button onClick={handlePrevious}>Anterior</button>
              <button onClick={handleNext}>Siguiente</button>
            </div>
          </div>

          {charlas[centeredIndex] && (
            <CharlaDetailsComponent charla={charlas[centeredIndex]} />
          )}
        </div>
      )}
    </div>
  );
};

export default CharlasComponent;
