export function useGetMessage() {
  const baseUrl = 'https://wa.me/+52';

  function getMessage(reservation: any) {
    const newDate = new Date(reservation.date).toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
    });
    const newTime = useTime(reservation.time);
    const phone = reservation.phone;
    const text = `Hola ${reservation.name}. 
            \nAgradecemos que haya solicitado una reservación y nos alegra confirmar que la fecha y hora solicitadas *SI* se encuentran disponibles. 
            \nLe recordamos los datos de su reservación:\n
Nombre: *${reservation.name}*
Fecha: *${newDate}*
Hora: *${newTime}*
Personas: *${reservation.qty}* 
            \nLo${reservation.qty > 1 ? 's' : ''} esperamos!
            \n_*Equipo Brunette*_
brunette.com.mx`;
    const newUrl = encodeURI(`${baseUrl}${phone}?text=${text}`);

    return newUrl;
  }

  function getSuggestion(reservation: any) {
    const phone = reservation.phone;
    const text = `Hola ${reservation.name}. 
            \nAgradecemos que haya solicitado una reservación y nos apena tener que informale que la fecha y hora solicitadas *NO* se encuentran disponibles. 
            \nLe sugerimos la siguente hora y fecha:\n
------------
            \nQuedamos en espera de su respuesta para poder confirmar su reservación.
            \n_*Equipo Brunette*_
brunette.com.mx`;
    const newUrl = encodeURI(`${baseUrl}${phone}?text=${text}`);

    return newUrl;
  }

  return { getMessage, getSuggestion };
}
