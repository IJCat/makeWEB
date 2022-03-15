// Q1. make a string out of an array
{
  const fruits = ['apple', 'banana', 'orange'];
  const result = fruits.join(', ');
  console.log(result);
}

// Q2. make an array out of a string
{
  const fruits = '🍎, 🥝, 🍌, 🍒';
  const result = fruits.split(',', 2);
  console.log(result);
}

// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
  const array = [1, 2, 3, 4, 5];
  const result = array.reverse();
  console.log(result);
  console.log(array);
}

// Q4. make new array without the first two elements
{
  const array = [1, 2, 3, 4, 5];
  // const result = array.splice(0, 2); 배열 자체를 수정
  // 배열에서 원하는 부분만 리턴해서 받아오고 싶을때
  const result = array.slice(2, 5);
  console.log(result);
  console.log(array);
}

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];

// Q5. find a student with the score 90
{
  const result = students.find(student => student.score === 90);
  console.log(result);
}

// Q6. make an array of enrolled students
{
  // 콜백 함수가 true이면 그 아이들을 새로운 배열로 만들어서 전달한다.
  // ex) const result = students.filter(student => student.age < 40);
  const result = students.filter(student => student.enrolled);
  console.log(result);
}

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
{
  // map은 배열안에 들어있는 모든 요소들을 우리가 전달해준 콜백함수를
  // 호출하면서 콜백함수에서 가공되어 리턴된 값으로 대체함
  // map을 쓸 때는 콜백함수 인자는 이해하기 쉬운 인자로 쓴다! value 이런거 안됨.
  const result = students.map(student => student.score * 2);
  console.log(result);
}

// Q8. check if there is a student with the score lower than 50
{
  // some은 배열의 요소중에 콜백함수가 true로 리턴되는 애가 있는지 없는지 확인
  const result = students.some(student => student.score < 50);
  console.log(result);

  // every를 사용
  const result2 = !students.every(student => student.score >= 50);
  console.log(result2);
}

// Q9. compute students' average score
{
  // reduce : 콜백 함수는 배열안에 들어있는 모든 요소가 호출됨
  // 콜백함수에서 리턴되는 값은 함께 누적된 결과값을 리턴한다.
  // curr은 배열 하나씩 curr에 전달
  // prev은 리턴한 값이 그 다음에 호출될 때 prev로 전달된다.
  const result = students.reduce((prev, curr) => prev + curr.score, 0);
  console.log(result / students.length);
}

// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
  const result = students
    .map(student => student.score)
    .filter(score => score >= 50) // 50점 이상인 점수만 필터링
    .join();
  console.log(result);
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
  const result = students
    .map(student => student.age)
    .sort((a, b) => b - a)
    .join();
  console.log(result);
}
