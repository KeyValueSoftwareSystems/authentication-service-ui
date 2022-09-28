import * as yup from "yup";

const UserformSchema = yup.object({
    firstName: yup.string().required("First name can not be empty"),
    password: yup.string().required("Password can not be empty"),
  });

export {UserformSchema};