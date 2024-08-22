const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const JobAlert = require('./models /JobAlerts');

const authRoutes = require('./routes/auth');

const app = express();


mongoose.connect('mongodb+srv://roysamson494:2I5GVUj2vIUsXKn0@cluster0.xt47ucy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
const jobAlertSchema = new mongoose.Schema({
  title: String,
  description: String
});

app.post('/api/job-alerts', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newJobAlert = new JobAlert({ title, description });
    await newJobAlert.save();
    res.status(201).json({ message: 'Job alert created successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create job alert' });
  }
});

app.get('/api/company-profile', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    const decoded = jwt.verify(token, 'your_jwt_secret'); 
    const user = await User.findById(decoded.userId).populate('company'); 

    if (!user || !user.company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json({ company: user.company });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch company details' });
  }
});

app.get('/api/job-alerts', async (req, res) => {
  try {
    const jobAlerts = await JobAlert.find(); 
    res.json(jobAlerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job alerts' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
