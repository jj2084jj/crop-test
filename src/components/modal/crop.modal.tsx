import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";

import style from "./crop.module.css";

export default function ImageCropModal({ src, setImageCropState }: any) {
  const [output, setOutput] = useState(null);
  const [completedCrop, setCompletedCrop] = useState<any>();
  const [crop, setCrop] = useState<Crop>({
    unit: "%", // Can be 'px' or '%',
    width: 100,
    height: 100,

    x: 25,
    y: 25,
  });

  function onImageLoad(e: any) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
        },
        1,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  }

  return (
    <div className={style.modal}>
      <div className={style.modal_body}>
        <ReactCrop
          crop={crop}
          onChange={setCrop}
          onComplete={(c) => setCompletedCrop(c)}
        >
          <Image
            src={src.src}
            alt="dd"
            onLoad={onImageLoad}
            width={500}
            height={500}
          />
        </ReactCrop>
        <button
          onClick={() => {
            console.log(src, crop);
          }}
        >
          자르기 완료
        </button>
      </div>
      <div
        className={style.modal_bg}
        onClick={() => setImageCropState({ active: false, src: "" })}
      ></div>
    </div>
  );
}
