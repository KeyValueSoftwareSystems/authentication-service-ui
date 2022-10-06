import { FC, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface EditableProps {
  text: string;
  type: string;
  placeholder: string;
  children: any;
  deleteItem:any
  item:any
}
const Editable:FC<EditableProps> = ({ text, type, placeholder, children,deleteItem,item, ...props }) => {
  
  const [isEditing, setEditing] = useState(false);

  
  const handleKeyDown = (event:any, type:any) => {
    
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div>
          <span>{placeholder}</span>
          <div className="icons"><EditIcon sx={{marginRight:"1px"}} onClick={() => setEditing(true)}/><DeleteIcon  onClick={() => {
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

export default Editable;
