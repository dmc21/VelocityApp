const router = require('express').Router();
const mongojs = require('mongojs');

const db = mongojs('db_bici',['users']);

router.get('/',(req,res,next) =>{
    res.send("api works");
});


router.post('/sigin',(req,res,next)=>{

    var user = req.body.user
    var password = req.body.password

    db.users.findOne({user: user, password: password},(err,user)=>{
        if(user == null) return next(err);
   
        user.password = "";

        console.log(user)

        res.json(user);
    });
});


router.get('/tasks',(req,res,next)=>{
    db.tasks.find((err,tasks)=>{
        if(err) return next(err);
        res.json(tasks);
    });
});

router.get('/tasks/:id',(req,res,next)=>{
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},(err,task)=>{
        if(err) return next(err);
        res.json(task);
    });
});

router.post('/tasks',(req,res,next)=>{
    const task = req.body;

    if(!task.title || !(task.isDone + '')){
        res.status(400).json({
            error: 'Bad data'
        });
    }else{
        db.tasks.save(task,(err,task)=>{
            if(err) return next(err);
                res.json(task);
        });
    }
});

router.delete('/tasks/:id',(req,res,next)=>{

    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},(err,result)=>{
        if(err) return next(err);
            res.json(result);
    })

});

router.put('/tasks/:id',(req,res,next)=>{
    const task = req.body;
    const updateTask = {};

    if(task.isDone){
        updateTask.isDone = task.isDone;
    }
    if(task.title){
        updateTask.title = task.title;
    }

    if(!updateTask){
        res.status(400).json({err: 'Bad Request'});
    }
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updateTask, (err,task )=> {
        if(err) return next(err);
            res.json(task);
    })
})

module.exports = router;
