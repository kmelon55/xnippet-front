import React from 'react';
import { RadioGroup, Radio } from '@nextui-org/react';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface RadioInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TFieldName> {
  label?: string;
  options: RadioOption[];
}

interface RadioOption {
  label: string;
  value: string;
}

export default function RadioInputField<TFieldValues extends FieldValues>(
  props: RadioInputProps<TFieldValues>
) {
  const { defaultValue, name, control, label, options } = props;
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <RadioGroup
      label={label}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}
