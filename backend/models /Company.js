const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CompanySchema = new mongoose.Schema({
  companyName: { 
    type: String,
     required: true 
    },
  email: { 
    type: String, 
    required: true,
     unique: true 
    },

  password: { 
    type: String,
     required: true 
    },
});

CompanySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

CompanySchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Company', CompanySchema);
