import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
    const token = req?.query?.token || req?.headers?.cookie["x-access-token"] || req?.cookies?.token;
    if (!token)
        return res.sendStatus(403).send("not access Token");

    try {
            const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (!verified) {
                return res.status(401).send("Invalid Token");
            }
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};
// export const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null){
//     res.sendStatus(401);
//     return next();
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     return next();
//   });
// }

export const createToken = (req, res) => {
  try {
      const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);
      return accessToken;
  } catch (error) {
      console.error('Error creating token:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};