import { Button, Icon, Grid, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import ButtonFinish from '../../../components/commons/NewButton';

export const CustomButtonPreview = styled(Button)`
  &&& {
    background-color: #fff;
    border-color: #fff;
    width: 28px;
    height: 35px;
    border-radius: 50%;
    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

export const AddResourcesText = styled.span`
  color: #333a3f;
  font-size: 24px;
  margin-left: 10px;
  position: relative;
  font-family: 'Lato', sans-serif;
  top: 3px;
`;

export const TextParagraphTop = styled.p`
  color: rgba(51, 58, 63, 0.7);
  font-size: 14px;
  padding-top: 13px;
`;

export const RoomImgTwo = styled.img`
  padding: 7px;
  border-radius: 13px;
  opacity: 0.3;
  width: 130px;
  height: 130px;
  filter: alpha(opacity=50);
  position: relative;
  right: 5px;
`;

export const RoomImgOne = styled.img`
  border-radius: 10px;
  width: 130px;
  height: 130px;
  opacity: 0.4;
  filter: alpha(opacity=50);
`;

export const centerImageText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const centerImageTextWhiteUp = styled.p`
  font-weight: bold;
  font-size: 20px;
  position: relative;
  color: black;
  top: 20px;
`;

export const centerImageTextWhiteDown = styled.p`
  font-weight: bold;
  font-size: 12px;
  padding-bottom: 30px;
`;

export const centerImageTextTwo = styled.p`
  font-weight: bold;
  font-size: 20px;
  position: relative;
  top: 20px;
  color: black;
`;

export const centerImageTextTwoDown = styled.p`
  font-weight: bold;
  font-size: 12px;
  padding-bottom: 15px;
  color: black;
`;

export const GridContainer = styled(Grid)`
  position: relative;
  text-align: center;
  color: white;
  top: 20px;
`;

export const TextParagraphTwo = styled.div`
  padding-top: 30px;
  color: rgba(51, 58, 63, 0.7);
  font-size: 14px;
`;

export const ButtonInputResources = styled(Button)`
  &&& {
    border: 1px dashed #dfe3e8 !important;
    background: #fff !important;
    margin-top: 20px;
  }
`;

export const IconBtn = styled(Icon)`
  &&& {
    padding-left: 20px;
    color: #bdbdbd;
    font-size: 20px !important;
    position: relative;
    top: 3px;
  }
`;

export const BtnFinish = styled(ButtonFinish)`
  &&& {
    background-color: #10a36d;
    color: #fff;
    height: 44px;
    width: 107px;
    border-radius: 6px;
    margin-left: 90% !important;
    line-height: 20px;
    margin-top: 90px;
  }
`;

export const IconLeft = styled(Icon)`
  &&& {
    color: blue;
    font-size: 20px;
  }
`;

export const InputResource = styled(Input)`
  &&& {
    margin-bottom: 10px;
  }
`;
