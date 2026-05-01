import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import carRoutes from './routes/carRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import rentalRoutes from './routes/rentalRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';

import pool from './config/db.js';

import createUserTable from './data/createUserTable.js';
import createCustomerTable from './data/createCustomerTable.js';
import createStaffTable from './data/createStaffTable.js';
import createCarsTable from './data/createCarsTable.js';
import createRentalsTable from './data/createRentalsTable.js';
import createPaymentTable from './data/createPaymentTable.js';
import createMaintenanceTable from './data/createMaintenanceTable.js';
import errorHandling from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/car', carRoutes);
app.use('/payment', paymentRoutes);
app.use('/rental', rentalRoutes);
app.use('/api', maintenanceRoutes);

// Root test route
app.get('/', async (req, res) => {
  const result = await pool.query('SELECT current_database()');
  res.send(`Connected to database: ${result.rows[0].current_database}`);
});

// Error handler
app.use(errorHandling);


const start = async () => {
  try {
    console.log('Creating tables...');

    // Create tables in dependency order
    await createUserTable();
    await createCustomerTable();
    await createStaffTable();
    await createCarsTable();
    await createRentalsTable();
    await createPaymentTable();
    await createMaintenanceTable();

    console.log(' All tables created successfully');

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize DB tables:', err);
    process.exit(1);
  }
};

start();