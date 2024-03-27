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
  req.body.user = res.locals.currentUser;
  const tip = await Tips.create(req.body);
  res.send(tip);
}

// export async function deleteTip(req: Request, res: Response) {
//   const tipToDelete = await Tips.findById(req.params.tipId);
//   if (res.locals.currentUser._id.equals(tipToDelete?.user)) {
//     const tipId = req.params.tipId;
//     const deletedTip = await Tips.findByIdAndDelete(tipId);
//     return res.send(deletedTip);
//   }
// }
export async function deleteTip(req: Request, res: Response) {
  const tipToDelete = await Tips.findById(req.params.tipId);
  if (
    res.locals.currentUser._id.equals("66029050610777603484521b") ||
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
