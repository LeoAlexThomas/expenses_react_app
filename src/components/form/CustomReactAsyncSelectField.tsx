import { CustomSelectOptions } from "@/types/common";
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import { TextProps } from "@chakra-ui/react";
import get from "lodash/get";
import CustomReactAsyncSelect from "../CustomReactAsyncSelect";
import { Field } from "../ui/field";

function CustomReactAsyncSelectField<T extends FieldValues>({
  hForm,
  name,
  rules,
  isMultiChoice,
  getOptions,
  title,
  titleProps,
  placeholder,
  isDisabled = false,
}: {
  hForm: UseFormReturn<T>;
  name: Path<T>;
  rules: RegisterOptions<T>;
  isMultiChoice: boolean;
  getOptions: (val: string) => Promise<CustomSelectOptions[]>;
  title?: string;
  titleProps?: TextProps;
  placeholder?: string;
  isDisabled?: boolean;
}) {
  const { control } = hForm;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ formState: { errors }, field: { onChange, value } }) => {
        const error = get(errors, name);
        return (
          <Field
            errorText={
              error?.message ?? error?.type === "required"
                ? "This field is required"
                : "Something went wrong"
            }
            w="100%"
          >
            <CustomReactAsyncSelect
              isMultiChoice={isMultiChoice}
              onChange={onChange}
              value={value}
              getOptions={getOptions}
              title={title}
              titleProps={titleProps}
              placeholder={placeholder}
              showStar={rules?.required === true}
              isDisabled={isDisabled}
            />
          </Field>
        );
      }}
    />
  );
}

export default CustomReactAsyncSelectField;
