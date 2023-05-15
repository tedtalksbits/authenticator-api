import express from 'express';
import {
  getAllIncidents,
  getIncidentById,
  getIncidentSiblingsById,
  updateIncidentById,
} from '../controllers/IncidentController';

const router = express.Router();

router.get('/', getAllIncidents);

// get incident by id
router.get('/:id', getIncidentById);

// get incident siblings by id
router.get('/:id/siblings', getIncidentSiblingsById);

// update incident by id
router.put('/:id', updateIncidentById);
export default router;
