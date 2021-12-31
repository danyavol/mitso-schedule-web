require('dotenv').config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/routes';

const app = express();
const PORT = process.env.PORT || 3080;  

 
// Requests allowed only from this domain
app.use( cors({origin: 'http://localhost:4200', credentials: true}) );

// Requests parser
app.use( express.urlencoded({extended: true}) );
app.use( express.json() );
app.use( cookieParser() )

// Routes
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`);
});