export type FlightSegment = {
  carrier: string;
  flightNumber: string;
  from: string;   // IATA
  to: string;     // IATA
  depart: string; // ISO
  arrive: string; // ISO
  durationMinutes: number;
  stops?: number;
};

export type FlightOffer = {
  id: string;
  segments: FlightSegment[];
  price: number;
  currency: string;
  refundable?: boolean;
  baggage?: {
    carryOn?: string;
    checked?: string;
  };
  provider?: string;
};
