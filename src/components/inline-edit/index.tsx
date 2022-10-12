import React, { useState, useRef, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

import "./styles.css";

type InlineEditProps = {
  value?: string;
  id?: string;
  onSave: (value: string | undefined, id: string | undefined) => void;
  onDeletePermission: (id: string | undefined) => void;
  isAdd: boolean;
};

const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  id,
  onSave,
  onDeletePermission,
  isAdd,
}) => {
  const inputElement = useRef<any>(null);
  const [editingValue, setEditingValue] = useState<string | undefined>(value);
  const [isDisabled, setIsDisabled] = useState(!isAdd);

  useEffect(() => {
    setEditingValue(value);
  }, [value]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEditingValue(event.target.value);

  const onKeyDown = (event: any) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };

  const onBlur = (event: any) => {
    setIsDisabled(true);
    setEditingValue(value);
  };

  const onSavePermissionEdit = (e: any) => {
    e.preventDefault();
    onSave(editingValue, id);
    setIsDisabled(true);
  };

  const onDelete = () => {
    onDeletePermission(id);
  };

  const onEdit = () => {
    setIsDisabled(false);
    setTimeout(() => inputElement.current.focus(), 0);
  }

  return (
    <div className="editableText">
      <input
        type="text"
        aria-label="Field name"
        value={editingValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={`inputChip  ${isDisabled && "disabledStyles"}`}
        disabled={isDisabled}
        autoFocus={isAdd}
        ref={inputElement}
      />

      <span className="iconSpacing">
        <EditIcon
          sx={{ marginRight: "1px" }}
          onClick={onEdit}
          className={`${!isDisabled && "editIcon"}`}
        />
        {!isDisabled ? (
          <DoneIcon className="saveIcon" onMouseDown={onSavePermissionEdit} />
        ) : (
          <DeleteIcon onClick={onDelete} />
        )}
      </span>
    </div>
  );
};

export default InlineEdit;
