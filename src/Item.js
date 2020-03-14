import React, { memo } from "react";

const Item = memo(({ title, num_comments, image }) => {
  return (
    <div className="item">
      {image !== "self" && <img src={image} alt="reddit" />}

      <h3>{title}</h3>
      <p>Comments: {num_comments}</p>
    </div>
  );
});
export default Item;
