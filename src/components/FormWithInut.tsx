import { useState } from 'react';

type FormWithInputProps = {
    buttonText: string;
    placeholder: string;
    id: string;
    onSubmit: (value: string) => void;
};
const FormWithInput = ({
    buttonText,
    placeholder,
    id,
    onSubmit,
}: FormWithInputProps) => {
    const [value, setValue] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(value);
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                name={id}
                id={id}
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
            />
            <button type="submit">{buttonText}</button>
        </form>
    );
}

export default FormWithInput;