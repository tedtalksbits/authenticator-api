import { sendRestResponse } from '../middleware/sendRestResponse';
import {
  findById,
  getAll,
  getIncidentSiblings,
} from '../services/complianceServices';
import { Request, Response } from 'express';
export const getAllIncidents = async (_req: Request, res: Response) => {
  const limit = parseInt(_req.query.limit as string);
  try {
    const incidents = await getAll(limit);
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
  try {
    const incident = await findById(Number(id));
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

export const getIncidentSiblingsById = async (_req: Request, res: Response) => {
  const { id } = _req.params;
  try {
    const incident = await getIncidentSiblings(Number(id));
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
