import * as yup from "yup";

const AddUserformSchema = yup.object({
    firstName: yup.string().required("First name can not be empty"),
    email: yup.string().required("Email can not be empty"),
    password: yup.string().required("Password can not be empty"),
  });

  const EditUserformSchema = yup.object({
    firstName: yup.string().required("First name can not be empty"),
    email: yup.string().required("Email can not be empty"),
  });

export {AddUserformSchema,EditUserformSchema};