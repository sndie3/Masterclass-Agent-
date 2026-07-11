import React from "react";

interface InputInterface {
    type: "text" | "number" | "email" | "password";
    inputMode?: any
    placeholder?: any
    maxLength?: number
    value?: any
    onChange?: any
    pattern?: any
    "custom-style"?: string,
    style?: any
}
/**
 * 
 * usage:
 * 
 * @props
 * <CustomInput
 *  type={type}
    inputMode={inputMode}
    maxLength={maxLength}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={style}
    customStyle=""
    />
 */
const CustomInput: React.FC<InputInterface> = ({
    type = "text",
    inputMode,
    placeholder,
    maxLength,
    value,
    onChange,
    style,
    "custom-style": customStyle,
}) => {

    return (
        <>
            <input
                type={type}
                inputMode={inputMode}
                maxLength={maxLength}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={style}
                className={`${customStyle} font-["Calibri_Light",Calibri,sans-serif] text-[clamp(14px,1.5vw,18px)] w-full py-3 px-4 bg-transparent border border-[#333] text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white`}
            />
        </>
    );
};

export default CustomInput;