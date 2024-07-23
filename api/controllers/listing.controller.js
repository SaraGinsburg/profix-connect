import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (listing.userRef !== req.user.id) {
    return next(errorHandler(404, 'You can delete your own listing only!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      console.log('listing not found');
      return next(errorHandler(404, 'listing not found!'));
    }

    if (listing.userRef !== req.user.id) {
      console.log('unauthorized user');
      return next(errorHandler(401, 'you can update your listings only!'));
    }

    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
      console.log('invalid objectId in the update request');
      return next(errorHandler(400, 'Invalid ObjectId in the update request'));
    }

    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      console.log('listing updated successfully');
      res.status(200).json(updatedListing);
    } catch (error) {
      console.error('Error updating listing:', error);
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || '';
    const location = req.query.location || '';
    const field = req.query.field || '';

    // const query = { field: { $regex: searchTerm, $options: 'i' } };
    const query = {};

    if (searchTerm) {
      query.$or = [
        { field: { $regex: searchTerm, $options: 'i' } },
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    if (location) {
      query.locationServed = { $in: [location] };
    }

    if (field) {
      query.field = field;
    }

    const listings = await Listing.find(query)

      .limit(limit)
      .skip(startIndex);

    const total = await Listing.countDocuments(query);

    return res.status(200).json({
      listings,
      pagination: {
        total,
        limit,
        startIndex,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getFieldsOfExpertise = async (req, res, next) => {
  try {
    const fields = await Listing.distinct('field');
    return res.status(200).json(fields);
  } catch (error) {
    next(error);
  }
};
export const getLocationsServed = async (req, res, next) => {
  try {
    const locations = await Listing.distinct('locationServed');
    return res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};
