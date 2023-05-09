import incidentJson from '../data/incidents.json';

export type IncidentType = (typeof incidentJson)[0];
export type IncidentWithoutSiblingsType = Omit<IncidentType, 'siblings'>;
export type IncidentSiblingType = IncidentType['siblings'][0];
