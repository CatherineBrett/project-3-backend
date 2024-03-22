import express from "express";
import {
  createTip,
  deleteTip,
  editTip,
  getAllTips,
  getSingleTipById,
} from "../controllers/tipController";
import secureRoute from "../middleware/secureRoute";
import {
  deleteUser,
  getCurrentUser,
  getUsers,
  logIn,
  putUser,
  signUp,
} from "../controllers/userController";

const router = express.Router();

// ! content end points

router.route("/api/tips").get(getAllTips);

router.route("/api/tips/:tipId").get(getSingleTipById);

router.route("/api/tips").post(secureRoute, createTip);

router.route("/api/tips/:tipId").delete(secureRoute, deleteTip);

router.route("/api/tips/:tipId").put(secureRoute, editTip);

// ! User end points

router.route("/api/signup").post(signUp);

router.route("/api/login").post(logIn);

router.route("/api/user").get(getUsers);

router.route("/api/user").get(secureRoute, getCurrentUser);

router.route("/api/user/:userId").delete(secureRoute, deleteUser);

router.route("/api/user/:userId").put(secureRoute, putUser);

export default router;
