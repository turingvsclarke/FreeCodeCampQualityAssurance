'use strict';

module.exports = function (app) {
  var _id=0;
  var projects=[];
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let projectName = req.params.project;
      var project=projects.filter(x=>x.project_name==projectName)[0];
      if(project==undefined){
        res.send([]);
      }else{
        var issues=[...project.issues];
        // Replace 'returnedProjects' with 'issues'
        Object.keys(req.query).forEach(x=>{      
            issues=issues.filter(issue=>issue[x]==req.query[x]);
          });
        res.send(issues);
      }
    })
    
    .post(function (req, res){
      let project = req.params.project;

      var issue=req.body;
      // Check to see if the project already exists in our array
      if(!issue.issue_title||!issue.issue_text||!issue.created_by){
        res.send({error:'required field(s) missing'});
      }
      else{

        if(projects.filter(x=>x.project_name==project).length==0){
          projects.push({project_name:project,issues:[]});
        }
        
        issue.assigned_to=(issue.assigned_to!=undefined)?issue.assigned_to:'';
        issue.status_text=(issue.status_text!=undefined)?issue.status_text:'';
        issue.created_on=new Date();
        issue.updated_on=new Date();
        issue.open=true;
        issue._id=String(_id++);
        
        // Add the issue to the called projects array of issues
        projects.filter(x=>x['project_name']==project)[0].issues.push(issue);
        
        res.json(issue);
      }
      
    })
    
    .put(function (req, res){
      let project = req.params.project;
      // Check to make sure that we got an id
      let _id=req.body._id;
      if(_id==undefined){
        res.json({ error: 'missing _id' })
      }else{
        try{
          // Update all the fields
          let fields=Object.keys(req.body).filter(x=>x!='_id');
          if(fields.length==0){
            res.json({ error: 'no update field(s) sent', '_id': _id });
          }
          else{
            // Update the fields
            try{
              var issues=projects.filter(p=>p.project_name==project)[0].issues;  
              var issue=issues.filter(i=>i._id==_id)[0];
            
              if(issue==undefined){
                throw new Error('No issue with that id');
              }
              fields.forEach(field=>{
                issue[field]=req.body[field];
              });
              issue.updated_on=new Date();
            }catch(e){
              throw new Error(e.message);
            }
            res.json({result: 'successfully updated', '_id': _id });
          }
        }catch(e){
          res.json({ error: 'could not update', '_id': _id });
        }
      }
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      var projectObject=projects.filter(p=>p.project_name==project)[0];
      if(req.body._id){
        try{
          // Filter out the id'ed issue
          let size=projectObject.issues.length;
          var issues=projectObject.issues.filter(issue=>issue._id!=req.body._id);
          if(issues.length==size) throw new Error('wrong id');
          projectObject.issues=issues;
          res.json({result:'successfully deleted',_id:req.body._id});
        }catch(e){
          res.json({error:'could not delete',_id:req.body._id})
        }
      }else{
        res.json({error:'missing _id'});
      }
    });
    
};
