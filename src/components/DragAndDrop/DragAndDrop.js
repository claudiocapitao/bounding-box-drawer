import React from "react";
import { useDropzone } from "react-dropzone";
import * as S from './DragAndDrop.styled';

function Dropzone({ onDrop, accept, open }) {
  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept,
      onDrop,
    });

  return (
    <S.Section>
      <S.Container {...getRootProps()}>
        <input {...getInputProps()} />
        <S.Image src={require('../../assets/images/drop.svg').default} />
        {isDragActive ? (
          <S.Text>
            Release to drop the Image here
          </S.Text>
        ) : (
          <S.Text>
             Drop Images here, or click to select
          </S.Text>
        )}
        <S.Button type="button" onClick={open}>
          Select Images
        </S.Button>
      </S.Container>
    </S.Section>
  );
}
export default Dropzone;