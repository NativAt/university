const db = require('../db/students');

const getStudents = async (req, res) => {
    try {
        const students = await db.getStudents(req.query);
        return res.json(students);
    } catch (err) {
        return res.status(500).send('Internal server error' + err);
    } 
}

const createStudent = async (req, res) => {
    try {
        if (!req.body.name || !req.body.age) 
            return res.status(400).send('Required fields are missing!');
        const students = await db.createStudent(req.body.name, req.body.age);
        return res.json(students);
    } catch(err) {
        return res.status(500).send('Internal server error');
    }   
}

const updateStudent = async (req, res) => {
    try {
        if (!req.params.id && (!req.body.name || !req.body.age)) 
            return res.status(400).send('Required fields are missing!');
        
        const student = await db.updateStudent(req.params.id, req.body);
        return res.json(student);
    } catch(err) {
        return res.status(500).send('Internal server error');
    }   
}

const deleteStudent = async (req, res) => {
    try {
        if (!req.params.id) 
            return res.status(400).send('Required fields are missing!');
        const students = await db.deleteStudent(req.params.id);
        return res.status(200).end();
    } catch (err) {
        return res.status(500).send('Internal server error');
    }
}

const assignCourseToStudent = async (req, res) => {
    try {
        if (!req.params.id || !req.params.courseId) 
            return res.status(400).send('Required fields are missing!');
        const students = await db.assignCourseToStudent(req.params.id, req.params.courseId);
        return res.status(200).end();
    } catch (err) {
        return res.status(500).send('Internal server error');
    }
}

const setScoreToStudentCourse = async (req, res) => {
    try {
        if (!req.params.id || !req.params.courseId || !req.body.score) 
            return res.status(400).send('Required fields are missing!');
        const student = await db.setScoreToStudentCourse(req.params.id, req.params.courseId, req.body.score);
        return res.json(student);
    } catch (err) {
        return res.status(500).send('Internal server error');
    }
}

const getTopStudents = async (req, res) => {
    try {
        const students = await db.getTopStudents();
        return res.json(students);
    } catch (err) {
        return res.status(500).send('Internal server error');
    }
}

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    assignCourseToStudent,
    setScoreToStudentCourse,
    getTopStudents
}