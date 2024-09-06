import { Router } from 'express';
import { AssignmentController } from '../controllers/AssignmentController';
import { login } from '../controllers/AuthController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const assignmentController = new AssignmentController();

router.post('/login', login);

router.get('/assignments', authenticateToken, (req, res) => assignmentController.getAssignments(req, res));
router.post('/assignments', authenticateToken, (req, res) => assignmentController.createAssignment(req, res));
router.put('/assignments/:id', authenticateToken, (req, res) => assignmentController.updateAssignment(req, res));
router.delete('/assignments/:id/:descriptionIndex', authenticateToken, (req, res) => assignmentController.deleteDescription(req, res));
router.post('/assignments/:id', authenticateToken, (req, res) => assignmentController.addDescription(req, res));

export default router;