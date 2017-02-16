/**
 * Created by nalantianyi on 2017/2/16.
 */
export  default  app => {
    app.use((req, res, next) => {
        if (req.session.user) {
            next();
        }
        else {
            res.sendStatus(401);
        }
    });
};