var express=require('express');
var router=express.Router();

const taskCon=require('../Controllers/taskControllers');

router.post('/addtask',taskCon.add);
router.put('/',taskCon.updateComstatus);
router.put('/updatestatus',taskCon.updateDelayStatus)
router.put('/update',taskCon.updateTask);
router.delete('/delete/:id',taskCon.deletetask);
router.get('/:id',taskCon.getTaskByAdmin)
router.get('/usertask/:username',taskCon.getTaskByuser);
router.get("/edit/:id",taskCon.getTaskForEdit);
router.get('/:date/:id',taskCon.getTaskByDate);
router.get('/user/:date/:uname',taskCon.UserTaskByDate);

module.exports=router;