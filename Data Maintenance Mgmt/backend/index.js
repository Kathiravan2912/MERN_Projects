// const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Import routes
// const EMPLOYEE = require('./controllers/employee')
// const Normal_Emp = require('./controllers/normalEmp');
// const Customers = require('./controllers/customer')
// // const adminLogin = require('./controllers/adminDataCon')

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());


// // //Employee Data

// app.use('/', Normal_Emp)
// app.use('/', Customers)
// // app.use('/', adminLogin)

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/kathirDB')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB:', err));

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const Normal_Emp = require('./controllers/normalEmp');
const Customers = require('./controllers/customer');
const Events = require('./controllers/events')
const Authentication = require('./Authentication/Admin');
const Awards = require('./controllers/awards');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/', Normal_Emp);
app.use('/', Customers);
app.use('/', Events);
app.use('/', Awards);
app.use('/auth' , Authentication);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/kathirDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


