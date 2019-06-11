export const transformFlights = (flights, type) => {
  const myMap = new Map();
  const result = [];
  flights.sort((a, b) => {
    if (a.main_flight > b.main_flight) {
      return 1;
    }
    if (a.main_flight < b.main_flight) {
      return -1;
    }
    return 0;
  });

  flights.forEach(flight => {
    if (flight.main_flight === '') {
      const item = {};
      item.id = flight.i_id;
      item.numbers = [`${flight.co.code} ${flight.flt}`];
      item.city = type === 'departure' ? flight.mar2.description : flight.mar1.description;
      item.status = flight.vip_status_rus;
      item.time = flight.t_st;
      item.timeText = (type === 'departure' ? 'Отправление' : 'Прибытие') + ` ${flight.t_st.slice(11, 16)}`;
      item.delayTime = flight.t_et;
      item.departTime = flight.t_otpr;
      item.aircraft = flight.aircraft_type_name;
      item.term = flight.term;
      item.gate = flight.gate_id;

      myMap.set(flight.i_id, item);
    } else {
      const item = myMap.get(flight.main_flight);
      item.numbers.push(`${flight.co.code} ${flight.flt}`);
      myMap.set(flight.main_flight, item);
    }
  });
  for (let value of myMap.values()) {
    result.push(value);
  }
  result.sort((a, b) => {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  });
  return result;
};