// src/controllers/profileController.ts
import { Request, Response, NextFunction } from "express";
import ProfileModel from "../models/profileModel";

// Get user profile
export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id; // Assuming user ID is attached to the request via authentication middleware
  
      if (!userId) {
        res.status(400).json({ message: "User ID is missing from the request" });
      }
  
      console.log("Fetching profile for user ID:", userId); // Debugging line
  
      const profile = await ProfileModel.findOne({ user: userId });
  
      if (!profile) {
        console.log("Profile not found for user ID:", userId); // Debugging line
        res.status(404).json({ message: "Profile not found" });
      }
  
      res.json({ message: "Profile retrieved successfully", profile });
    } catch (error) {
      console.error("Error retrieving profile:", error); // Debugging line
      next(error);
    }
  };
  

// Create or update user profile
export const upsertUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id; // Assuming user ID is attached to the request via authentication middleware
    const { name, email, phone, address } = req.body;

    const profile = await ProfileModel.findOneAndUpdate(
      { user: userId },
      { name, email, phone, address },
      { new: true, upsert: true } // Create a new profile if it doesn't exist
    );

    res.json({ message: "Profile saved successfully", profile });
  } catch (error) {
    next(error);
  }
};
