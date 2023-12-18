class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
  private _areas: string[] = [];
  private _lecturers: {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: string;
    courses: string[];
    contacts: string[];
  }[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): typeof this._areas {
    return this._areas;
  }

  get lecturers(): typeof this._lecturers {
    return this._lecturers;
  }

  addArea(area: string): void {
    this.areas.push(area);
  }

  removeArea(area: string): void {
    const newAreas: typeof this.areas = this.areas.filter(item => item !== area);
    this._areas = newAreas;
  }

  addLecturer(lecturer: {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: string;
    courses: string[];
    contacts: string[];
  }): void {
    this.lecturers.push(lecturer);
  }

  removeLecturer(lecturer: {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: string;
    courses: string[];
    contacts: string[];
  }): void {
    const newLecturers: typeof this.lecturers = this.lecturers.filter(
      item => JSON.stringify(item) !== JSON.stringify(lecturer)
    );
    this._lecturers = newLecturers;
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  private _levels: number[] = [];
  private _name: string = '';

  get name(): typeof this._name {
    return this._name;
  }

  get levels(): typeof this._levels {
    return this._levels;
  }

  constructor(name: string) {
    this._name = name;
  }

  addLevel(level: number): void {
    this.levels.push(level);
  }

  removeLevel(level: number): void {
    const newLevels: typeof this.levels = this.levels.filter(item => item !== level);
    this._levels = newLevels;
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  private _groups: string[] = [];
  private _name: string = '';
  private _description: string = '';

  get groups(): typeof this._groups {
    return this._groups;
  }

  get name(): typeof this._name {
    return this._name;
  }

  get description(): typeof this._description {
    return this._description;
  }

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  addGroup(group: string): void {
    this.groups.push(group);
  }

  removeGroup(group: string): void {
    const newGroups: typeof this.groups = this.groups.filter(item => item !== group);
    this._groups = newGroups;
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  private _area: string = '';
  private _status: 'active' | 'disabled' = 'disabled';
  private _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  private _directionName: string = '';
  private _levelName: string = '';

  get area(): typeof this._area {
    return this._area;
  }

  get status(): typeof this._status {
    return this._status;
  }

  get students(): typeof this._students {
    return this._students;
  }

  get directionName(): typeof this._directionName {
    return this._directionName;
  }

  get levelName(): typeof this._levelName {
    return this._levelName;
  }

  set status(status: typeof this._status) {
    this._status = status;
  }

  constructor(directionName: string, levelName: string) {
    this._directionName = directionName;
    this._levelName = levelName;
  }

  showPerformance(): typeof this._students {
    const sortedStudents: typeof this._students = this._students.toSorted(
      (a: Student, b: Student) => b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  removeStudent(student: Student): void {
    const newStudents: typeof this.students = this.students.filter(
      item => JSON.stringify(item) !== JSON.stringify(student)
    );
    this._students = newStudents;
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods

  private _firstName: string = '';
  private _lastName: string = '';
  private _birthYear: number = 0;
  private _visits: boolean[] = []; // lesson: present
  private _grades: {
    [key: string]: number;
  } = {}; // workName: mark

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  set grades(grades: typeof this._grades) {
    this._grades = grades;
  }

  set visits(visits: typeof this._visits) {
    this._visits = visits;
  }

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade: number = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage: number = (this._visits.filter(present => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
