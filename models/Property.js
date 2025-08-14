import mongoose from 'mongoose'

const PropertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    location: { String, city: String, state: String, zipcode: String },
    beds: {
      type: Number,
      required: true
    },
    baths: {
      type: Number,
      required: true
    },
    square_feet: {
      type: Number,
      required: true
    },
    amenities: [
      {
        type: String
      }
    ],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number
    },
    seller_info: {
      name: String,
      email: String,
      phone: String
    },
    images: [
      {
        type: String
      }
    ],
    is_featured: {
      type: Boolean,
      default: false
    }
  },

  {
    timestamps: true
  }
)

const Property =
  mongoose.models.Property || mongoose.model('Property', PropertySchema)

export default Property
