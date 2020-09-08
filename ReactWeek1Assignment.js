class Student {
  constructor (name, email, community) {
    this.name = name;
    this.email = email;
    this.community = community;
  }
}

class Bootcamp {
  constructor (name,level,students = []){
    this.name = name;
    this.level = level;
    this.students = students;
  }
  registerStudent(student) {
    if (this.students.filter(s => s.email === student.email).length ){
      console.log(`Student ${student.email} already registered.`);
    }
      else {
        this.students.push(student);
        console.log(`Registering ${student.email} to Bootcamp ${this.name}.`);
    }
    return this.students;
  }
}
