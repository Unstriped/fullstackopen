const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const Total = ({ parts }) => {
  return (
    <p style={{ fontWeight: "900" }}>
      Total of {parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercises
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      <ul>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </ul>
      <Total parts={parts} />
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
