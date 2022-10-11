import { FC, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "./styles.css";
import { GroupFormSchema } from "../../groupSchema";
import { GET_GROUP } from "../../services/queries";
import { Group } from "../../../../types/group";
import FormInputText from "../../../../components/inputText";

interface GroupFormProps {
  createGroup: (inputs: any) => void;
  editGroup: (inputs: any) => void;
}

const GroupForm: FC<GroupFormProps> = ({ createGroup, editGroup }) => {
  const { id } = useParams();
  const [group, setGroup] = useState<Group>();

  const { loading } = useQuery(GET_GROUP, {
    skip: !id,
    variables: { id: id },
    onCompleted: (data) => {
      setGroup(data?.getGroup);
    },
  });

  const methods = useForm({
    resolver: yupResolver(GroupFormSchema),
  });
  const { handleSubmit } = methods;

  const onSubmitForm = (input: any) => {
    id ? editGroup(input) : createGroup(input);
  };

  return (
    <div className="container">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitForm)} className="form">
          <div className="box">
            <div className="box1">
              <div className="access-setting">
                <ArrowBackIcon sx={{ height: 15 }} />
                Access setting
              </div>
              <div className="create-group">
                {id ? "Edit Group" : "Create Group"}
              </div>
            </div>
            <Stack className="box2" spacing={2} direction="row">
              <Button variant="text" className="button">
                Cancel
              </Button>
              <Button variant="outlined" className="button" type="submit">
                {id ? "Update Group" : "Create Group"}
              </Button>
            </Stack>
          </div>
          <Divider />
          {!loading && (
            <>
              <FormInputText
                name="name"
                label="Group Name"
                type="text"
                className="group-name"
                defaultText={group?.name}
              />
              <Divider sx={{ marginTop: 2 }} />
            </>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default GroupForm;