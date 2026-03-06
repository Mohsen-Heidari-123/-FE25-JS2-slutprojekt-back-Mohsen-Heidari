
import express from 'express';
import { membersRoutes } from './routes/membersRoutes.ts'; 
import { TaskManagement } from './routes/taskRouter.ts'; 

const RoutesConnector = express.Router(); 

RoutesConnector.use(membersRoutes); 
RoutesConnector.use(TaskManagement); 

export { RoutesConnector }; 
