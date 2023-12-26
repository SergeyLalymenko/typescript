enum EEmployeeStatuses {
    active = 'active',
    inactive = 'inactive',
    unpaidVacation = 'unpaidVacation',
}
enum EDepartmentNames {
    development = 'development',
    marketing = 'marketing',
    accounting = 'accounting',
}
enum EDomainZone {
    com = 'com',
    org = 'org',
}

type TEmployeeStatus = keyof typeof EEmployeeStatuses;
type TDepartmentName = keyof typeof EDepartmentNames;
type TDomainZone = keyof typeof EDomainZone;
type TBudget = {
    debit: number;
    credit: number;
}
type TAccountingBalance = {
    departments: Department[];
    allEmployees: (TrialPeriodEmployee | Employee)[];
}

class Company {
    name: string;
    departments: Department[];
    trialPeriodEmployees: TrialPeriodEmployee[];
    allEmployees: (TrialPeriodEmployee | Employee)[];

    constructor(name: string, departments: Department[], allEmployees: (TrialPeriodEmployee | Employee)[]) {
        this.name = name;
        this.departments = departments;
        this.trialPeriodEmployees = allEmployees.filter((employee): employee is TrialPeriodEmployee => employee instanceof TrialPeriodEmployee);
        this.allEmployees = allEmployees;
    }
}

class Department {
    name: TDepartmentName;
    domainZone: TDomainZone;
    employees: Employee[];
    budget: TBudget;

    constructor(name: TDepartmentName, domainZone: TDomainZone, allEmployees: (TrialPeriodEmployee | Employee)[], debit: number) {
        this.name = name;
        this.domainZone = domainZone;
        this.employees = allEmployees.filter((employee): employee is Employee => (employee instanceof Employee) && (employee.department === name));
        this.budget = {
            credit: this.employees.reduce((acc, { salary }) => acc + salary, 0),
            debit,
        };
    }

    getBalance(): number {
        return this.budget.debit - this.budget.credit;
    }

    addEmployee(employee: Employee): void {
        this.employees = [...this.employees, employee];

        this.updateBudget();
    }

    removeEmployee(employee: Employee): void {
        this.employees = this.employees.filter((iterableEmployee) => JSON.stringify(iterableEmployee) !== JSON.stringify(employee));

        this.updateBudget();
    }

    updateBudget(): void {
        this.budget = {
            ...this.budget,
            credit: this.employees.reduce((acc, { salary }) => acc + salary, 0),
        };
    }
    // не стал добавлять сюда метод для переноса работника с испытательного на обычного так как в этом нет смысла, о работниках на испытательном знает лишь компания, которая в свою учередь должна удалить человека из списков испытательных работников и вызвать метод добавления работника у нужного иснтанс департамента, который уже реализован
}

class Accounting extends Department {
    balance: TAccountingBalance;

    constructor(name: TDepartmentName, domainZone: TDomainZone, allEmployees: (TrialPeriodEmployee | Employee)[], debit: number, departments: Department[]) {
        super(name, domainZone, allEmployees, debit);

        this.balance = {
            departments,
            allEmployees,
        };
    }

    addToBalance(entity: TrialPeriodEmployee | Employee | Department) {
        if (entity instanceof Department) {
            this.balance.departments = [...this.balance.departments, entity];
        } else {
            this.balance.allEmployees = [...this.balance.allEmployees, entity];
        }
    }

    removeFromBalance(entity: TrialPeriodEmployee | Employee | Department) {
        if (entity instanceof Department) {
            this.balance.departments = this.balance.departments.filter((department) => JSON.stringify(department) !== JSON.stringify(entity));
        } else {
            this.balance.allEmployees = this.balance.allEmployees.filter((employee) => JSON.stringify(employee) !== JSON.stringify(entity));
        }
    }

    paySalary(): void {
        const additionalCredit = this.balance.allEmployees.reduce((acc, employee) => {
            if (employee instanceof Employee && employee.status === EEmployeeStatuses.active) {
                employee.internalPayment();

                return acc + employee.salary;
            } else if (employee instanceof TrialPeriodEmployee) {
                employee.externalPayment();

                return acc + employee.salary;
            }

            return acc;
        }, 0);

        this.budget.credit += additionalCredit;
    }
}

class Employee {
    name: string;
    surname: string;
    paymentInfo: string;
    salary: number;
    status: TEmployeeStatus;
    department: TDepartmentName;

    constructor({ name, surname, paymentInfo, salary, status, department }: Employee) {
        this.name = name;
        this.surname = surname;
        this.paymentInfo = paymentInfo;
        this.salary = salary;
        this.status = status;
        this.department = department;
    }

    internalPayment(): void {}
}

class TrialPeriodEmployee {
    name: string;
    surname: string;
    salary: number;
    bankAccountNumber: number;

    constructor({ name, surname, salary, bankAccountNumber }: TrialPeriodEmployee) {
        this.name = name;
        this.surname = surname;
        this.salary = salary;
        this.bankAccountNumber = bankAccountNumber;
    }

    externalPayment(): void {}
}
