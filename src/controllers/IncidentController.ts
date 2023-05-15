import { IncidentType } from '../types/incidentType';
import { sendRestResponse } from '../middleware/sendRestResponse';
import {
  findById,
  getAll,
  getIncidentSiblings,
  updateIncident,
} from '../services/complianceServices';
import { Request, Response } from 'express';
export const getAllIncidents = async (req: Request, res: Response) => {
  //   use ts emsure req.query will be an object with the properties of IncidentType below
  const { group, type, status, state, ch_name, program, prn, ch_id } =
    req.query as unknown as IncidentType;

  console.log('ch_name', ch_name);

  const limit = Number(req.query.limit) || 10;

  try {
    let incidents = await getAll(limit, {
      group,
      type,
      status,
      state,
      ch_name,
      program,
    });
    return sendRestResponse({
      res,
      data: incidents,
      message: 'Incidents retrieved',
      status: 200,
    });
  } catch (error) {
    return sendRestResponse({
      res,
      data: null,
      message: error.message,
      status: 500,
    });
  }
};

export const getIncidentById = async (_req: Request, res: Response) => {
  const { id } = _req.params;
  console.log('id', id);
  try {
    const incident = await findById(Number(id));
    return sendRestResponse({
      res,
      data: incident,
      message: 'Incident retrieved',
      status: 200,
    });
  } catch (error) {
    return sendRestResponse({
      res,
      data: null,
      message: error.message,
      status: 500,
    });
  }
};

export const getIncidentSiblingsById = async (_req: Request, res: Response) => {
  const { id } = _req.params;
  try {
    const incident = await getIncidentSiblings(Number(id));
    return sendRestResponse({
      res,
      data: incident,
      message: 'Incident siblings retrieved',
      status: 200,
    });
  } catch (error) {
    return sendRestResponse({
      res,
      data: null,
      message: error.message,
      status: 500,
    });
  }
};

export const updateIncidentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const incidentObj = req.body;

  try {
    const incident = await updateIncident(Number(id), incidentObj);
    return sendRestResponse({
      res,
      data: incident,
      message: 'Incident updated',
      status: 200,
    });
  } catch (error) {
    return sendRestResponse({
      res,
      data: null,
      message: error.message,
      status: 500,
    });
  }
};
