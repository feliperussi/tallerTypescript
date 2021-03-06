import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
import { Student } from './student.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentsTbody: HTMLElement = document.getElementById('student')!;

const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;

const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBoxMinCredits: HTMLInputElement = <HTMLInputElement> document.getElementById("minCredits-box")!;
const inputSearchBoxMaxCredits: HTMLInputElement = <HTMLInputElement> document.getElementById("maxCredits-box")!;

const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderCoursesInTable(courses: Course[]): void 
{
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderStudentsInTable(students: Student[]): void 
{
  console.log('Desplegando estudiantes');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${"Nombre"}</td>
                           <td>${student.name}</td>
                           `;
    studentsTbody.appendChild(trElement);
    let trElement2 = document.createElement("tr");
    trElement2.innerHTML = `<td>${"Código"}</td>
                           <td>${student.codigo}</td>
                            `;
    studentsTbody.appendChild(trElement2);
    let trElement3 = document.createElement("tr");
    trElement3.innerHTML = `<td>${"Cédula"}</td>
                           <td>${student.cedula}</td>
                           `;
    studentsTbody.appendChild(trElement3);
    let trElement4 = document.createElement("tr");
    trElement4.innerHTML = `<td>${"Edad"}</td>
                           <td>${student.edad}</td>
                           `;
    studentsTbody.appendChild(trElement4);
    let trElement5 = document.createElement("tr");
    trElement5.innerHTML = `<td>${"Dirección"}</td>
                           <td>${student.direccion}</td>
                           `;
    studentsTbody.appendChild(trElement5);
    let trElement6 = document.createElement("tr");
    trElement6.innerHTML = `<td>${"Teléfono"}</td>
                           <td>${student.telefono}</td>
    `;  
    studentsTbody.appendChild(trElement6);
  });
}

function applyFilterByName()
 { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits()
 { 
  let min: number = +inputSearchBoxMinCredits.value;
  let max: number = +inputSearchBoxMaxCredits.value;

  clearCoursesInTable();
  let coursesFilteredMax: Course[] = searchCourseByCredits(min, max, dataCourses);
  renderCoursesInTable(coursesFilteredMax);
}

function searchCourseByName(nameKey: string, courses: Course[]) 
{
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(min: number, max: number, courses: Course[]) 
{
  const result = courses.filter(course => course.credits <= max && course.credits >= min );
  return result
}

function getTotalCredits(courses: Course[]): number
 {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes())
   {
    if (coursesTbody.firstChild != null) 
    {
      coursesTbody.removeChild(coursesTbody.firstChild);
    }
  }
}