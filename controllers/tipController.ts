import { Request, Response } from "express";
import Tips from "../models/tips";

export async function getAllTips(req: Request, res: Response) {
  const tips = await Tips.find();
  res.send(tips);
}

export async function getSingleTipById(req: Request, res: Response) {
  const tipId = req.params.tipId; // TODO Set up tipId in router
  const specificTip = await Tips.findById(tipId)
    .populate("user", "bio _id")
    .exec();
  res.send(specificTip);
}

export async function createTip(req: Request, res: Response) {
  req.body.user = res.locals.currentUser;
  const tip = await Tips.create(req.body);
  res.send(tip);
}

export async function deleteTip(req: Request, res: Response) {
  const tipToDelete = await Tips.findById(req.params.tipId);
  if (res.locals.currentUser._id.equals(tipToDelete?.user)) {
    const tipId = req.params.tipId;
    const deletedTip = await Tips.findByIdAndDelete(tipId);
    return res.send(deletedTip);
  }
}

export async function editTip(req: Request, res: Response) {
  const tipId = req.params.tipId;
  const update = req.body;
  const updatedTip = await Tips.findByIdAndUpdate(tipId, update, { new: true });
  res.send(updatedTip);
}
