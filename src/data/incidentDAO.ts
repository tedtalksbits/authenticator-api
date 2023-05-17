import {
  IncidentPartialType,
  IncidentType,
  IncidentWithoutSiblingsType,
} from '../types/incidentType';
import incidentJson from './incidents.json';
import { removeSiblingsFromIncident } from '../lib/incidentWithoutSiblings';
import { MockDatabase } from './mockdatabase';
import { Incident } from '../models/Incident';

interface IncidentDAOResponse {
  status: number;
  message: string;
  data:
    | IncidentType
    | IncidentType[]
    | IncidentPartialType
    | IncidentPartialType[]
    | null;
}

export class IncidentDAO {
  static async updateIncident(
    id: number,
    incidentObj: IncidentWithoutSiblingsType
  ): Promise<IncidentDAOResponse> {
    const result = await MockDatabase.updateIncident(
      id,
      incidentObj as IncidentType
    );

    if (result.status !== 200 || !result.data) {
      return new Promise((_resolve, reject) => {
        reject({
          status: 404,
          message: 'Incident not found',
          data: null,
        });
      });
    }

    return new Promise((resolve, _reject) => {
      resolve({
        status: 200,
        message: 'Incident updated successfully',
        data: result.data as IncidentType,
      });
    });
  }

  static findAll = async (
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

    return filteredIncidents.slice(0, limit);
  };

  static async findById(id: number): Promise<IncidentDAOResponse> {
    const incident = incidentJson.find(
      (incident: IncidentType) => incident.id === id
    );
    if (!incident) {
      return new Promise((_resolve, reject) => {
        reject({
          status: 404,
          message: 'Incident not found',
          data: null,
        });
      });
    }
    return new Promise((resolve, _reject) => {
      resolve({
        status: 200,
        message: 'Incident retrieved successfully',
        data: incident as IncidentType,
      });
    });
  }

  static findSiblingsById(id: number): Promise<IncidentDAOResponse> {
    const incident = incidentJson.find(
      (incident: IncidentType) => incident.id === id
    );

    if (!incident) {
      return new Promise((_resolve, reject) => {
        reject({
          status: 404,
          message: 'Incident not found',
          data: null,
        });
      });
    }

    const siblingsArr = incident.siblings;

    if (!siblingsArr || siblingsArr.length === 0) {
      return new Promise((_resolve, reject) => {
        reject({
          status: 404,
          message: 'Incident with id:' + incident.id + ' has no siblings',
          data: null,
        });
      });
    }

    const siblings = siblingsArr.map((id: number) => {
      const sibling = incidentJson.find(
        (incident: IncidentType) => incident.id === id
      );
      return sibling;
    });

    return new Promise((resolve, _reject) => {
      resolve({
        status: 200,
        message: 'Incident siblings retrieved successfully',
        data: siblings as IncidentType[],
      });
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
