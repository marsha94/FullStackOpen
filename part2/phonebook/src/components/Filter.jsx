const Filter = ({ onFilterInput }) => {
  return (
    <div>
      filter shown with <input type="text" onChange={onFilterInput} />
    </div>
  );
};

export default Filter;
