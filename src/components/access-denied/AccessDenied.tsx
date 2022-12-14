import React from "react";

import "./styles.css";
interface AccessDeniedProps {
  customStyle?: any;
  altMessage: string;
  image: string;
  heading: string;
  description: string;
  imageStyles?: any;
  containerStyles? :any;
}
const AccessDenied: React.FC<AccessDeniedProps> = ({ customStyle, altMessage, image,heading,description,imageStyles,containerStyles }) => {
  return (
    <div className="access-denied" style={containerStyles}>
      <img
        src={image}
        alt={altMessage}
        id="access-denied"
        style={imageStyles}
      />
      <p id="access-denied-heading" style={customStyle}>
        {heading}
      </p>
      <p id="access-denied-description" style={customStyle}>
        {description}
      </p>
    </div>
  );
};
export default AccessDenied;
