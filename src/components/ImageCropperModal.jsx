import React from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import Dialog from "@mui/material/Dialog";
import getCroppedImg from "./utils/cropImage"; // Adjust the import path as necessary


// Cropper Modal Component
const ImageCropperModal = ({ open, imageSrc, onClose, onCropComplete, aspect = 2.5 }) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

  // eslint-disable-next-line no-undef
  const handleCropComplete = React.useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDone = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <div className="p-4 bg-white">
        <div className="relative w-[400px] h-[160px] bg-gray-200">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="flex items-center mt-4">
          <span className="mr-2">Zoom</span>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_, value) => setZoom(value)}
            style={{ width: 200 }}
          />
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleDone} className="px-4 py-2 bg-blue-500 text-white rounded">Crop</button>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageCropperModal;