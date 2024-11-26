const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Content = (props) => {
  return (
    <>
      <Part content={props.course.parts[0].name} />
      <Part content={props.course.parts[1].name} />
      <Part content={props.course.parts[2].name} />
    </>
  );
};

const Part = (props) => {
  return <p>{props.content}</p>;
};

const Total = (props) => {
  const total = props.course.parts.reduce(
    (total, curr) => total + curr.exercises,
    0
  );

  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
