import { Request, Response } from "express";
import Tips from "../models/tips";

export async function getAllTips(req: Request, res: Response) {
  const tips = await Tips.find();
  res.send(tips);
}

export async function getSingleTipById(req: Request, res: Response) {
  const tipId = req.params.tipId; // TODO Set up tipId in router
  const specificTip = await Tips.findById(tipId)
    .populate("user", "username bio _id isAdmin")
    .exec();
  res.send(specificTip);
}

export async function createTip(req: Request, res: Response) {
  const errors: any = {};
  const { name, cohort, emoji, heading, tip } = req.body;
  if (!name) {
    errors.name = "Name is required";
  }
  if (!cohort) {
    errors.cohort = "Cohort is required";
  }
  if (!emoji) {
    errors.emoji = "Advice Category is required";
  }
  if (!heading) {
    errors.heading = "Heading is required";
  }
  if (!tip) {
    errors.tip = "Your Advice is required";
  }
  if (Object.keys(errors).length) {
    return res.status(400).send({ errors });
  }
  req.body.user = res.locals.currentUser;
  try {
    const tip = await Tips.create(req.body);
    res.send(tip);
  } catch (e) {
    return res.status(400).send({
      message: "Something went wrong. Please try again later.",
      errors: { misc: "Something went wrong. Please try again later." },
    });
  }
}

export async function deleteTip(req: Request, res: Response) {
  const tipToDelete = await Tips.findById(req.params.tipId);
  if (
    res.locals.currentUser.isAdmin ||
    (tipToDelete && res.locals.currentUser._id.equals(tipToDelete.user))
  ) {
    const tipId = req.params.tipId;
    const deletedTip = await Tips.findByIdAndDelete(tipId);
    return res.send(deletedTip);
  }
}

export async function editTip(req: Request, res: Response) {
  const tipId = req.params.tipId;
  const update = req.body;
  const tipToEdit = await Tips.findById(tipId);

  if (!tipToEdit) {
    return res.status(404).send("Tip not found");
  }

  if (
    !(
      res.locals.currentUser._id.equals(tipToEdit.user) ||
      res.locals.currentUser.isAdmin
    )
  ) {
    return res.status(403).send("You do not have permission to edit this tip");
  }

  const updatedTip = await Tips.findByIdAndUpdate(tipId, update, { new: true });
  res.send(updatedTip);
}
