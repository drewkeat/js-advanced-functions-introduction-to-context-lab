function createEmployeeRecord(arr) {
    const [firstName, familyName, title, payPerHour] = arr
    const Employee = {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
  return Employee;
}

function createEmployeeRecords(arr) {
    return arr.map((employee) => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, timeStamp) {
    const newTime = {
    type: "TimeIn",
    hour: parseInt(timeStamp.split(" ")[1]),
    date: timeStamp.split(" ")[0],
  };
  employee.timeInEvents.push(newTime);
  return employee;
}

function createTimeOutEvent(employee, timeStamp) {
  const newTime = {
    type: "TimeOut",
    hour: parseInt(timeStamp.split(" ")[1]),
    date: timeStamp.split(" ")[0],
  };
  employee.timeOutEvents.push(newTime);
  return employee;
}

function hoursWorkedOnDate(employee, timeStamp) {
    const timeIn = employee.timeInEvents.find(object => object.date === timeStamp).hour
    const timeOut = employee.timeOutEvents.find(object => object.date === timeStamp).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employee, timeStamp) {
    return hoursWorkedOnDate(employee, timeStamp) * employee.payPerHour
}

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// Earns 324
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
// Earns 54
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")

function allWagesFor(employee) {
    return employee.timeOutEvents.reduce((total, timeObject) => total += wagesEarnedOnDate(employee, timeObject.date), 0)
}

function calculatePayroll(empArray) {
    return empArray.reduce((total, employee) => total += allWagesFor(employee), 0)
}

function findEmployeeByFirstName(srcArray, name) {
    return srcArray.find(obj => obj.firstName)
}