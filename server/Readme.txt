1. 
http://localhost:5200/tasks/  | POST 
{
 "title" : "Requirement Analysis",
  "description": "Perform detailed requirement analysis",
  "status": "To Do"
}

2. 
http://localhost:5200/tasks/664eb96294dd80da63f85d8d | PUT 

{
"status": "Done"
}

{
"description": "Perform detailed requirement analysis on May-23"
}

3. 
http://localhost:5200/tasks/664eb96294dd80da63f85d8d | GET 

4. 
http://localhost:5200/tasks/   | GET 

5. 
http://localhost:5200/tasks/664ec27d94dd80da63f85d90 | DELETE 

***************
db - 
****************
show dbs
use pesdb
show collections
db.tasks.find({})

*******************
Run App 
****************
npx ts-node src/server.ts