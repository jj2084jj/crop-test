"use client";

import ImageCropModal from "@/components/modal/crop.modal";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
const cropImg = [
  {
    title: "이미지소스",
    src: "/image/crop.jpeg",
  },
  {
    title: "이미지소스",
    src: "/image/crop02.jpeg",
  },
];
export default function Home() {
  const [imageCropState, setImageCropState]: any = useState({
    src: "",
    file: null,
    active: false,
  });

  // 이미지 띄우기 ------------------------------
  function handleFileOnChange(event: any) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0] as any;

    console.log(file, reader);

    reader.onloadend = () => {
      setImageCropState({
        active: true,
        file: file,
        src: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  const [select, setSelect] = useState("");

  return (
    <>
      {/* crop modal -------------------------------------------- */}
      {imageCropState.active && (
        <ImageCropModal
          src={imageCropState}
          setImageCropState={setImageCropState}
        />
      )}
      <div className="h-screen m-auto py-10">
        <section>
          <div className="flex justify-center gap-4 cursor-pointer">
            {cropImg.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative"
                  onClick={() => {
                    if (select === item.src) setSelect("");
                    else setSelect(item.src);
                  }}
                >
                  {select === item.src && (
                    <div className="absolute z-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                      <FaCheck size={50} />
                    </div>
                  )}

                  <Image src={item.src} alt="" width={300} height={300} />
                </div>
              );
            })}
          </div>
        </section>
        <input
          type="file"
          accept="image/jpeg"
          onChange={(e) => {
            if (e.target.files) handleFileOnChange(e);
          }}
        />
        <button
          className="text-white py-3 border-2 bg-blue-300 block m-auto mt-4 px-10"
          onClick={() => {
            console.log("ww");
          }}
        >
          자르기
        </button>
      </div>
    </>
  );
}
