import fs from 'fs';
import { IncidentPartialType, IncidentType } from 'src/types/incidentType';
import incidentJson from './incidents.json';
interface DatabaseMethodResult {
  status: number;
  message: string;
  data?: IncidentType;
}

export class MockDatabase {
  static async updateIncident(
    id: number,
    arg: IncidentPartialType
  ): Promise<DatabaseMethodResult> {
    const incident = incidentJson.find(
      (incident: IncidentType) => incident.id === id
    );

    if (!incident) {
      return new Promise((_resolve, reject) => {
        reject({
          status: 404,
          message: 'Incident not found',
        });
      });
    }

    const updatedIncident = Object.assign(incident, arg);

    const updatedJson = incidentJson.map((incident: IncidentType) => {
      if (incident.id === id) {
        return updatedIncident;
      }
      return incident;
    });

    const res = await this.updateDB(updatedJson);

    if (res.status === 500) {
      return new Promise((_resolve, reject) => {
        reject({
          status: 500,
          message: 'Error writing to file',
        });
      });
    }
    return new Promise((resolve, _reject) => {
      resolve({
        status: 200,
        message: 'Incident updated successfully',
        data: incidentJson.find((incident: IncidentType) => incident.id === id),
      });
    });
  }
  static updateDB(json: IncidentType[]): Promise<DatabaseMethodResult> {
    const res = {
      status: 200,
      message: 'File written successfully',
    };
    // write in current directory

    fs.writeFile('./src/data/incidents.json', JSON.stringify(json), (err) => {
      if (err) {
        res.status = 500;
        res.message = err.message;
      }
    });

    return new Promise((resolve, reject) => {
      if (res.status === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  }
}
