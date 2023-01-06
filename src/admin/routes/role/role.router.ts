import { Router } from 'express';
import { createRoleHandler, deleteRoleHandler, getRoleByIdHandler, getRolePagingHandler, updateRoleHandler } from '../../handlers/role/role.handler';
import { authToken } from '../../middlewares/authToken';

const router = Router()

router.get('/', authToken, getRolePagingHandler)
router.get('/:_id', authToken, getRoleByIdHandler)
router.post('/', authToken, createRoleHandler)
router.patch('/', authToken, updateRoleHandler)
router.delete('/:_id', authToken, deleteRoleHandler)

export default router;
