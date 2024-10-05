import React, { useState } from "react";
import axios from "axios";

const FingerprintCapture = () => {
  const [img, setImage] = useState(null);

  const uri = "http://localhost:8004/mfs100/"; // Non-Secure

  // console.log("FingerprintCapture", img);
  // console.log("FingerprintCapture", img1);

  // const GetMFS100Info = async () => {
  //   return GetMFS100Client("info");
  // };

  // const GetMFS100KeyInfo = async (key) => {
  //   console.log("this is key", key);
  //   const MFS100Request = {
  //     Key: key,
  //   };
  //   const jsondata = JSON.stringify(MFS100Request);
  //   return PostMFS100Client("keyinfo", jsondata);
  // };

  // const CaptureMultiFinger = async (quality, timeout, nooffinger) => {
  //   const MFS100Request = {
  //     Quality: quality,
  //     TimeOut: timeout,
  //     NoOfFinger: nooffinger,
  //   };
  //   const jsondata = JSON.stringify(MFS100Request);
  //   return PostMFS100Client("capturewithdeduplicate", jsondata);
  // };

  // const VerifyFinger = async (ProbFMR, GalleryFMR) => {
  //   const MFS100Request = {
  //     ProbTemplate: ProbFMR,
  //     GalleryTemplate: GalleryFMR,
  //     BioType: "FMR", // you can pass here BioType as "ANSI" if you are using ANSI Template
  //   };
  //   const jsondata = JSON.stringify(MFS100Request);
  //   return PostMFS100Client("verify", jsondata);
  // };

  // const MatchFinger = async (quality, timeout, GalleryFMR) => {
  //   const MFS100Request = {
  //     Quality: quality,
  //     TimeOut: timeout,
  //     GalleryTemplate: GalleryFMR,
  //     BioType: "FMR", // you can pass here BioType as "ANSI" if you are using ANSI Template
  //   };
  //   const jsondata = JSON.stringify(MFS100Request);
  //   return PostMFS100Client("match", jsondata);
  // };

  // const GetPidData = async (BiometricArray) => {
  //   const req = new MFS100Request(BiometricArray);
  //   const jsondata = JSON.stringify(req);
  //   return PostMFS100Client("getpiddata", jsondata);
  // };

  // const GetRbdData = async (BiometricArray) => {
  //   const req = new MFS100Request(BiometricArray);
  //   const jsondata = JSON.stringify(req);
  //   return PostMFS100Client("getrbddata", jsondata);
  // };

  const CaptureFinger = async (quality, timeout) => {
    const MFS100Request = {
      Quality: quality,
      TimeOut: timeout,
    };
    const jsondata = JSON.stringify(MFS100Request);

    const res = await PostMFS100Client("capture", jsondata);
    // console.log(res.data);
    return res.data;
  };

  const PostMFS100Client = async (method, jsonData) => {
    try {
      const response = await axios.post(uri + method, jsonData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      let sring = "data:image/png;base64," + response.data.BitmapData;

      setImage(sring);
      return { httpStaus: true, data: response.data };
    } catch (error) {
      console.error("HTTP Error:", error);
      return { httpStaus: false, err: getHttpError(error) };
    }
  };

  // const GetMFS100Client = async (method) => {
  //   try {
  //     const response = await axios.get(uri + method, {
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //       },
  //     });
  //     return { httpStaus: true, data: response.data };
  //   } catch (error) {
  //     console.error("HTTP Error:", error);
  //     return { httpStaus: false, err: getHttpError(error) };
  //   }
  // };

  const getHttpError = (error) => {
    let err = "Unhandled Exception";
    if (!error.response) {
      err = "Service Unavailable";
    } else if (error.response.status === 404) {
      err = "Requested page not found";
    } else if (error.response.status === 500) {
      err = "Internal Server Error";
    } else if (error.message === "Network Error") {
      err = "Network error";
    } else if (error.code === "ECONNABORTED") {
      err = "Time out error";
    } else {
      err = "Unhandled Error";
    }
    return err;
  };

  // Classes
  // function Biometric(BioType, BiometricData, Pos, Nfiq, Na) {
  //   this.BioType = BioType;
  //   this.BiometricData = BiometricData;
  //   this.Pos = Pos;
  //   this.Nfiq = Nfiq;
  //   this.Na = Na;
  // }

  // function MFS100Request(BiometricArray) {
  //   this.Biometrics = BiometricArray;
  // }

  return (
    <div className="page-content">
      <div>
        <label htmlFor="btnCapture">Capture Fingerprint</label>
      </div>
      <input
        id="btnCapture"
        type="submit"
        value="Capture Finger"
        onClick={() => CaptureFinger(60, 10000)}
      />

      {img && <img src={img} alt="Fingerprint" />}
    </div>
  );
};

export default FingerprintCapture;
