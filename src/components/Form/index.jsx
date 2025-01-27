import React from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { clsx } from "clsx";

const FormWrapper = ({
  children,
  schema,
  onSubmit,
  extraClasses,
  defaultValue,
  isReset = false,
}) => {
  const methods = useForm({
    mode: "onChange",
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues: defaultValue,
  });

  return (
    <FormProvider {...methods}>
      <Form
        className={clsx(extraClasses, "w-full h-full")}
        onSubmit={(event) => {
          methods.handleSubmit(onSubmit)(event);
          if (!isReset) return;
          methods.reset();
        }}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default FormWrapper;
