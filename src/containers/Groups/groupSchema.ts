import * as yup from "yup";

const GroupFormSchema = yup.object({
  groupname: yup.string().required("First name can not be empty"),
});

export { GroupFormSchema };
