import { Router } from 'express';
import { AssignmentController } from '../controllers/AssignmentController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const assignmentController = new AssignmentController();

router.get('/assignments', authMiddleware, (req, res) => assignmentController.getAssignments(req, res));
router.post('/assignments', authMiddleware, (req, res) => assignmentController.createAssignment(req, res));
router.put('/assignments/:id', authMiddleware, (req, res) => assignmentController.updateAssignment(req, res));
router.delete('/assignments/:id/descriptions/:descriptionIndex', authMiddleware, (req, res) => assignmentController.deleteDescription(req, res));
router.post('/assignments/:id/descriptions', authMiddleware, (req, res) => assignmentController.addDescription(req, res));

export default router;