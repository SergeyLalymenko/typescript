var School = /** @class */ (function () {
    function School() {
        // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
        this._areas = [];
        this._lecturers = []; // Name, surname, position, company, experience, courses, contacts
    }
    Object.defineProperty(School.prototype, "areas", {
        get: function () {
            return this._areas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(School.prototype, "lecturers", {
        get: function () {
            return this._lecturers;
        },
        enumerable: false,
        configurable: true
    });
    School.prototype.addArea = function (area) {
        this.areas.push(area);
    };
    School.prototype.removeArea = function (area) {
        var newAreas = this.areas.filter(function (item) { return item !== area; });
        this._areas = newAreas;
    };
    School.prototype.addLecturer = function (lecturer) {
        this.lecturers.push(lecturer);
    };
    School.prototype.removeLecturer = function (lecturer) {
        var newLecturers = this.lecturers.filter(function (item) { return JSON.stringify(item) !== JSON.stringify(lecturer); });
        this._lecturers = newLecturers;
    };
    return School;
}());
var Area = /** @class */ (function () {
    function Area(name) {
        // implement getters for fields and 'add/remove level' methods
        this._levels = [];
        this._name = '';
        this._name = name;
    }
    Object.defineProperty(Area.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Area.prototype, "levels", {
        get: function () {
            return this._levels;
        },
        enumerable: false,
        configurable: true
    });
    Area.prototype.addLevel = function (level) {
        this.levels.push(level);
    };
    Area.prototype.removeLevel = function (level) {
        var newLevels = this.levels.filter(function (item) { return item !== level; });
        this._levels = newLevels;
    };
    return Area;
}());
var Level = /** @class */ (function () {
    function Level(name, description) {
        // implement getters for fields and 'add/remove group' methods
        this._groups = [];
        this._name = '';
        this._description = '';
        this._name = name;
        this._description = description;
    }
    Object.defineProperty(Level.prototype, "groups", {
        get: function () {
            return this._groups;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    Level.prototype.addGroup = function (group) {
        this.groups.push(group);
    };
    Level.prototype.removeGroup = function (group) {
        var newGroups = this.groups.filter(function (item) { return item !== group; });
        this._groups = newGroups;
    };
    return Level;
}());
var Group = /** @class */ (function () {
    function Group(directionName, levelName) {
        // implement getters for fields and 'add/remove student' and 'set status' methods
        this._area = '';
        this._status = 'disabled';
        this._students = []; // Modify the array so that it has a valid toSorted method* How???
        this._directionName = '';
        this._levelName = '';
        this._directionName = directionName;
        this._levelName = levelName;
    }
    Object.defineProperty(Group.prototype, "area", {
        get: function () {
            return this._area;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (status) {
            this._status = status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "students", {
        get: function () {
            return this._students;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "directionName", {
        get: function () {
            return this._directionName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "levelName", {
        get: function () {
            return this._levelName;
        },
        enumerable: false,
        configurable: true
    });
    Group.prototype.showPerformance = function () {
        var sortedStudents = this._students.sort(function (a, b) { return b.getPerformanceRating() - a.getPerformanceRating(); });
        return sortedStudents;
    };
    Group.prototype.addStudent = function (student) {
        this.students.push(student);
    };
    Group.prototype.removeStudent = function (student) {
        var newStudents = this.students.filter(function (item) { return JSON.stringify(item) !== JSON.stringify(student); });
        this._students = newStudents;
    };
    return Group;
}());
var Student = /** @class */ (function () {
    function Student(firstName, lastName, birthYear) {
        // implement 'set grade' and 'set visit' methods
        this._firstName = '';
        this._lastName = '';
        this._birthYear = 0;
        this._visits = []; // lesson: present
        this._grades = {}; // workName: mark
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }
    Object.defineProperty(Student.prototype, "fullName", {
        get: function () {
            return "".concat(this._lastName, " ").concat(this._firstName);
        },
        set: function (value) {
            var _a;
            _a = value.split(' '), this._lastName = _a[0], this._firstName = _a[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "age", {
        get: function () {
            return new Date().getFullYear() - this._birthYear;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "grades", {
        set: function (grades) {
            this._grades = grades;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "visits", {
        set: function (visits) {
            this._visits = visits;
        },
        enumerable: false,
        configurable: true
    });
    Student.prototype.getPerformanceRating = function () {
        var gradeValues = Object.values(this._grades);
        if (!gradeValues.length)
            return 0;
        var averageGrade = gradeValues.reduce(function (sum, grade) { return sum + grade; }, 0) / gradeValues.length;
        var attendancePercentage = (this._visits.filter(function (present) { return present; }).length / this._visits.length) * 100;
        return (averageGrade + attendancePercentage) / 2;
    };
    return Student;
}());
