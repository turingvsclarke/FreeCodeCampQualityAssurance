/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

module.exports = function (app) {
  var books=[];
  app.route('/api/books')
    .get(function (req, res){
      res.send(books);
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      let title = req.body.title;
      if(title==undefined){
        res.send('missing required field title');
      }else{
        let book={_id:books.length+1,title:title,comments:[],commentcount:0};
        books.push(book);
        res.json(book);
      }
    })
    
    .delete(function(req, res){
      books=[];
      res.send('complete delete successful');
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      const book=books.filter(book=>book._id==bookid)[0];
      if(book==undefined){
        res.send('no book exists');
      }else{
        res.json(book);
      }
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment=req.body.comment;
      const book=books.filter(book=>book._id==bookid)[0];
      if(book==undefined){
        res.send('no book exists');
      }
      else if(comment==undefined){
        res.send('missing required field comment');
      }else{
        book.commentcount++;
        book.comments.push(comment);
        res.json(book);
      }
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      const book=books.filter(book=>book._id==bookid)[0];
      if(book==undefined){
        res.send('no book exists');
      }
      else{
        books=books.filter(book=>book._id!=bookid);
        res.send('delete successful');
      }
      //if successful response will be 'delete successful'
    });
  
};
