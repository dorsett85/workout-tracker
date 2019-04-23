const logout = async (req, res) => {
  /**
   * TODO
   * Tag user as logged out and add timestamp for last logged in
   */

  // Remove the jwtToken cookie and send back the guest user
  res.clearCookie('jwtToken');
  return res.json({ username: 'Guest' });
};

module.exports = logout;
