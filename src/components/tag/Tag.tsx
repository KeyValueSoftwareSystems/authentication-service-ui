import { FC } from "react";
import { TagProps } from "./types";

const Tag:FC<TagProps>=({text})=>{
return(
<span className="groupsvalue">
          {text}
        </span>
)
}
export default Tag;