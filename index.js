//joi return class so first letter capital
const Joi = require ('joi');

const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    {id : 1 , "course" : 'course1'},
    {id : 2 , "course" : 'course2'},
    {id : 3 , "course" : 'course3'}
]

app.get("/", (req, res) => {
    res.send("Hello world");
});
app.get("/api/courses", (req, res) => {
    res.send(courses);
});
app.post("/api/courses", (req, res) => {

    // const schema = {
    //     course: Joi.string().min(3).required()
    // }
    // // const course = {
    // //     id : courses.length + 1,
    // //     course : req.body.course
    // // }
    // const result = Joi.validate(req.body , schema);

    const result = validateCourse(req.body)

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }



    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    courses.push(course);
    res.send(course);
})

//PUT method steps
app.put('/api/courses/:id', (req, res)=>{
// Look for element having the parmeter given property 
//if not found 404 
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with id is not found');
        return;
    }

//found then validate 
// if invalid then 400 BAD REQUEST
    // const schema = {
    //     course: Joi.string().min(3).required()
    // }
    // const result = Joi.validate(req.body , schema);

    const result = validateCourse(req.body)

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

//if validated then put means update
    course.course = req.body.course;

//return unpdated course
    res.send(course);

    
})
validateCourse = (course) => {
        const schema = {
            course: Joi.string().min(3).required()
        }
        return Joi.validate(course , schema);
}
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with id is not found');
        return;
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

})
//Port environment variable 
//process is global object which contains PORT variable
const port = process.env.PORT || 3000; 

app.listen(port, ()=> console.log(`listening.....on port ${port}`));