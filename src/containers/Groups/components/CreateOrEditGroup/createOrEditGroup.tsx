import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from "../../../../components/InputText";
import "./styles.css";
import AccessSettings from "./accessSettings";

const initialValues = {
  username: "",
  password: "",
};

const CreateOrEditGroup = () => {
  const methods = useForm({
    defaultValues: initialValues,
  });
  const { handleSubmit } = methods;

  const onSubmitForm = () => {};

  return (
    <div className="container">
      <div className="box">
        <div className="box1">
          <div className="access-setting">
            <ArrowBackIcon sx={{ height: 15 }} />
            Access setting
          </div>
          <div className="create-group">Create Group</div>
        </div>
        <Stack className="box2" spacing={2} direction="row">
          <Button variant="text" className="button">
            Cancel
          </Button>
          <Button variant="outlined" className="button">
            Create Group
          </Button>
        </Stack>
      </div>
      <Divider />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitForm)} className="form">
          <FormInputText
            name="groupName"
            label="Group Name"
            type="text"
            className="group-name"
          />
          <FormInputText
            name="description"
            label="Description"
            type="text"
            className="description"
            inputHeight={90}
          />
        </form>
      </FormProvider>
      <Divider />
      <AccessSettings />
    </div>
  );
};

export default CreateOrEditGroup;
