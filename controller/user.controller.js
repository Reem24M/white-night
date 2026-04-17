
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

const deleteAccountController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user;

  const targetId = currentUser.role === "admin" && id ? id : currentUser.id;

  const userToDelete = await Users.findById(targetId);
  if (!userToDelete) {
    return res.status(404).json({ message: "User not found" });
  }

  if (userToDelete.role === "admin") {
    const adminCount = await Users.countDocuments({ role: "admin" });
    if (adminCount <= 1) {
      return res
        .status(400)
        .json({ message: "Cannot delete the last admin account" });
    }
  }

  if (["admin", "owner"].includes(userToDelete.role)) {
    const hall = await hallModel.findOne({ owner: targetId });
    if (hall) {
      await Promise.all([
        reviewModel.deleteMany({ hall: hall._id }),
        hallModel.deleteOne({ _id: hall._id }),
      ]);
    }
  }

  await Promise.all([
    favHallModel.deleteMany({ user: targetId }),
    Users.findByIdAndDelete(targetId),
  ]);

  res
    .status(200)
    .json({ message: "Account and related data deleted successfully" });
});
