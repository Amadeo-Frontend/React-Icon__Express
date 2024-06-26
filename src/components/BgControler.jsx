import { Slider } from "@/components/ui/slider";
import { useEffect, useState, useContext } from "react";
import ColorPickerController from "./ColorPickerController";
import { UpdateStorageContext } from "./context/UpdateStorageContext";

const BgControler = () => {
  const storageValue = JSON.parse(localStorage.getItem("value"));
  const [rounded, setRounded] = useState(
    storageValue ? storageValue?.bgRounded : 0
  );
  const [padding, setPadding] = useState(
    storageValue ? storageValue?.bgPadding : 0
  );
  const [color, setColor] = useState(
    storageValue ? storageValue?.bgColor : "#000"
  );
  const { updateValue, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const updateValue = {
      ...storageValue,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: color,
    };
    setUpdateStorage(updateValue);
    localStorage.setItem("value", JSON.stringify(updateValue));
  });

  return (
    <div>
      <div className="py-2">
        <label className="flex items-center justify-between p-2">
          Rounded<span>{rounded} px</span>{" "}
        </label>
        <Slider
          defaultValue={[0]}
          max={512}
          step={1}
          onValueChange={(event) => setRounded(event[0])}
        />
      </div>
      <div className="py-2">
        <label className="flex items-center justify-between p-2">
          Padding<span>{padding} px</span>{" "}
        </label>
        <Slider
          defaultValue={[40]}
          max={100}
          step={1}
          onValueChange={(event) => setPadding(event[0])}
        />
      </div>
      <div className="py-2">
        <label className="p-2">Cor do Fundo</label>
        <ColorPickerController
          hideControler={false}
          selectedColor={(color) => setColor(color)}
        />
      </div>
    </div>
  );
};

export default BgControler;
