import {
  IncidentSiblingType,
  IncidentType,
  IncidentWithoutSiblingsType,
} from '../types/incidentType';

import incidentJson from '../data/incidents.json';
import { IncidentDAO } from '../data/incidentDAO';
import { removeSiblingsFromIncident } from '../lib/incidentWithoutSiblings';

export const getAll = async (
  limit: number,
  filters: { [key: string]: string }
): Promise<IncidentWithoutSiblingsType[]> => {
  const { group, type, status, state, ch_name } = filters;
  const filteredIncidents = incidentJson.filter((incident: IncidentType) => {
    if (group && incident.group !== group) {
      return false;
    }

    if (type && incident.type !== type) {
      return false;
    }

    if (status && incident.status !== status) {
      return false;
    }

    if (state && incident.state !== state) {
      return false;
    }

    if (ch_name && !incident.ch_name.includes(ch_name)) {
      return false;
    }

    return true;
  });

  const incidentsWithoutSiblings = filteredIncidents.map(
    (incident: IncidentType) => {
      const incidentWithoutSiblings = removeSiblingsFromIncident(incident);
      return incidentWithoutSiblings;
    }
  );

  return incidentsWithoutSiblings.slice(0, limit);
};

export const findById = async (
  id: number
): Promise<IncidentWithoutSiblingsType> => {
  const incident = incidentJson.find(
    (incident: IncidentType) => incident.id === id
  );
  return new Promise((resolve, reject) => {
    if (incident) {
      const incidentWithoutSiblings = removeSiblingsFromIncident(incident);
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

export const updateIncident = async (
  id: number,
  newIncident: IncidentType
): Promise<IncidentWithoutSiblingsType> => {
  const incidentsWithoutSiblings = IncidentDAO.updateIncident(id, newIncident);
  return new Promise((resolve, reject) => {
    if (incidentsWithoutSiblings) {
      resolve(incidentsWithoutSiblings);
    } else {
      reject('Could not find incident');
    }
  });
};
