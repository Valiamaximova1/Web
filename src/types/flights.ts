// src/types/flights.ts
export type FlightSegment = {
  carrier: string;           // IATA carrier code, e.g. "LH"
  flightNumber: string;      // "1234"
  from: string;              // IATA, e.g. "SOF"
  to: string;                // IATA, e.g. "FRA"
  depart: string;            // ISO datetime
  arrive: string;            // ISO datetime
  durationMinutes: number;
  stops: number;             // usually 0
};

export type FlightOffer = {
  id: string;
  segments: FlightSegment[]; // one-way: 1–2; round trip: 2–4
  price: number;
  currency: string;          // "EUR" | "BGN", etc.
  refundable?: boolean;
  baggage?: { carryOn?: string; checked?: string };
  provider?: string;         // e.g. "Lufthansa" or "AirNova"
};
