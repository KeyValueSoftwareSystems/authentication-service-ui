import { FC, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import './editablelistitem.css'

interface EditableListItemProps {
  type: string;
  placeholder: string;
  children: any;
  deleteItem:any
  item:any
}
const EditableListItem:FC<EditableListItemProps> = ({ type, placeholder, children,deleteItem,item, ...props }) => {
  
  const [isEditing, setEditing] = useState(false);

  
  const handleKeyDown = (event:any, type:any) => {
    if (event.key === "Escape") {
      setEditing(false)
    }
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div className="permission-edit-delete">
          <span>{placeholder}</span>
          <div className="icons">
            <EditIcon sx={{marginRight:"1px"}} onClick={() => setEditing(true)}/>
            <DeleteIcon  onClick={() => {
                deleteItem({
                  variables: {
                    id: item?.id,
                  },
                });
              }}/>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditableListItem;
