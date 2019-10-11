import React from 'react';
import * as styled from './customStyles';


const AddResourcesTitle = () => (
  <div>
    <styled.CustomButtonPreview>
      <styled.IconLeft name="angle left" fitted />
    </styled.CustomButtonPreview>
    <styled.AddResourcesText className="text-resources">
      Add Resources
    </styled.AddResourcesText>
    <styled.TextParagraphTop>
      Set the structure of your Center
    </styled.TextParagraphTop>
  </div>
);


export default AddResourcesTitle;
