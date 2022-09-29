import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from "../../../../components/InputText";
import "./styles.css";
import AccessSettings from "./accessSettings";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  CREATE_GROUP,
  UPDATE_GROUP,
  UPDATE_GROUP_ROLES,
} from "../../services/mutations";
import { GroupFormSchema } from "../../groupSchema";

const CreateOrEditGroup = () => {
  const { id } = useParams();

  const [updateGroup] = useMutation(UPDATE_GROUP);
  const [createGroup] = useMutation(CREATE_GROUP);
  const [updateGroupRoles] = useMutation(UPDATE_GROUP_ROLES);
  /*   updateGroup({
    variables: {
      id: "011274f1-f0da-41d2-ba6e-8dbab5c2ecc4",
      input: { name: "Founder-groups" },
    },
  });  */

  /*   createGroup({
    variables: {
      input: { name: "Developers" },
    },
  }); */

  /*   updateGroupRoles({
    variables: {
      id: "011274f1-f0da-41d2-ba6e-8dbab5c2ecc4",
      input: { roles: [] },
    },
  }); */

  const onClick = () => {};

  const initialValues = {
    groupname: id ? "" : "",
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(GroupFormSchema),
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
          <Button variant="outlined" className="button" onClick={onClick}>
            Create Group
          </Button>
        </Stack>
      </div>
      <Divider />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitForm)} className="form">
          <FormInputText
            name="groupname"
            label="Group Name"
            type="text"
            className="group-name"
          />
          {/*           <FormInputText
            name="description"
            label="Description"
            type="text"
            className="description"
            inputHeight={90}
          /> */}
        </form>
      </FormProvider>
      <Divider />
      <AccessSettings />
    </div>
  );
};

export default CreateOrEditGroup;
