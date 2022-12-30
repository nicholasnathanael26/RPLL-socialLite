import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Dropzone from "react-dropzone";
import axios from "axios";
import swal from "sweetalert";
import { URL_API } from "../utils/constant";

const imageMaxSize = 1000000; //dalam bytes
const acceptedFileTypes ="image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
  return item.trim();
});

function ModalChangeProfile(props) {
  const [imageFile, setImageFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const style = {
    ukuranImage: {
      width: "300px",
      height: "300px",
    },
  };

  const verifyFile = (file) => {
    if (file && file.length > 0) {
      const currentFile = file[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > imageMaxSize) {
        alert("File terlalu besar: " + currentFileSize);
        return false;
      }

      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert("Cuma bisa insert Foto yah");
        return false;
      }
      return true;
    }
  };

  const handleDiscard = () => {
    setImageFile(null);
    setPreviewFile(null);
  };

  const handelOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      verifyFile(rejectedFiles);
    }

    if (files && files.length > 0) {
      const isVerified = verifyFile(files);
      if (isVerified) {
        //image64data
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          "load",
          () => {
            setImageFile(currentFile);
            setPreviewFile(myFileItemReader.result);
            localStorage.setItem("profileImage", myFileItemReader.result);
          },
          false
        );

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };
  let preview;

  if (previewFile !== null) {
    preview = (
      <center>
        <img src={previewFile} alt="preview" style={style.ukuranImage} />
      </center>
    );
  } else {
    preview = (
      <Dropzone
        onDrop={handelOnDrop}
        accept="image/*"
        multiple={false}
        maxSize={imageMaxSize}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <b>
                <p>Click or Drag new image here for New Photo Profile!!!</p>
              </b>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }

  const handleSubmit = () => {
    const id = localStorage.getItem("id");
    var bodyFormData = new FormData();
    bodyFormData.append("file", imageFile);

    axios({
      method: "post",
      url: URL_API + `api/EditPhotoProfile/${id}`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        //handle success
        swal({
          title: "Post",
          text: "Success Change Photo Profile!!! ",
          icon: "success",
          button: false,
          timer: 2500,
        });
      })
      .catch((error) => {
        //handle error
        swal({
          title: "Post",
          text: "Failed Change Photo Profile ",
          icon: "error",
          button: false,
          timer: 2500,
        });
      });
    setImageFile(null);
    setPreviewFile(null);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Photo Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{preview}</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="warning" onClick={handleDiscard}>
          Discard
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default withRouter(ModalChangeProfile);
