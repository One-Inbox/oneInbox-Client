import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUploadFileAction } from "../../redux/actions/actionMessages";
import axios from "axios";
import Spinner from "./spinners/Spinner";

const UploadFiles = () => {
  const cloudName = "dibwxv9d2";
  const cloudPreset = "preset-electricaMosconi";
  const dispatch = useDispatch();

  const [URLfile, setURLfile] = useState("");
  //const [dataFormat, setDataFormat] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Referencia al input

  const uploadedFile = useSelector((state) => state.uploadedFile);

  useEffect(() => {
    // Cuando se limpia el archivo subido desde el estado global
    if (!uploadedFile) {
      setURLfile("");
    }
  }, [uploadedFile]);

  const uploadFilesHandler = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", cloudPreset);
    // const typeFile = file.type;
    // const typeRoute = typeFile === "application/pdf" ? "raw" : "image";
    setLoading(true);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      // `https://api.cloudinary.com/v1_1/${cloudName}/${typeRoute}/upload`,
      data
      // {
      //   params: {
      //     resource_type: typeRoute, // Forzar el tipo de recurso
      //   },
      // }
    );

    setLoading(false);
    setURLfile(response.data.secure_url);
    //setDataFormat(response.data.format);
    dispatch(setUploadFileAction(response.data.secure_url));
    console.log("despacho setUploadFile con data:", response.data.secure_url);
  };

  const deleteFilesHandler = () => {
    setURLfile("");
    dispatch(setUploadFileAction(""));
  };

  // Función para simular el clic en el input de tipo file
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Simula clic en el input file oculto
    }
  };

  return (
    <div>
      {/* Botón para adjuntar archivo */}
      <button
        type="button"
        onClick={handleButtonClick} // Al hacer clic, simula el clic en el input
        className="bg-transparent border-none m-0 p-0"
      >
        <img
          src="/actionIcons/adjuntar.svg"
          alt="Adjuntar archivo"
          className="w-8 h-8 mt-[1.35rem] mr-6 ml-4"
        />
      </button>

      {/* Input oculto para seleccionar archivo */}
      <input
        type="file"
        // accept="image/*,application/pdf" //solo acepta imagenes con cualquier extension y archivos PDF
        accept="image/*" //solo acepta imagenes con cualquier extension
        ref={fileInputRef} // Referencia al input
        onChange={uploadFilesHandler}
        className="hidden"
      />

      {/* Mostrar la imagen subida */}

      {loading ? (
        <div className=" relative -mt-52 -ml-12 w-28 h-auto bg-white rounded-md py-4 px-8">
          <Spinner text={'loading...'}/>
        </div>
      ) : (
        URLfile && (
          <div className="relative -mt-52 -ml-12">
            <button
              onClick={deleteFilesHandler}
              className="absolute top-0 right-0 bg-amber-500 text-xs text-white rounded-full py-1 shadow-2xl hover:bg-red-600 transition-colors z-50"
            >
              X
            </button>
            <img
              // src={dataFormat === "pdf" ? "/public/pdf.svg" : URLfile}
              src={URLfile}
              className="w-28 h-auto rounded-md shadow-lg"
              alt="Imagen subida"
            />
          </div>
        )
      )}
    </div>
  );
};

export default UploadFiles;
