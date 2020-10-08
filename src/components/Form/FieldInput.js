import React from 'react';

function FieldInput({ values }) {
    const { name, label, type, value, handleChange, placeholder } = values;

    let inputLabel = <label htmlFor={name}>{label}</label>;

    if (values.textArea) {
        return (
            <>
                {inputLabel}
                <textarea
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
            </>
        );
    }

    return (
        <>
            {inputLabel}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </>
    );
}

export default FieldInput;
