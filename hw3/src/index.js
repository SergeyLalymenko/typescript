// У вас є сутність - Компанія, яка має назву, список департаментів, список попередньо найнятого персоналу,
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// а також список усього персоналу компанії - співробітники всіх департаментів і попередньо найняті. DONE
// Сутність Департамент - має назву, доменну область, список своїх співробітників і бюджет, що складається з дебіту і кредиту.
// Так само у неї існують методи для обчислення балансу виходячи з поточного бюджету, додавання нових співробітників, 
// який враховує зміни балансу і перетворення з Попередньо найнятого на Співробітника або видалення Співробітника з
// минулого відділу.
// Сутність Попередньо найнятого співробітника має ім'я, прізвище, зарплата та номер банківського рахунку. DONE
// Сутність Співробітника - ім'я, прізвище, платіжну інформацію, зарплату, статус (активний, неактивний, у неоплачуваній відпустці) і знання про департамент, DONE
// до якого він прикріплений. DONE
// Так само у нас є сутність Бухгалтерія, яка є департаментом і має властивість баланс, а також методи
// для взяття на баланс співробітника або департаменту, зняття з балансу і виплати зарплати для всього персоналу.
// Попередньо найняті співробітники отримують зарплату за допомогою зовнішніх оплат, Співробітники (тільки активні) - за допомогою внутрішніх.
// 1. Компания - название, список департаментов, список персонала на испыталке, список всего персонала(работники всех департаментов и челы на испыталке).
// 2. Департамент - название, доменная область?, список своих работников, бюджет(в нем есть дебит и кредит), методы вычисления баланса(дебит - кредит) с текущего бюджета и добавления новых работников, ???
// 3. Чел на испыталке - имя, фамилия, зарплата, номер банковского счета ??? DONE
// 4. Работник - имя, фамилия, платежная информация, зарплата, статус(активный, не активный, в неоплачиваемом отпуске), его департамент. DONE
// 5. Бухгалтерия(это департамент) - баланс, метод получить баланс работника или департамента, метод снятия с баланса и выплаты зарплат всему персоналу. (челы на испыталке получают оплату на внешние карты, а работники(только активные) на внутренние).
var EEmployeeStatuses;
(function (EEmployeeStatuses) {
    EEmployeeStatuses["active"] = "active";
    EEmployeeStatuses["inactive"] = "inactive";
    EEmployeeStatuses["unpaidVacation"] = "unpaidVacation";
})(EEmployeeStatuses || (EEmployeeStatuses = {}));
var EDepartmentNames;
(function (EDepartmentNames) {
    EDepartmentNames["development"] = "development";
    EDepartmentNames["marketing"] = "marketing";
    EDepartmentNames["accounting"] = "accounting";
})(EDepartmentNames || (EDepartmentNames = {}));
var EDomainZone;
(function (EDomainZone) {
    EDomainZone["com"] = "com";
    EDomainZone["org"] = "org";
})(EDomainZone || (EDomainZone = {}));
var Company = /** @class */ (function () {
    function Company(name, departments, allEmployees) {
        this.name = name;
        this.departments = departments;
        this.trialPeriodEmployees = allEmployees.filter(function (employee) { return employee instanceof TrialPeriodEmployee; });
        this.allEmployees = allEmployees;
    }
    return Company;
}());
var Department = /** @class */ (function () {
    function Department(name, domainZone, allEmployees, debit) {
        this.name = name;
        this.domainZone = domainZone;
        this.employees = allEmployees.filter(function (employee) { return (employee instanceof Employee) && (employee.department === name); });
        this.budget = {
            credit: this.employees.reduce(function (acc, _a) {
                var salary = _a.salary;
                return acc + salary;
            }, 0),
            debit: debit,
        };
    }
    Department.prototype.getBalance = function () {
        return this.budget.debit - this.budget.credit;
    };
    Department.prototype.addEmployee = function (employee) {
        this.employees = __spreadArray(__spreadArray([], this.employees, true), [employee], false);
        this.updateBudget();
    };
    Department.prototype.removeEmployee = function (employee) {
        this.employees = this.employees.filter(function (iterableEmployee) { return JSON.stringify(iterableEmployee) !== JSON.stringify(employee); });
        this.updateBudget();
    };
    Department.prototype.updateBudget = function () {
        this.budget = __assign(__assign({}, this.budget), { credit: this.employees.reduce(function (acc, _a) {
                var salary = _a.salary;
                return acc + salary;
            }, 0) });
    };
    return Department;
}());
var Accounting = /** @class */ (function (_super) {
    __extends(Accounting, _super);
    function Accounting(name, domainZone, allEmployees, debit, departments) {
        var _this = _super.call(this, name, domainZone, allEmployees, debit) || this;
        _this.balance = {
            departments: departments,
            allEmployees: allEmployees,
        };
        return _this;
    }
    Accounting.prototype.addToBalance = function (entity) {
        if (entity instanceof Department) {
            this.balance.departments = __spreadArray(__spreadArray([], this.balance.departments, true), [entity], false);
        }
        else {
            this.balance.allEmployees = __spreadArray(__spreadArray([], this.balance.allEmployees, true), [entity], false);
        }
    };
    Accounting.prototype.removeFromBalance = function (entity) {
        if (entity instanceof Department) {
            this.balance.departments = this.balance.departments.filter(function (department) { return JSON.stringify(department) !== JSON.stringify(entity); });
        }
        else {
            this.balance.allEmployees = this.balance.allEmployees.filter(function (employee) { return JSON.stringify(employee) !== JSON.stringify(entity); });
        }
    };
    Accounting.prototype.paySalary = function () {
        var additionalCredit = this.balance.allEmployees.reduce(function (acc, employee) {
            if (employee instanceof Employee && employee.status === EEmployeeStatuses.active) {
                employee.internalPayment();
                return acc + employee.salary;
            }
            else if (employee instanceof TrialPeriodEmployee) {
                employee.externalPayment();
                return acc + employee.salary;
            }
            return acc;
        }, 0);
        this.budget.credit += additionalCredit;
    };
    return Accounting;
}(Department));
var Employee = /** @class */ (function () {
    function Employee(_a) {
        var name = _a.name, surname = _a.surname, paymentInfo = _a.paymentInfo, salary = _a.salary, status = _a.status, department = _a.department;
        this.name = name;
        this.surname = surname;
        this.paymentInfo = paymentInfo;
        this.salary = salary;
        this.status = status;
        this.department = department;
    }
    Employee.prototype.internalPayment = function () { };
    return Employee;
}());
var TrialPeriodEmployee = /** @class */ (function () {
    function TrialPeriodEmployee(_a) {
        var name = _a.name, surname = _a.surname, salary = _a.salary, bankAccountNumber = _a.bankAccountNumber;
        this.name = name;
        this.surname = surname;
        this.salary = salary;
        this.bankAccountNumber = bankAccountNumber;
    }
    TrialPeriodEmployee.prototype.externalPayment = function () { };
    return TrialPeriodEmployee;
}());
// const dep = new Department('development', 'com', [new Employee({ name: 's', surname: 's', paymentInfo: 's', salary: 2, status: 'active', department: 'development' })], { debit: 500, credit: 500 });
