import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connectDB from './utils/db';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});
app.use(limiter);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define routes
// app.use('/api/auth', authRoutes);
// app.use('/api/url', urlRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
