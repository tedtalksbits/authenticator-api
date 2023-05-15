import { IncidentType } from '../types/incidentType';

export const removeSiblingsFromIncident = (incident: IncidentType) => {
  const { siblings, ...incidentWithoutSiblings } = incident;
  return incidentWithoutSiblings;
};
