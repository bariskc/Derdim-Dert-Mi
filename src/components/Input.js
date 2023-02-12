import React from "react";
const Input = (props) => {
    const { label, error, name, type, onChange, defaultValue } = props;
    let className = 'form-control';
    if (type === 'file') {
        className += '-file';
    }
    if (error !== undefined) {
        className += ' is-invalid';
    }
    return (
        <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">{label}</label>
            <input type={type} className={error ? "form-control is-invalid" : "form-control"} name={name} onChange={onChange} defaultValue={defaultValue} />
            {/* <div className="form-text">We'll never share your email with anyone else.</div> */}
            <div className="invalid-feedback">{error}</div>
        </div>
    )
}
export default Input;