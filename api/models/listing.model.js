import mongoose, { trusted } from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    featuredWork: {
      type: Array,
      required: true,
    },
    initialServiceCall: {
      type: Number,
      required: true,
    },
    locationServed: {
      type: Array,
      required: true,
    },
    backgroundChecked: {
      type: Boolean,
      required: true,
    },
    numberOfEmployees: {
      type: Number,
      required: true,
    },
    yearsInBusiness: {
      type: Number,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },

    // contactInfo: {
    //   phone: {
    //     type: String,
    //     required: true,
    //   },
    //   email: {
    //     type: String,
    //     required: true,
    //   },
    // },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
