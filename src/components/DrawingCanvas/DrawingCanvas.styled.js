import styled from 'styled-components';

export const ContainerLeft = styled.div`
  margin: 16px 0 0;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  border: 1px solid #91AFA1;
  border-radius: 8px;
  box-shadow: 0px 0px 5px 1px #D1E6DC;
`;

export const ContainerRight = styled.div`
  margin: 16px 0 0 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 200px;
  border: 0px solid #91AFA1;
  border-radius: 8px;
  box-shadow: 0px 0px 5px 1px #D1E6DC;
`;

export const CanvasAndImageContainer = styled.div`
   position: relative;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Canvas = styled.canvas`
  position: relative;  
  width: 500px;
  height: 1000px;
 z-index: 2;  
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  z-index: -1;
`;

export const SavedRectsContainer = styled.div`
   position: relative;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  margin: 4px 0;
  width: 150px;
  font-size: 12px;
  color: white;
  padding: 8px 20px;
  border: 0px solid #567265;
  border-radius: 8px;
  background-color: #567265;
`;

export const RectButton = styled.button`
  margin: 4px 0;
  width: 200px;
  font-size: 12px;
  color: black;
  padding: 8px 20px;
  border: unset;
  border-radius: 8px;
  background-color: #D1E6DC;
`;

export const Input = styled.input`
  width: 100%;
  margin: unset;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 400;
  color: black;
  border: 1px solid #567265;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline-style: none;
    border: 1px solid black;
  }
`;

export const Label = styled.label`
  margin: 4px 12px 4px;
  font-size: 14px;
  font-weight: 400;
  color: #567265;
`;

export const InputAndLabelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;


export const InputsContainer = styled.div`
  padding: 4px 48px 4px 16px;
  width: 100%;
  gap: 48px;
  display: flex;  
  justify-content: space-between;
  align-items: flex-end;
`;

export const CanvasAndSelectedRects = styled.div`
  display: flex;
`;

export const Text = styled.p`
  margin: 16px 0 12px;
  font-size: 14px;
  text-align: left;
`;
