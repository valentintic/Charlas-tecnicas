import React, { Component } from 'react';
import { getCharlas, getCharlasCursoIdRonda } from '../../services/CharlasApi';
import DefaultImage from '../../assets/Default_imaget.webp';
import styles from './Charlas.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default class CharlasComponent extends Component {
  state = {
    charlas: [],
    centeredIndex: 0, // Índice de la charla centrada
  };
  sliderRef = React.createRef();

  componentDidMount() {
    this.fetchCharlas();
  }

  componentDidUpdate(prevProps) {
    if (this.props.idRonda !== prevProps.idRonda) {
      this.fetchCharlas();
    }
  }

  fetchCharlas = () => {
    const { idRonda } = this.props;

    const fetchFunction = idRonda ? getCharlasCursoIdRonda(idRonda) : getCharlas();
    fetchFunction.then((response) => {
      this.setState({ charlas: response });
    });
  };

  handleSlideChange = (currentIndex) => {
    this.setState({ centeredIndex: currentIndex });
  };

  handlePrevious = () => {
    if (this.sliderRef.current) {
      this.sliderRef.current.slickPrev();
    }
  };

  handleNext = () => {
    if (this.sliderRef.current) {
      this.sliderRef.current.slickNext();
    }
  };

  formatedDate = (date) => {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', dateOptions);
  }

  render() {
    const { charlas, centeredIndex } = this.state;

    const sliderSettings = {
      dots: true,
      appendDots: dots => (
        <ul style={{ bottom: '0' }} className="custom-dots">
          {dots}
        </ul>
      ),
      infinite: charlas.length > 1,
      speed: 500,
      slidesToShow: charlas.length < 3 ? charlas.length : 3,
      slidesToScroll: 1,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: '0',
      className: 'center-slide',
      draggable: true,
      swipeToSlide: true,
      accessibility: true,
      customPaging: function(i) {
        return (
          <a>
           <p
           className={`${styles.slickDotText} `}
           >{i + 1}</p>
          </a>
        );
      },
      afterChange: this.handleSlideChange, // Actualiza el índice centrado
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    };
    

    return (
      
      <div className={styles.container}>
        {!this.props.idRonda && <h1>Charlas</h1>}
        {charlas.length === 0 ? (
          <h2>No hay charlas</h2>
        ) :  (
          <div
            style={{
              width: '98%',
              margin: '0 auto', // Centra horizontalmente
              textAlign: 'center', // Centra texto u otros elementos inline
            }}
          >
            {/* Slider */}
            <div className={`${styles.slickSlider}`}>
              <Slider ref={this.sliderRef} {...sliderSettings} style={{ height: '350px' }}>
                {charlas.map((charla, index) => {
                const imageUrl = 
                charla.imagenCharla && (charla.imagenCharla.endsWith(".jpg") || charla.imagenCharla.endsWith(".png"))
                  ? charla.imagenCharla
                  : DefaultImage;              
                return (
                    <div key={charla.idCharla} className={`mb-4 ${styles.cardWrapper}`}>
                      <div
                        className={styles.card}
                      > 
                        <img 
                          src={
                            charla.imagenCharla && (charla.imagenCharla.endsWith(".jpg") || charla.imagenCharla.endsWith(".png"))
                              ? charla.imagenCharla
                              : DefaultImage
                          } 
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
                <button onClick={this.handlePrevious}>Anterior</button>
                <button onClick={this.handleNext}>Siguiente</button>
              </div>
            </div>

            {/* Detalles de la charla centrada */}
            {charlas[centeredIndex] && (
              <div className={`${styles.cardDetails} ${styles.visible}`}>
                <p>
                  <strong>Descripción:</strong> {charlas[centeredIndex].descripcion}
                </p>
                <p>
                  <strong>Tiempo:</strong> {charlas[centeredIndex].tiempo}
                </p>
                <p>
                  <strong>Fecha Propuesta:</strong> {this.formatedDate(charlas[centeredIndex].fechaPropuesta)}
                </p>
                <p>
                  <strong>Estado:</strong> {charlas[centeredIndex].idEstadoCharla}
                </p>
                <p>
                  <strong>Ronda:</strong> {charlas[centeredIndex].idRonda}
                </p>
                <div className={styles.cardButtons}>
                  <button className="btn btn-primary">Votar</button>
                  <button className="btn btn-secondary">Detalles</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
