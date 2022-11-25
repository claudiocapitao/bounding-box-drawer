import cuid from "cuid";
import React, { useCallback, useState } from "react";
import * as S from './App.styled';
import DragAndDrop from './components/DragAndDrop/DragAndDrop';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';

const App = () => {
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => 
          [
          ...prevState,
          { id: cuid(), src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return (
    <S.Container>
      <S.H1>Image box drawer</S.H1>
      {images?.length > 0 && images.map((image) => {
        return(<DrawingCanvas image={image} />)
      }) }
      <DragAndDrop onDrop={onDrop} accept={"image/*"} />
    </S.Container>
  );
}

export default App;
