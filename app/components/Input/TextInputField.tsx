import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface InputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TFieldName> {
  type: string;
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  children?: ReactNode;
  rules?: Object;
}

export default function TextInputField<TFieldValues extends FieldValues>(
  props: InputFieldProps<TFieldValues>
) {
  const {
    name,
    type,
    value,
    onChange,
    label,
    placeholder,
    className,
    children,
    control,
    rules,
    ...rest
  } = props;

  const {
    field,
    fieldState: { invalid, error },
  } = useController({ control, name, rules });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event);

    if (onChange) {
      onChange(event);
    }
  };

  const isEmpty = field.value.trim() === '';
  const inputStyles = twMerge(
    invalid
      ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 block dark:bg-red-100 dark:border-red-400'
      : '',
    !invalid && !isEmpty
      ? 'bg-green-50 border border-green-500 text-green-800 placeholder-green-700 focus:ring-green-500 focus:border-green-500 block dark:bg-green-100 dark:border-green-400'
      : ''
  );

  const errorStyles = twMerge(
    invalid ? 'text-red-500' : '',
    !invalid && !isEmpty ? 'text-green-500' : ''
  );

  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 flex">
        <input
          type={type}
          name={name}
          id={name}
          value={field.value}
          onChange={handleChange}
          className={twMerge(
            ' rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6',
            inputStyles,
            className
          )}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {invalid && <p children={error?.message} className={errorStyles} />}
    </>
  );
}
