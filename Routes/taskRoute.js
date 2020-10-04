var express=require('express');
var router=express.Router();

const taskCon=require('../Controllers/taskControllers');

router.post('/addtask',taskCon.add);
router.put('/update',taskCon.updateTask);
router.delete('/delete/:id',taskCon.deletetask);
router.get('/:id',taskCon.getTaskByAdmin)

module.exports=router;