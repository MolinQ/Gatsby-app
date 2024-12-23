import { Form, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { clsx } from "clsx";
import React from "react";

const FormWrapper = ({
  children,
  schema,
  onSubmit,
  extraClasses,
  defaultValue,
}) => {
  const methods = useForm({
    mode: "onChange",
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues: defaultValue,
  });

  return (
    <FormProvider {...methods} handleSubmit={onSubmit}>
      <Form
        className={clsx(extraClasses, "w-full h-full")}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </Form>
    </FormProvider>
  );
};
export default FormWrapper;
