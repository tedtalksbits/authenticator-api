import { IncidentType } from '../types/incidentType';

export const removeSiblingsFromIncident = (incident: IncidentType) => {
  const { siblings, ...incidentWithoutSiblings } = incident;
  return incidentWithoutSiblings;
};

export const groupIncidentsByCardHolderAndIncidentType = (
  incidents: IncidentType[]
) => {
  const groupedIncidents = incidents.reduce((acc: any, incident) => {
    const { ch_id, type } = incident;
    const key = `${ch_id}-${type}`;
    if (acc[key]) {
      acc[key].push(incident);
    } else {
      acc[key] = [incident];
    }
  }, {});
  return groupedIncidents;
};
