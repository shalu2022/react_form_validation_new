// import "./style.css";

const InputField = (props) => {
  const { name, label, onChange, errors, icon, ...restProps } = props;
  // const changeHandler = (e) => {
  //   // console.log(e.target.value);
  //   props.setUsername(e.target.value);
  // };

  return (
    <div className="userField input-field">
      <div>
        <i className="material-icons prefix">{icon}</i>
        <label>{label}</label>
      </div>
      <input name={name} {...restProps} onChange={onChange} />
      <span className="red-text">{errors[name]}</span>
    </div>
  );
};

export default InputField;
