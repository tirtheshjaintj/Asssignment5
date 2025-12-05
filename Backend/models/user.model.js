const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  phone_number: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! It should contain exactly 10 digits.`
    },
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function (v) {
        return /^.{8,}$/.test(v);
      },
      message: props => `Password must be at least 8 characters long.`
    }
  },
  otp: {
    type: String,
    validate: {
      validator: function (val) {
        return !val || val.length == 6;
      },
      message: () => `OTP must be 6 digits`
    }
  },
  verified: {
    type: Boolean,
    default: false,
    required: true
  },
  google_id: {
    type: String,
    validate: {
      validator: function (v) {
        return v === null || /^\d{21}$/.test(v);
      },
      message: props => `Not Valid Google ID`
    },
    unique: true,
    sparse: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {

  try {

    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 12);
    }

    next();
  } catch (error) {
    next(error);
  }

});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
