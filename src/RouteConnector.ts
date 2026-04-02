
import express from 'express';
import { membersRoutes } from './routes/membersRoutes'; 
import { TaskManagement } from './routes/taskRouter'; 

const RoutesConnector = express.Router(); 

RoutesConnector.use(membersRoutes); 
RoutesConnector.use(TaskManagement); 

export { RoutesConnector }; 
