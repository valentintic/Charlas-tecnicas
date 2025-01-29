import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../modules/Charlas.module.css';
import { formatedDate } from '../../utils/dateUtils';
import ComentariosComponent from './ComentariosComponent';
import { getVotosCharla, getVotoUsuarioRonda, updateVotoCharla, deleteVotoCharla } from '../../../services/Votos';

class CharlaDetailsComponent extends Component {
  state = {
    votos: 0,
    existingVote: null,
    isLoading: false,
    error: null
  };

  componentDidMount() {
    this.initializeData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.charla.idCharla !== this.props.charla.idCharla) {
      this.initializeData();
    }
  }

  initializeData = async () => {
    try {
      this.setState({ isLoading: true, error: null });
      const { charla } = this.props;
      
      const [votesResponse, userVoteResponse] = await Promise.all([
        getVotosCharla(charla.idCharla),
        getVotoUsuarioRonda(charla.idRonda)
      ]);

      console.log('Votes response:', votesResponse);
      console.log('User vote response:', userVoteResponse);

      // Handle both cases: empty response or vote object
      const hasExistingVote = userVoteResponse && userVoteResponse.idVoto;
      
      this.setState({
        votos: votesResponse.votos,
        existingVote: hasExistingVote ? userVoteResponse : null,
        isLoading: false
      });
    } catch (error) {
      console.error('Initialization error:', error);
      this.setState({ 
        error: error.message || 'Error loading vote data', 
        isLoading: false 
      });
    }
  };

  handleVote = async () => {
    const { charla } = this.props;
    const { existingVote } = this.state;

    try {
      this.setState({ isLoading: true, error: null });

      if (existingVote) {
        if (existingVote.idCharla === charla.idCharla) {
          // Delete existing vote for this charla
          await deleteVotoCharla(existingVote.idVoto);
          this.setState(prev => ({
            votos: prev.votos - 1,
            existingVote: null
          }));
        } else {
          // User has already voted for a different charla in this round
          throw new Error('Ya has votado por otra charla en esta ronda');
        }
      } else {
        // Create new vote (idVoto and idUsuario are handled by backend)
        const newVote = await updateVotoCharla({
          idCharla: charla.idCharla,
          idRonda: charla.idRonda
        });

        this.setState(prev => ({
          votos: prev.votos ? prev.votos + 1 : 1,
          existingVote: newVote
        }));
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { charla } = this.props;
    const { votos, existingVote, isLoading, error } = this.state;
    const hasVotedCurrentCharla = existingVote?.idCharla === charla.idCharla;
    const hasVotedOtherCharla = existingVote && !hasVotedCurrentCharla;

    return (
      <div className={`${styles.cardDetails} ${styles.visible}`}>
        {error && <div className={styles.errorBanner}>{error}</div>}

        <p><strong>Descripción:</strong> {charla.descripcion}</p>
        <p><strong>Tiempo:</strong> {charla.tiempo}</p>
        <p><strong>Fecha Propuesta:</strong> {formatedDate(charla.fechaPropuesta)}</p>
        <p><strong>Estado:</strong> {charla.idEstadoCharla}</p>
        <p><strong>Ronda:</strong> {formatedDate(charla.idRonda)}</p>

        <div className={styles.cardButtons}>
          <button 
            onClick={this.handleVote}
            disabled={isLoading || hasVotedOtherCharla}
            className={`${styles.voteButton} ${hasVotedCurrentCharla ? styles.votedButton : ''}`}
            aria-label={hasVotedCurrentCharla ? 'Quitar voto' : 'Votar por esta charla'}
          >
            <div className={styles.voteSection}>
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={hasVotedCurrentCharla ? '#ffffff' : 'none'}
                stroke={hasVotedCurrentCharla ? '#ffffff' : '#ffffff'}
                strokeWidth="2"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
              {votos > 0 && <span className={styles.voteCount}>{votos}</span>}
            </div>
            <div className={styles.separator}></div>
            <span className={styles.buttonText}>
              {isLoading ? 'Procesando...' : (
                hasVotedOtherCharla ? 'Votado' : 'Votar'
              )}
            </span>
          </button>
        </div>

        <ComentariosComponent charlaId={charla.idCharla} />
      </div>
    );
  }
}

CharlaDetailsComponent.propTypes = {
  charla: PropTypes.shape({
    idCharla: PropTypes.number.isRequired,
    idRonda: PropTypes.number.isRequired,
    descripcion: PropTypes.string.isRequired,
    tiempo: PropTypes.string.isRequired,
    fechaPropuesta: PropTypes.string.isRequired,
    idEstadoCharla: PropTypes.string.isRequired,
  }).isRequired
};

export default CharlaDetailsComponent;