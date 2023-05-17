import incidentJson from '../data/incidents.json';

export type IncidentType = (typeof incidentJson)[0];
// make all properties optional
export type IncidentPartialType = Partial<IncidentType>;
export type IncidentWithoutSiblingsType = Omit<IncidentType, 'siblings'>;
