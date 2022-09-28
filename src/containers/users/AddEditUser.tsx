import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../../states/UserStates";
import {
  CREATE_USER,
  UPDATE_USER,
  UPDATE_USER_GROUPS,
} from "./services/mutations";
import { GET_GROUPS, GET_USER, GET_USER_GROUPS } from "./services/queries";
import { groupListAtom, userGroupsAtom } from "../../states/GroupStates";
import { ChecklistComponent } from "../../components/checkList/Checklist";
import FormInputText from "../../components/input-text";
import { UserformSchema } from "./UserSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEditUser: React.FC = () => {
  const { id } = useParams();
  const setGroupList = useSetRecoilState(groupListAtom);
  const groupList = useRecoilValue(groupListAtom);
  const userGroupList = useRecoilValue(userGroupsAtom);

  const currentIDs: string[] = [];
  userGroupList.map((item) => currentIDs.push(item));

  useQuery(GET_GROUPS, {
    onCompleted: (data) => {
      setGroupList(data?.getGroups);
    },
  });

  return (
    <div id="page">
      {id ? <EditUser /> : <CreateUser />}{" "}
      <ChecklistComponent
        name="Select Groups"
        mapList={groupList}
        atomName={userGroupsAtom}
        currentIDs={currentIDs}
      />
    </div>
  );
};

const CreateUser = () => {
  const userGroupList = useRecoilValue(userGroupsAtom);

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const [updateUserGroups] = useMutation(UPDATE_USER_GROUPS);

  const onCreateUser = (inputs: any) => {
    createUser({
      variables: {
        input: inputs,
      },
    });
  };

  useEffect(() => {
    if (data) {
      updateUserGroups({
        variables: {
          id: data?.passwordSignup.id,
          input: {
            groups: userGroupList,
          },
        },
      });
    }
  }, [data]);

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  };

  return (
    <FormComponent createUser={onCreateUser} initialValues={initialValues} />
  );
};

const EditUser = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userAtom);
  const [userGroupList, setUserGroup] = useRecoilState(userGroupsAtom);
  const [updateUser] = useMutation(UPDATE_USER);
  const [updateUserGroups] = useMutation(UPDATE_USER_GROUPS);

  useQuery(GET_USER, {
    variables: { id },
    onCompleted: (data) => {
      setUser(data?.getUser);
    },
  });
  useQuery(GET_USER_GROUPS, {
    variables: { id },
    onCompleted: (data) => {
      data?.getUserGroups.map((item: any) =>
        setUserGroup([...userGroupList, item.id])
      );
    },
  });
  const onUpdateUser = (inputs: any) => {
    updateUser({
      variables: {
        id: id,
        input: {
          firstName: inputs.firstName,
          middleName: inputs.middleName,
          lastName: inputs.lastName,
        },
      },
    });
    // console.log(userGroupsID);
    updateUserGroups({
      variables: {
        id: id,
        input: {
          groups: userGroupList,
        },
      },
    });
    navigate("/home");
  };

  const initialValues = {
    firstName: user?.firstName,
    middleName: user?.middleName,
    lastName: user?.lastName,
    phone: user?.phone,
    email: user?.email,
    password: user?.password,
  };
  return (
    <>
      {user?.firstName && (
        <FormComponent
          isEdit
          updateUser={onUpdateUser}
          initialValues={initialValues}
        />
      )}
    </>
  );
};

const FormComponent = (props: any) => {
  const { id } = useParams();
  const { isEdit, updateUser, createUser, initialValues } = props;

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(UserformSchema),
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
  const navigate = useNavigate();
  const getType = () => {
    if (id) return "hidden";
    else return "text";
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
            {/* <hr /> */}
          </div>
          <div id="inputs">
            <div id="form-row">
              <FormInputText
                name="firstName"
                label="First name*"
                type="text"
                className="fields"
                // defaultValue={initialValues?.firstName}
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
                  type={getType()}
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

export default AddEditUser;
