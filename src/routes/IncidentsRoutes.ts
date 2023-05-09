import express from 'express';
import {
  getAllIncidents,
  getIncidentById,
  getIncidentSiblingsById,
} from '../controllers/IncidentController';

const router = express.Router();

router.get('/', getAllIncidents);

// get incident by id
router.get('/:id', getIncidentById);

// get incident siblings by id
router.get('/:id/siblings', getIncidentSiblingsById);

export default router;
