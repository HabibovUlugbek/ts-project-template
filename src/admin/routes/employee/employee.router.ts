import { Router } from 'express'
import { createEmployeeHandler, deleteEmployeeHandler, getEmployeeByIdHandler, getEmployeePagingHandler, signInHandler, updateEmployeeHandler } from '../../handlers/employee/employee.handler'
import { authToken } from '../../middlewares/authToken'

const router = Router()

router.get('/', authToken, getEmployeePagingHandler)
router.get('/:_id', authToken, getEmployeeByIdHandler)
router.post('/', createEmployeeHandler)
router.patch('/', authToken, updateEmployeeHandler)
router.delete('/:_id', authToken, deleteEmployeeHandler)

// auth login
router.post('/signIn', signInHandler)

export default router;