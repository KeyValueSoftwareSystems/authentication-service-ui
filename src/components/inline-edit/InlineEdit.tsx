import { FC, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useRecoilState } from "recoil";

import "./inlineedit.css";
import { inlineAddAtom, inlineEditAtom } from "../../states/inlineEdit";

interface InlineEditProps {
  placeholder: string;
  api: any;
  id: any;
}
const InlineEdit: FC<InlineEditProps> = ({ placeholder, api, id }) => {
  const [newvalue, setnewvalue] = useState();
  const [addState, setAddState] = useRecoilState(inlineAddAtom);
  const [editState, setEditState] = useRecoilState(inlineEditAtom);
  const saveAddPermission = () => {
    api({
      variables: {
        id,
        input: {
          name: newvalue,
        },
      },
    });
    setAddState(false);
  };
  const saveEditPermission = () => {
    api({
      variables: {
        id,
        input: {
          name: newvalue,
        },
      },
    });
    setEditState(false);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 100);
  };
  const handleChange = (event: any) => {
    setnewvalue(event.target.value);
  };
  const handleKeyDown = (event: any) => {
    if (event.key === "Escape") {
      setAddState(false);
    }
  };
  return  (
    addState ? (
      <div className="edit-elements">
        <input
          type="text"
          placeholder={placeholder}
          className="permissions"
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <div className="check-icon" onClick={saveAddPermission}>
          <CheckIcon />
        </div>
      </div>
    ) 
  : (editState ? (
    <div className="edit-elements">
      <input
        type="text"
        defaultValue={placeholder}
        className="permissions"
        onChange={handleChange}
      />
      <div className="check-icon" onClick={saveEditPermission}>
        <CheckIcon />
      </div>
    </div>
  ) : (
    <></>
  ))
  )
};
export default InlineEdit;
