var express=require('express');
var router=express.Router();

const userCon=require('../Controllers/userController');

router.post('/signup',userCon.add);
router.post('/login',userCon.login);
router.get('/:id',userCon.getuserById);
router.get('/getuser/:id',userCon.getuser);
router.delete('/:id',userCon.deleteuser);
router.put('/',userCon.updateUser);
router.put('/change',userCon.change);

module.exports=router;