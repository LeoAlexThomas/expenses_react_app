import { useForm } from "react-hook-form";
import { CreateExpanseInterface } from "../../types/project";
import React from "react";
import { VStack } from "@chakra-ui/react";
import InputField from "../form/InputField";
import { useApi } from "../../hook/useApi";
import api from "../api";
import { createExpanseFormId } from "../utils";
import dayjs from "dayjs";
import isNil from "lodash/isNil";

const ExpansesForm = ({
  projectId,
  onSuccess,
  defaultValues,
  onEditExpense,
}: {
  projectId: string;
  onSuccess?: () => void;
  defaultValues?: CreateExpanseInterface;
  onEditExpense?: (values: CreateExpanseInterface) => void;
}) => {
  const { makeApiCall } = useApi();
  const expansesHookForm = useForm<CreateExpanseInterface>({
    mode: "onChange",
    defaultValues: defaultValues ?? {
      title: "",
      spent: 0,
      date: "",
      isCompleted: false,
      projectId: projectId,
    },
  });

  const onSubmit = (values: CreateExpanseInterface) => {
    if (isNil(defaultValues)) {
      makeApiCall({
        apiFn: () =>
          api("/expanse/create", {
            method: "POST",
            data: { ...values, date: dayjs(values.date).toISOString() },
          }),
        successMsg: {
          title: "Expanse added successfully",
        },
        onSuccess: (res) => onSuccess?.(),
      });
      return;
    }
    onEditExpense?.(values);
  };

  return (
    <form
      id={createExpanseFormId}
      onSubmit={expansesHookForm.handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
      <VStack alignItems="stretch" spaceY={4}>
        <InputField
          hForm={expansesHookForm}
          name="title"
          title="Title"
          placeholder="Enter Expanse Title"
          rules={{ required: true }}
        />
        <InputField
          hForm={expansesHookForm}
          name="spent"
          title="Spent Amount"
          placeholder="Enter Amount"
          type="number"
          rules={{ required: true }}
          min={1}
        />
        <InputField
          hForm={expansesHookForm}
          name="date"
          rules={{
            required: true,
          }}
          title="Due Date"
          placeholder="Select due date..."
          type="date"
          min={dayjs().add(1, "day").toISOString().split("T")[0]}
        />
      </VStack>
    </form>
  );
};

export default ExpansesForm;
