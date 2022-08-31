const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: "User",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => isEmail(value),
      message: "Некорректный email.",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});
