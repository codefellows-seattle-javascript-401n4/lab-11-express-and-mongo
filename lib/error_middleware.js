'use strict';

module.expots = (req, res, next, err) => {
  if (err.message.includes ('failed'))
  return res.sendStatus(400);

  if (err.message.includes ('dupe'))
  return res.sendStatus(409);

  if (err.message.includes ('cast error'))
  return res.sendStatus(404);

  //500
  res.sendStatus(500);
  next();
};
