import React, { Component } from 'react';
import { getCharlas } from '../../services/CharlasApi';
import DefaultImage from '../../assets/Default_imaget.webp';
import styles from './Charlas.module.css';
import Slider from 'react-slick'; // Importar Slider de React Slick

export default class CharlasComponent extends Component {
  state = {
    charlas: null,
    clickedId: null, // ID de la charla seleccionada
    isOpen: false, // Controla la animación de apertura
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    getCharlas(3213).then((response) => {
      this.setState({ charlas: response }, () => {
        // Al cargar las charlas, activar la animación de apertura
        this.setState({ isOpen: true });
      });
    });
  }

  handleCardClick = (id) => {
    // Cambiar el estado para mostrar los detalles de la charla seleccionada
    this.setState((prevState) => ({
      clickedId: prevState.clickedId === id ? null : id,
    }));
  };

  render() {
    const settings = {
      dots: true, // Muestra los puntos de navegación
      infinite: true, // Hacer que el carrusel sea infinito
      speed: 500, // Velocidad de transición
      slidesToShow: 3, // Mostrar tres slides a la vez
      slidesToScroll: 1, // Desplazar un solo slide a la vez
      centerMode: true, // Centrar el slide activo
      focusOnSelect: true, // Permitir seleccionar un slide al hacer clic
      centerPadding: '0', // Sin espacio adicional a los lados
      className: 'center-slide', // Clase personalizada para el carrusel
      customPaging: (i) => (
        <button>{i + 1}</button> // Cambiar los puntos por números
      ),
    };

    return (
      <div className={styles.container}>
        <h1>Charlas</h1>
        <div
          className={`${styles.slickSlider} ${this.state.isOpen ? styles.open : ''}`}
        >
          <Slider {...settings}>
            {this.state.charlas &&
              this.state.charlas.map((charla) => {
                const imageUrl = charla.imagenUrl || DefaultImage;
                const isOpen = this.state.clickedId === charla.idCharla;

                return (
                  <div
                    key={charla.idCharla}
                    className={`mb-4 ${styles.cardWrapper}`}
                  >
                    <div
                      className={`${styles.card}`}
                      onClick={() => this.handleCardClick(charla.idCharla)}
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                      }}
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

        {/* Mostrar detalles debajo del slider */}
        {this.state.charlas &&
          this.state.charlas.map((charla) => {
            const isOpen = this.state.clickedId === charla.idCharla;
            return (
              <div
                key={charla.idCharla}
                className={`${styles.cardDetails} ${isOpen ? styles.visible : ''}`}
              >
                {isOpen && (
                  <>
                    <p><strong>Descripción:</strong> {charla.descripcion}</p>
                    <p><strong>Tiempo:</strong> {charla.tiempo}</p>
                    <p><strong>Fecha Propuesta:</strong> {charla.fechaPropuesta}</p>
                    <p><strong>Estado:</strong> {charla.idEstadoCharla}</p>
                    <p><strong>Ronda:</strong> {charla.idRonda}</p>
                    <div className={styles.cardButtons}>
                      <button className="btn btn-primary">Ver más</button>
                      <button className="btn btn-secondary">Inscribirse</button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    );
  }
}
