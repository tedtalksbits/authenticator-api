import {
  IncidentSiblingType,
  IncidentType,
  IncidentWithoutSiblingsType,
} from 'src/types/incidentType';

import incidentJson from '../data/incidents.json';

export const getAll = async (
  limit: number = 50
): Promise<IncidentWithoutSiblingsType[]> => {
  !limit ? (limit = 50) : limit;

  return new Promise((resolve, reject) => {
    if (incidentJson) {
      const incidentsWithoutSiblings = incidentJson.map(
        (incident: IncidentType) => {
          const { siblings, ...incidentWithoutSiblings } = incident;
          return incidentWithoutSiblings;
        }
      );
      resolve(incidentsWithoutSiblings.slice(0, limit));
    } else {
      reject('Could not find incidents');
    }
  });
};

export const findById = async (
  id: number
): Promise<IncidentWithoutSiblingsType> => {
  const incident = incidentJson.find(
    (incident: IncidentType) => incident.id === id
  );
  return new Promise((resolve, reject) => {
    if (incident) {
      const { siblings, ...incidentWithoutSiblings } = incident;
      resolve(incidentWithoutSiblings);
    } else {
      reject('Could not find incident');
    }
  });
};

export const getIncidentSiblings = async (
  id: number
): Promise<IncidentSiblingType[]> => {
  const incident = incidentJson.find(
    (incident: IncidentType) => incident.id === id
  );
  return new Promise((resolve, reject) => {
    if (incident) {
      resolve(incident.siblings);
    } else {
      reject('Could not find incident');
    }
  });
};
