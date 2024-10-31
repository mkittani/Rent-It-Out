const User = require('../models/user');

exports.submitVerification = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.verificationStatus = 'Pending';
    await user.save();

    res.status(200).json({ message: 'Verification request submitted', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkVerificationStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ verificationStatus: user.verificationStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
