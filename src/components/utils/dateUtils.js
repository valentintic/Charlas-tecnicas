export const formatedDate = (date) => {
    const dateOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric' 
    };
    return new Date(date).toLocaleDateString('es-ES', dateOptions);
  };
  