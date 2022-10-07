import { FC, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

import "./inlineedit.css";
import { useRecoilState } from "recoil";
import { inlineEditAtom } from "../../states/inlineEdit";

interface InlineEditProps {
  placeholder: string;
  api: any;
  id: any;
  bool: boolean;
  action:string
}
const InlineEdit: FC<InlineEditProps> = ({ placeholder, api, id, bool,action }) => {
  const [newvalue, setnewvalue] = useState();
  const [addState, setAddState] = useRecoilState(inlineEditAtom);
  const savePermission = () => {
    api({
      variables: {
        id,
        input: {
          name: newvalue,
        },
      },
    });
    setTimeout(() => {
      window.location.reload();
    }, 100);
    bool = false;
  };
  const handleChange = (event: any) => {
    setnewvalue(event.target.value);
  };
  const handleKeyDown = (event:any) => {
    if (event.key === "Escape") {
      setAddState(false)
    }
  };
  return (
    (bool)?(
      (action==="add")?(
        (addState)?(
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
    </div>):(<></>)
      ):
      (
        <div className="edit-elements">
        <input
          type="text"
          placeholder={placeholder}
          className="permissions"
          onChange={handleChange}
        />
        <div className="check-icon" onClick={savePermission}>
          <CheckIcon />
        </div>
      </div>
      )
    ):(<></>)
  );
};
export default InlineEdit;
