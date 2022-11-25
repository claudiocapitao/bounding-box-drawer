import React, {useState, useEffect, useRef, useMemo } from 'react';
import * as S from './DrawingCanvas.styled';
import cuid from "cuid";

const DrawingCanvas = (image) => {
  // Get image dimensions
  const [imageOriginalSize, setImageOriginalSize] = useState();
  const canvasHeight = useMemo(() => imageOriginalSize?.height ? imageOriginalSize?.height*500/imageOriginalSize?.width : 0, [imageOriginalSize]);
  console.log('canvasHeight: ', canvasHeight); 
  useEffect(() => {
    const img = new Image();
    img.onload = function () {
      setImageOriginalSize({width: this.width, height: this.height})
    }
    img.src = image.image.src;
  }, []);

  // States
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const createdRect = useRef(
    {
      id: '',
      x: undefined,
      y: undefined,
      width: undefined,
      height: undefined,
    }
  );
  const [typeManipulatedRect, setTypeManipulatedRect] = useState(
    {
      id: '',
      x: undefined,
      y: undefined,
      width: undefined,
      height: undefined,
    }
  );
  const [savedRects, setSavedRects] = useState([]);
  const [modifySavedRect, setModifySavedRect] = useState(
    {
      id: '',
      x: undefined,
      y: undefined,
      width: undefined,
      height: undefined,
    }
  );
  
  // Funtion to show the saved boxes in the canvas
  const showSavedRects = () => {
    if(savedRects.length > 0){
      savedRects.map(rect => {
        if(modifySavedRect?.id && rect.id === modifySavedRect.id){
          return;
        }
        contextRef.current.strokeStyle = 'blue';
        contextRef.current.strokeRect(
        rect.x, 
        rect.y, 
        rect.width, 
        rect.height);
      })
    }
    return;
  };

  // Canvas initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    /* canvasRef.width = 500;
    canvasRef.height = 1000; */
    const context = canvas.getContext('2d')
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    contextRef.current = context;
  }, []);

  // When one saved box is selected
  useEffect(() => {
    contextRef.current.clearRect(0, 0, 500, canvasHeight);
    showSavedRects();
    contextRef.current.strokeStyle = 'red';
    contextRef.current.strokeRect(
      typeManipulatedRect.x, 
      typeManipulatedRect.y, 
      typeManipulatedRect.width, 
      typeManipulatedRect.height);
    }, [typeManipulatedRect])

    //Drawing - START
    const startDrawing = ({nativeEvent}) => {  
      setModifySavedRect(
          {
            id: '',
            x: undefined,
            y: undefined,
            width: undefined,
            height: undefined,
          }
        );
      contextRef.current.strokeStyle = 'black';
    createdRect.current =  {
        id: '',
        x: undefined,
        y: undefined,
        width: undefined,
        height: undefined,
      }  
    const {offsetX, offsetY} = nativeEvent;
    createdRect.current = {
      ...createdRect.current,
      x: offsetX,
      y: offsetY
    }
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  //Drawing - While Drawing
  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return;
    };
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.clearRect(0, 0, 500, canvasHeight);
    showSavedRects();
    const width = offsetX - createdRect.current.x;
    const height = offsetY - createdRect.current.y;
    const id =  `id-${createdRect.current.x}-${createdRect.current.y}-${width}-${height}`;
    createdRect.current = {
      ...createdRect.current,
      id,
      width,
      height,
    }
    contextRef.current.strokeRect(
      createdRect.current.x,
      createdRect.current.y,
      createdRect.current.width,
      createdRect.current.height,
    );
    nativeEvent.preventDefault();
  };

  //Drawing - END
  const stopDrawing = (nativeEvent) => {
    contextRef.current.closePath();
    setIsDrawing(false);
    if(!modifySavedRect?.id){
      setTypeManipulatedRect(createdRect.current)
    }
  };

  return(
    <S.CanvasAndSelectedRects>
    <S.ContainerLeft>
    <S.CanvasAndImageContainer>
        <canvas
          className='container'
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          width="500"
          height={`${canvasHeight}`}
          >
        </canvas>

    <S.Image
      alt={`img - ${image.image.id}`}
      src={image.image.src}
      className="file-img"
    /> 
    </S.CanvasAndImageContainer>

    <S.InputsContainer>
      <S.InputAndLabelContainer>
        <S.Label>{'X'}</S.Label>
        <S.Input 
          type='number' 
          value={typeManipulatedRect.x} 
          onChange={(e) => setTypeManipulatedRect({...typeManipulatedRect, x: e.target.value})}
        />
      </S.InputAndLabelContainer>

      <S.InputAndLabelContainer>
        <S.Label>{'Y'}</S.Label>
        <S.Input 
          type='number' 
          value={typeManipulatedRect.y} 
          onChange={(e) => setTypeManipulatedRect({...typeManipulatedRect, y: e.target.value})}
        />
      </S.InputAndLabelContainer>

      <S.Button
        onClick={() => {
          createdRect.current =  {
              id: '',
              x: undefined,
              y: undefined,
              width: undefined,
              height: undefined,
            }  
          if(modifySavedRect?.id){
          const indexOfSelectedToBeModified = savedRects.findIndex(rect => rect.id === modifySavedRect.id);
          const copySavedRects = savedRects;
          const deletedScores = copySavedRects.splice(indexOfSelectedToBeModified, 1, typeManipulatedRect);
          setSavedRects(copySavedRects);
          showSavedRects();
          } else {
            setSavedRects(
            [...savedRects, typeManipulatedRect]
          );}
        }}
      >Save</S.Button>
    </S.InputsContainer>

    <S.InputsContainer>
      <S.InputAndLabelContainer>
        <S.Label>{'Width'}</S.Label>
        <S.Input 
          type='number' 
          value={typeManipulatedRect.width} 
          onChange={(e) => setTypeManipulatedRect({...typeManipulatedRect, width: e.target.value})}
        />
      </S.InputAndLabelContainer>

      <S.InputAndLabelContainer>
        <S.Label>{'Height'}</S.Label>
        <S.Input 
          type='number' 
          value={typeManipulatedRect.height} 
          onChange={(e) => setTypeManipulatedRect({...typeManipulatedRect, height: e.target.value})}
        />
      </S.InputAndLabelContainer>

      <S.Button
        onClick={() => {
          createdRect.current =
            {
              id: '',
              x: undefined,
              y: undefined,
              width: undefined,
              height: undefined,
            };
          const indexOfSelectedToBeModified = savedRects.findIndex(rect => rect.id === modifySavedRect.id);
          const copySavedRects = savedRects;
          const deletedScores = copySavedRects.splice(indexOfSelectedToBeModified, 1);
          setModifySavedRect(
            {
              id: '',
              x: undefined,
              y: undefined,
              width: undefined,
              height: undefined,
            }
          );
          setSavedRects(copySavedRects);
          contextRef.current.clearRect(0, 0, 500, canvasHeight);
          showSavedRects();
        }}
      >Delete</S.Button>
    </S.InputsContainer>
    </S.ContainerLeft>

    <S.ContainerRight>
      <S.Text>Saved images: </S.Text>
      <S.SavedRectsContainer>
          {savedRects.map(rect => <S.RectButton onClick={() => {setModifySavedRect(rect); setTypeManipulatedRect(rect);}}>{rect.id}</S.RectButton>)}
      </S.SavedRectsContainer>
    </S.ContainerRight>
    </S.CanvasAndSelectedRects>
  )
};

export default DrawingCanvas;