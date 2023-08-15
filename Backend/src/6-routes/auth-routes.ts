import express, { Request, Response, NextFunction } from "express";
//Models
import CredentialsModel from "../2-models/credentials-model";
import clientModel from "../2-models/client-model";
// Service
import authService from "../5-services/auth-service";
import cyber from "../4-utils/cyber";
import AddressModel from "../2-models/address-model";

const router = express.Router();

// Get http://localhost:4000/api/auth/
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const email = await cyber.extractUserFromToken(request);
      const client = await authService.getCurrentUser(email);
      response.status(201).json(client);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:4000/api/auth/register
router.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = new clientModel(request.body);
      const clientDto = await authService.register(user);
      response.status(201).json(clientDto);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:4000/api/auth/login
router.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await authService.login(credentials);
      response.json(token);
    } catch (err: any) {
      next(err);
    }
  }
);
// GET http://localhost:4000/api/auth/emailExists?email='
router.get(
  "/emailExists",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const email = request.query.email as string;
      const isTaken = await authService.isEmailTaken(email);
      response.json(isTaken);
    } catch (err: any) {
      next(err);
    }
  }
);
// POST http://localhost:4000/api/auth/address
router.post(
  "/client/address",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const address = new AddressModel(request.body.address);
      const clientId = +request.body.clientId;
      const addedAddress = await authService.postAddress(address, clientId);
      response.json(addedAddress);
    } catch (err: any) {
      next(err);
    }
  }
);
// PUT http://localhost:4000/api/auth/address
router.put(
  "/client/address",
  async (request: Request, response: Response, next: NextFunction) => {
    try {      
      const address = new AddressModel(request.body.address);
      const addressId = +request.body.addressId;
      const updatedAddress = await authService.updateAddress(
        address,
        addressId
      );
      response.json(updatedAddress);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
