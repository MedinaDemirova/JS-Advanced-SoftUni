function solveClasses() {

    class Developer {
        constructor(firstName, lastName) {

            this.firstName = firstName;
            this.lastName = lastName;
            this.baseSalary = 1000;
            this.tasks = [];
            this.experience = 0;
        }

        addTask(id, taskName, priority) {
            if (priority == `high`) {
                this.tasks.unshift({
                    id: id,
                    taskName: taskName,
                    priority: priority
                })
            } else {
                this.tasks.push({
                    id: id,
                    taskName: taskName,
                    priority: priority
                })
            }
            return `Task id ${id}, with ${priority} priority, has been added.`;
        }

        doTask() {
            if (this.tasks.length == 0) {
                return `${this.firstName}, you have finished all your tasks. You can rest now.`;
            } else {
                this.tasks.shift();
            }
        }

        getSalary() {
            return `${this.firstName} ${this.lastName} has a salary of: ${this.baseSalary}`;
        }

        reviewTasks() {
            let print = `Tasks, that need to be completed:`;
            this.tasks.forEach(element => {
                print += `\n${element.id}: ${element.taskName} - ${element.priority}`;

            });
            return print;
        }
    }

    class Junior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName,experience);
            this.baseSalary = 1000 + Number(bonus);
            this.tasks = [];
            this.experience += Number(experience);
        }
        learn(years) {
            this.experience += Number(years);
        }
    }

    class Senior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);
            this.baseSalary = 1000 + Number(bonus);
            this.tasks = [];
            this.experience = Number(experience)+ 5;
        }
        changeTaskPriority(taskId) {
            let currentTask = this.tasks.find(a => a.id == taskId);
            if (currentTask.priority == 'high') {
                currentTask.priority = 'low';
            } else if (currentTask.priority == 'low') {
                currentTask.priority = 'high';
            }
            let index = this.tasks.indexOf(currentTask);
            this.tasks.splice(index, 1);
            if (currentTask.priority == 'high') {
                this.tasks.unshift(currentTask);
            } else {
                this.tasks.push(currentTask);
            }
            return currentTask;
        }
    }
    return {
        Developer,
        Junior,
        Senior
    }
}
let classes = solveClasses();

const senior = new classes.Senior("Jonathan", "Joestar", 200, 2);
senior.addTask(1, "Write Performance Tests", "high");
