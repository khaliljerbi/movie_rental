const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/mongo-exercises' , { useNewUrlParser: true , })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err.message));

const courseSchema = new mongoose.Schema({
    tags : [String],
    isPublished : Boolean , 
    date: {
        type: Date, 
        default: Date.now
    },
    name : String, 
    author : String , 
    price : Number
});  

const Course = mongoose.model('courses' , courseSchema);

async function getAllCourses1() {
    try {
        const courses = await Course.find({tags: 'backend'  , isPublished : true})  
                                     .sort({name : 1})
                                     .select({name : 1 , author : 1});
        console.log(courses);
    }
    catch(ex) {
        console.log(ex.message);
    }
    
}

//getAllCourses1();

async function getAllCourses2(){
    try {
        const courses = await Course
        .find({isPublished: true})
        .or([ {price : { $gte : 15} } , {name : /.*by.*/i } ])
        
        
        console.log(courses);
    }
    catch(ex) {
        console.log(ex.message);
    }
   
}

getAllCourses2();

