'use strict';

module.exports = function (app) {
  var _id=0;
  var projects=[];
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      res.send(projects);
    })
    
    .post(function (req, res){
      console.log('post request');
      console.log(req.body);
      let projectName = req.params.project;
      var project=req.body;
      
      project.assigned_to=(project.assigned_to!=undefined)?project.assigned_to:'';
      project.status_text=(project.status_text!=undefined)?project.status_text:'';
      project.created_on=new Date();
      project.updated_on=new Date();
      project.open=true;
      project.message="hi";
      _id=_id+1;
      project._id=Number(_id);
      projects.push(project);
      
      res.json(project);
      
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
