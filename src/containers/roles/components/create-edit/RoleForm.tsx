import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import BottomFormController from "components/bottom-form-controller";

import { RoleFormSchema } from "../../roleSchema";
import "./styles.css";
import FormInputText from "components/inputText";
import { Role } from "types/role";
import { useSetRecoilState } from "recoil";
import {
  statusFilterAtom,
  groupFilterAtom,
  sortCountAtom,
  searchAtom,
} from "states/searchSortFilterStates";

interface RoleFormProps {
  name: string;
  createRole: (inputs: FieldValues) => void;
  editRole: (inputs: FieldValues) => void;
  role?: Role;
  loading: boolean;
}

const RoleForm: FC<RoleFormProps> = ({
  name,
  createRole,
  editRole,
  role,
  loading,
}) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const setCheckedStatus = useSetRecoilState(statusFilterAtom);
  const setCheckedGroups = useSetRecoilState(groupFilterAtom);
  const setCount = useSetRecoilState(sortCountAtom);
  const setSearchValue = useSetRecoilState(searchAtom);

  const initialValues = {
    name: name,
  };

  const methods = useForm({
    resolver: yupResolver(RoleFormSchema),
    defaultValues: initialValues,
  });
  const { handleSubmit } = methods;

  const onSubmitForm = (input: FieldValues) => {
    id ? editRole(input) : createRole(input);
  };

  const onBackNavigation = () => {
    setCheckedGroups([]);
    setCheckedStatus([]);
    setCount(0);
    setSearchValue("");
    navigate("/home/roles");
  };

  return (
    <>
      <div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="form"
            id="role-form"
          >
            {!loading && (
              <>
                <FormInputText
                  name="name"
                  label="Role Name"
                  type="text"
                  className="role-name"
                  defaultText={role?.name}
                />
              </>
            )}
          </form>
        </FormProvider>
      </div>
      <BottomFormController
        primarybuttonLabel={id ? "Update Role" : "Create Role"}
        primaryButtonType="submit"
        formId="role-form"
        onSubmit={() => handleSubmit(onSubmitForm)()}
        onCancel={onBackNavigation}
        secondaryButtonLabel="Cancel"
      />
    </>
  );
};

export default RoleForm;
