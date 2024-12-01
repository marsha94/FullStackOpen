const Form = ({ onAddNew, onNameInput, onNumberInput, name, number }) => {
  return (
    <form onSubmit={onAddNew}>
      <div>
        name: <input onChange={onNameInput} value={name} />
      </div>
      <div>
        number: <input onChange={onNumberInput} value={number} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
