const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

//UPDATE USER
router.put("/:id", async (req,res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        //UPATEING ENCRYPTED PASSWORD.
        if (req.body.password) {
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.user.password, salt);
            } catch(err) {
                return res.status(500).json(err);
            }
        }//UPATEING ENCRYPTED PASSWORD.

        try {
            const user = await User.findByIdAndUpdate(req.body.id, { $set: req.body });
            res.status(200).json("Account updated Successful")
        } catch (error) {
            return res.status(500).json(error);
        }

    } else{
        return res.status(403).json("You can Update only your account")
    }
})


//DELETE USER

router.delete("/:id", async (req,res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user = await User.deleteOne(req.body.id);
            res.status(200).json("Account deleted Successful")
        } catch (error) {
            return res.status(500).json(error);
        }

    } else{
        return res.status(403).json("You can delete only your account")
    }
})
//GET USER
//FOLLOW A USER
//UNFOLLW A USER

module.exports = router;