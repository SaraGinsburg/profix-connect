import express from 'express';
import {
  createListing,
  deleteListing,
  getListing,
  getListings,
  updateListing,
  getFieldsOfExpertise,
  getLocationsServed,
  getDistinctFieldListings,
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);
router.get('/fields', getFieldsOfExpertise);
router.get('/distinct', getDistinctFieldListings);
router.get('/locations', getLocationsServed);

export default router;
