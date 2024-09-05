import { Router } from 'express';
import { AssignmentController } from '../controllers/AssignmentController';

const router = Router();
const assignmentController = new AssignmentController();

router.get('/assignments',  (req, res) => assignmentController.getAssignments(req, res));
router.post('/assignments',  (req, res) => assignmentController.createAssignment(req, res));
router.put('/assignments/:id',  (req, res) => assignmentController.updateAssignment(req, res));
router.delete('/assignments/:id/descriptions/:descriptionIndex',  (req, res) => assignmentController.deleteDescription(req, res));
router.post('/assignments/:id/descriptions',  (req, res) => assignmentController.addDescription(req, res));

export default router;