
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./styles.css";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInputText from "../../components/InputText";


const UserForm = (props: any) => {

  const { isEdit, updateUser, createUser, initialValues, userformSchema } = props;

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(userformSchema),
  });

  const { handleSubmit } = methods;

  const getTitle = () => {
    return isEdit ? "Modify User" : "Add User";
  };
  const getButtonLabel = () => {
    return isEdit ? "Update" : "Add";
  };

  const onSubmitForm = (inputs: any) => {
    isEdit ? updateUser(inputs) : createUser(inputs);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div id="fixed">
            <div id="back-page">
              <ArrowBackIcon id="arrowicon" />
              Users
            </div>
            <div id="title">
              <legend id="bold">{getTitle()}</legend>
              <div id="add-cancel">
                <Button id="cancel">
                  <Link id="cancel" to="/home">
                    Cancel
                  </Link>
                </Button>
                <Button id="add" type="submit">
                  {getButtonLabel()}
                </Button>
              </div>
            </div>
          </div>
          <div id="inputs">
            <div id="form-row">
              <FormInputText
                name="firstName"
                label="First name*"
                type="text"
                className="fields"
              />
              <FormInputText
                name="middleName"
                label="Middle name"
                type="text"
                className="fields"
              />
              <FormInputText
                name="lastName"
                label="Last Name*"
                type="type"
                className="fields"
              />
            </div>
            {!isEdit && (
              <div id="form-row">
                <FormInputText
                  name="email"
                  label="Email*"
                  type="text"
                  className="fields"
                />
                <FormInputText
                  name="phone"
                  label="Phone Number"
                  type="text"
                  className="fields"
                />
                <FormInputText
                  name="password"
                  label="Password*"
                  type="password"
                  className="fields"
                />
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default UserForm;
