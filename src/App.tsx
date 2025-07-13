import { useState } from "react";

function App() {
    const [color, setColor] = useState<{
        rgb: string;
        hex: string;
        hsl: string;
        hwb: string;
        color: string;
    }>({
        rgb: "rgb(255 255 255)",
        hex: "#ffffff",
        hsl: "hsl(0 0% 100%)",
        hwb: "hwb(0 100.0% 0.0%)",
        color: "color(srgb 1 1 1)"
    });

    const hex2rgb = (hex: string): string => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        return `rgb(${r}, ${g}, ${b})`;
    };

    const hex2hsl = (hex: string): string => {
        hex = hex.replace("#", "");

        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((c) => c + c)
                .join("");
        }

        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0,
            s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return `hsl(${Math.round(h * 360)}, ${Math.round(
            s * 100
        )}%, ${Math.round(l * 100)}%)`;
    };

    const hex2hwb = (hex: string): string => {
        hex = hex.replace("#", "");

        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((c) => c + c)
                .join("");
        }

        const r = parseInt(hex.slice(0, 2), 16) / 255;
        const g = parseInt(hex.slice(2, 4), 16) / 255;
        const b = parseInt(hex.slice(4, 6), 16) / 255;

        const w = Math.min(r, g, b);
        const b2 = 1 - Math.max(r, g, b);

        let h = 0;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;

        if (d === 0) {
            h = 0;
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h *= 60;
        }

        return `hwb(${Math.round(h)}, ${Math.round(w * 100)}%, ${Math.round(
            b2 * 100
        )}%)`;
    };

    const hex2color = (hex: string): string => {
        hex = hex.replace("#", "");

        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((c) => c + c)
                .join("");
        }

        const r = parseInt(hex.slice(0, 2), 16) / 255;
        const g = parseInt(hex.slice(2, 4), 16) / 255;
        const b = parseInt(hex.slice(4, 6), 16) / 255;

        const round = (num: number) => Math.round(num * 1000) / 1000;

        return `color(srgb ${round(r)} ${round(g)} ${round(b)})`;
    };

    const handleSetColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hex = e.target.value;
        const rgb = hex2rgb(hex);
        const hsl = hex2hsl(hex);
        const hwb = hex2hwb(hex);
        const color = hex2color(hex);

        setColor({
            rgb: rgb,
            hex: hex,
            hsl: hsl,
            hwb: hwb,
            color: color
        });
    };

    return (
        <div
            className="min-h-dvh flex justify-center items-center"
            style={{ background: color.hex }}
        >
            <div className="w-[410px] h-[280px] shadow-[3px_3px_10px_rgba(0,0,0,0.2)] bg-[#ffffff] rounded-[5px] p-[16px]">
                <p className="text-center">Current color values:</p>
                <table>
                    <tbody>
                        <tr>
                            <td className="bg-[#ededed] p-[5px_15px]">RGB</td>
                            <td className="bg-[#dedede] w-full p-[5px_15px]">
                                {color.rgb}
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-[#ededed] p-[5px_15px]">HEX</td>
                            <td className="bg-[#dedede] w-full p-[5px_15px]">
                                {color.hex}
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-[#ededed] p-[5px_15px]">HSL</td>
                            <td className="bg-[#dedede] w-full p-[5px_15px]">
                                {color.hsl}
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-[#ededed] p-[5px_15px]">HWB</td>
                            <td className="bg-[#dedede] w-full p-[5px_15px]">
                                {color.hwb}
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-[#ededed] p-[5px_15px]">
                                color()
                            </td>
                            <td className="bg-[#dedede] w-full p-[5px_15px]">
                                {color.color}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <label className="flex items-center gap-[10px] mt-[20px]">
                    Select a color:
                    <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => {
                            handleSetColor(e);
                        }}
                    />
                </label>
            </div>
        </div>
    );
}

export default App;
