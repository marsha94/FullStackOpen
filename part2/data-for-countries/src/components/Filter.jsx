const Filter = ({ onFilter, name }) => {
  return (
    <>
      <div>
        filter countries <input type="text" onChange={onFilter} value={name} />
      </div>
    </>
  );
};

export default Filter;
