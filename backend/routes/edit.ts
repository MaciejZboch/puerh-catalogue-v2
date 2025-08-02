import express from 'express';
const router = express.Router();
import catchAsync from '../utilities/catchAsync';
import { isLoggedIn, isAuthor, validateTea } from '../middleware';
import tea from '../controllers/tea';

router.get("/:id", isLoggedIn, isAuthor, validateTea, catchAsync(tea.editForm));

module.exports = router;
