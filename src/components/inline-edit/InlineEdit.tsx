import { FC, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useRecoilState } from "recoil";

import "./inlineedit.css";
import { inlineAddAtom, inlineEditAtom } from "../../states/inlineEdit";

interface InlineEditProps {
  placeholder: string;
  api: any;
  id: any;
  checkAdd: boolean;
  action: string;
}
const InlineEdit: FC<InlineEditProps> = ({
  placeholder,
  api,
  id,
  checkAdd,
  action,
}) => {
  const [newvalue, setnewvalue] = useState();
  const [addState, setAddState] = useRecoilState(inlineAddAtom);
  const [editState, setEditState] = useRecoilState(inlineEditAtom);
  const savePermission = () => {
    api({
      variables: {
        id,
        input: {
          name: newvalue,
        },
      },
    });
    checkAdd = false;
    setAddState(false);
    setEditState(false);
  };
  const handleChange = (event: any) => {
    setnewvalue(event.target.value);
  };
  const handleKeyDown = (event: any) => {
    if (event.key === "Escape") {
      setAddState(false);
    }
  };
  return checkAdd ? (
    action === "add" ? (
      addState ? (
        <div className="edit-elements">
          <input
            type="text"
            placeholder={placeholder}
            className="permissions"
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <div className="check-icon" onClick={savePermission}>
            <CheckIcon />
          </div>
        </div>
      ) : (
        <></>
      )
    ) : editState ? (
      <div className="edit-elements">
        <input
          type="text"
          defaultValue={placeholder}
          className="permissions"
          onChange={handleChange}
        />
        <div className="check-icon" onClick={savePermission}>
          <CheckIcon />
        </div>
      </div>
    ) : (
      <></>
    )
  ) : (
    <></>
  );
};
export default InlineEdit;
