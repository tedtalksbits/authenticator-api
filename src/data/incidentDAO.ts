import {
  IncidentSiblingType,
  IncidentType,
  IncidentWithoutSiblingsType,
} from '../types/incidentType';
import incidentJson from './incidents.json';
import { removeSiblingsFromIncident } from '../lib/incidentWithoutSiblings';
import { MockDatabase } from './mockdatabase';

export class IncidentDAO {
  static async updateIncident(
    id: number,
    incidentObj: IncidentWithoutSiblingsType
  ): Promise<IncidentWithoutSiblingsType> {
    const result = await MockDatabase.updateIncident(
      id,
      incidentObj as IncidentType
    );

    if (result.status !== 200 || !result.data) {
      throw new Error(result.message);
    }

    return removeSiblingsFromIncident(result.data);
  }

  static findAll(
    limit: number,
    filters: { [key: string]: string }
  ): IncidentWithoutSiblingsType[] {
    const filteredIncidents = incidentJson.filter((incident: IncidentType) => {
      const { group, type, status, state, ch_name } = filters;

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

      if (ch_name && !incident.ch_name.includes(filters.ch_name)) {
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
  }

  static findById(id: number): IncidentWithoutSiblingsType {
    const incident = incidentJson.find(
      (incident: IncidentType) => incident.id === id
    );
    if (!incident) {
      throw new Error('Incident not found');
    }
    return removeSiblingsFromIncident(incident);
  }

  static findSiblingsById(id: number): Promise<IncidentSiblingType[]> {
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
  }

  static async startInvestigation(
    id: number,
    updates: Partial<IncidentWithoutSiblingsType>
  ): Promise<IncidentWithoutSiblingsType> {
    const res = await MockDatabase.updateIncident(id, updates as IncidentType);
    return new Promise((resolve, reject) => {
      if (res.status === 200) {
        const incidentWithoutSiblings = removeSiblingsFromIncident(
          res.data as IncidentType
        );
        resolve(incidentWithoutSiblings);
      } else {
        reject('Could not find incident');
      }
    });
  }
}
