import React from 'react';
import { Switch } from '@nextui-org/react';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface SwitchInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TFieldName> {
  defaultSelected: boolean;
  label: string;
}

export default function SwitchInputField<TFieldValues extends FieldValues>(
  props: SwitchInputProps<TFieldValues>
) {
  const { defaultSelected, name, control, label } = props;
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <Switch
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
      defaultSelected={defaultSelected}
    >
      {label}
    </Switch>
  );
}
