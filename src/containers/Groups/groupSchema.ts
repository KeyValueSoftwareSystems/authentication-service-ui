import * as yup from "yup";

const GroupFormSchema = yup.object({
  name: yup.string().required("First name can not be empty"),
});

export { GroupFormSchema };
