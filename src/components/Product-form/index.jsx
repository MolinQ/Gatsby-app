import { productSchema } from "../../schemes/CreateProductForm";
import Input from "../ui/Input";
import { navigate } from "gatsby";
import { PAGE_PATH } from "../../constants/pagePath";
import { BUTTON_THEM } from "../../constants/buttonsDependencies";
import Form from "../Form";
import React from "react";
import Button from "../ui/Button";

const ProductForm = ({ onSubmit, defaultValue, loading }) => {
  return (
    <Form
      extraClasses="p-4"
      defaultValue={defaultValue}
      onSubmit={onSubmit}
      schema={productSchema}
    >
      <Input placeholderText="Title..." name="title" formTitle="Title" />
      <Input
        placeholderText="Description..."
        name="description"
        formTitle="Description"
      />
      <Input placeholderText="Brand..." name="brand" formTitle="Brand" />
      <p className="text-base mt-[0.9rem]">Size </p>
      <div className="my-[0.9rem] border border-darkDivided py-4 rounded-lg">
        <div className={`flex flex-row justify-center items-center gap-6 `}>
          <Input
            classForWith="max-w-[100px]"
            type={"number"}
            placeholderText="Height..."
            formTitle="Height (mm)"
            topMarginHas={false}
            name="height"
          />
          <p className="mt-6">X</p>
          <Input
            classForWith="max-w-[100px]"
            placeholderText="Width..."
            formTitle="Width (mm)"
            type={"number"}
            topMarginHas={false}
            name={"width"}
          />
        </div>
      </div>
      <Input
        placeholderText="RAM..."
        formTitle="RAM"
        type={"number"}
        topMarginHas={false}
        name={"ram"}
      />
      <Input
        placeholderText="Price..."
        formTitle="Price"
        type={"number"}
        name={"price"}
      />
      <div className="flex flex-row justify-end gap-4 p-4 items-center">
        <Button
          onClick={() => navigate(PAGE_PATH.DASHBOARD)}
          variant={BUTTON_THEM.OUTLINE}
          size="max-w-[90px] h-10"
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          loading={loading}
          variant={BUTTON_THEM.PRIMARY}
          size="max-w-[90px] h-10"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};
export default ProductForm;
