import React from 'react';
import { twMerge } from 'tailwind-merge';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface CheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TFieldName> {
  id: string;
  label: string;
  description?: string;
  className?: string;
  defaultChecked?: boolean;
  rules?: Object;
}

export default function CheckboxInputField<TFieldValues extends FieldValues>(
  props: CheckboxFieldProps<TFieldValues>
) {
  const {
    id,
    name,
    label,
    description,
    className,
    defaultChecked,
    control,
    rules,
    ...rest
  } = props;
  const classNames = twMerge(className);

  const {
    field,
    fieldState: { invalid, error },
  } = useController({ control, name, rules });

  return (
    <>
      <div className="flex h-6 items-center">
        <input
          className={twMerge(
            'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600',
            classNames
          )}
          type="checkbox"
          id={id}
          defaultChecked={defaultChecked}
          onChange={(e) => field.onChange(e.target.checked)}
          {...rest}
        />
      </div>
      <div className="text-sm leading-6">
        <label htmlFor="comments" className="font-medium text-gray-900">
          {label}
        </label>
        <p className="text-gray-500">{description}</p>
      </div>
      {invalid && <span>{error?.message}</span>}
    </>
  );
}
