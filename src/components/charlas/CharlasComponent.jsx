import React, { Component } from 'react';
import { getCharlas, getCharlasCursoIdRonda } from '../../services/CharlasApi';
import DefaultImage from '../../assets/Default_imaget.webp';
import styles from './Charlas.module.css';
import Slider from 'react-slick'; // Importar Slider de React Slick

export default class CharlasComponent extends Component {
  state = {
    charlas: [],
    clickedId: null,
    isOpen: false,
  };

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
      this.setState({ charlas: response, isOpen: true });
    });
  };

  handleCardClick = (id) => {
    this.setState((prevState) => ({
      clickedId: prevState.clickedId === id ? null : id,
    }));
  };

  render() {
    const { charlas, clickedId, isOpen } = this.state;

    const sliderSettings = {
      dots: true,
      infinite: charlas.length > 1,
      speed: 500,
      slidesToShow: charlas.length < 3 ? charlas.length : 3,
      slidesToScroll: 1,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: '0',
      className: 'center-slide',
      draggable: true, // Habilitar arrastre con el ratón
      swipeToSlide: true, // Habilitar desplazamiento suave
      customPaging: (i) => <button>{i + 1}</button>, // Cambiar puntos por números
    };
    
    


    return (
      <div className={styles.container}>
        {!this.props.idRonda && <h1>Charlas</h1>}
        {charlas.length === 0 ? (
          <h2>No hay charlas</h2>
        ) : (
          <div>
            {/* Slider */}
            <div className={`${styles.slickSlider} ${isOpen ? styles.open : ''}`}>
              <Slider {...sliderSettings}>
                {charlas.map((charla) => {
                  const imageUrl = charla.imagenUrl || DefaultImage;

                  return (
                    <div key={charla.idCharla} className={`mb-4 ${styles.cardWrapper}`}>
                      <div
                        className={styles.card}
                        onClick={() => this.handleCardClick(charla.idCharla)}
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      >
                        <div className={styles.cardBody}>
                          <h5 className={styles.cardTitle}>{charla.titulo}</h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>

            {/* Detalles de la charla seleccionada */}
            {charlas.map((charla) => {
              const isOpen = clickedId === charla.idCharla;
              return (
                <div
                  key={charla.idCharla}
                  className={`${styles.cardDetails} ${isOpen ? styles.visible : ''}`}
                >
                  {isOpen && (
                    <>
                      <p>
                        <strong>Descripción:</strong> {charla.descripcion}
                      </p>
                      <p>
                        <strong>Tiempo:</strong> {charla.tiempo}
                      </p>
                      <p>
                        <strong>Fecha Propuesta:</strong> {charla.fechaPropuesta}
                      </p>
                      <p>
                        <strong>Estado:</strong> {charla.idEstadoCharla}
                      </p>
                      <p>
                        <strong>Ronda:</strong> {charla.idRonda}
                      </p>
                      <div className={styles.cardButtons}>
                        <button className="btn btn-primary">Votar</button>
                        <button className="btn btn-secondary">Detalles</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
