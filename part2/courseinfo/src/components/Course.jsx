const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Total = ({ contents }) => {
  const total = contents.reduce((total, curr) => total + curr.exercises, 0);
  return <h4>Number of exercises {total}</h4>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ contents }) => {
  return (
    <div>
      {contents.map((content) => (
        <Part
          key={content.id}
          name={content.name}
          exercises={content.exercises}
        />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content contents={course.parts} />
      <Total contents={course.parts} />
    </div>
  );
};

export default Course;
