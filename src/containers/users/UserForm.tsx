import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./styles.css";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Chip } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInputText from "../../components/InputText";
import { groupListAtom, userGroupsAtom } from "../../states/groupStates";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { UserPermissionsAtom } from "../../states/permissionsStates";
import { GET_GROUP_PERMISSIONS } from "../groups/services/queries";
import { useLazyQuery } from "@apollo/client";
import { ChecklistComponent } from "../../components/checklist/checkList";

const UserForm = (props: any) => {
  const {
    isEdit,
    updateUser,
    createUser,
    initialValues,
    userformSchema,
    currentGroupIDs,
  } = props;
  const groupList = useRecoilValue(groupListAtom);
  const userGroups = useRecoilValue(userGroupsAtom);
  const setUserGroups = useSetRecoilState(userGroupsAtom);
  const [UserPermissions, setUserPermissions] =
    useRecoilState(UserPermissionsAtom);

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

  const [getData] = useLazyQuery(GET_GROUP_PERMISSIONS);
  
  const removeItem = (item: string) => {
    const itemIndex = userGroups.findIndex((e: any) => e === item);
    setUserGroups([
      ...userGroups.slice(0, itemIndex),
      ...userGroups.slice(itemIndex + 1),
    ]);
    const permission_index = UserPermissions.findIndex(
      (e: any) => e.groupId === item
    );

    setUserPermissions([
      ...UserPermissions.slice(0, itemIndex),
      ...UserPermissions.slice(itemIndex + 1),
    ]);
  };

  const addGroupPermissions = (permissions: any, item: string) => {
    if (UserPermissions[0]?.groupId === "") {
      setUserPermissions([{ groupId: item, permissions: permissions }]);
    } else 
    if (
      UserPermissions.map((item: any) => item.groupId).includes(item) === false
    ) {
      setUserPermissions([
        ...UserPermissions,
        { groupId: item, permissions: permissions },
      ]);
    }
  }

  const handleChange = (event: any, item: any) => {
    if (event.target.checked) {
      if(!userGroups.map((item)=>item).includes(item.id))
      setUserGroups([...userGroups, item.id]);
      getData({
        variables: { id: item.id },
        onCompleted: (data) => {
          addGroupPermissions(data?.getGroupPermissions, item.id);
        },
      });
    } else {
      removeItem(item.id);
    }
  };

  const groups: string[] = [];
  groupList.map((item) => groups.push(item.id));

  const onSelectAll = (event: any) => {
    if (event.target.checked) setUserGroups(groups);
    else setUserGroups([]);
  };

  return (
    <div id="page">
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
      <div id="groups-permissions">

        <ChecklistComponent
          name="Select Groups"
          mapList={groupList}
          currentIDs={currentGroupIDs}
          onChange={handleChange}
          onSelectAll={onSelectAll}
        />

        <div id="add-items">
          <div> Permissions </div>
          <div id="item-list">
            {UserPermissions.map((permission: any) => {
              return (
                <div key={permission.groupId}>
                  {permission.permissions.map((item: any) => {
                    return <Chip id="item" key={item.id} label={item.name} />;
                  })}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserForm;
