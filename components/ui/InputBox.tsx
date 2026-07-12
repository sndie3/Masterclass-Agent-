import React from "react";

interface InputInterface {
    type: "text" | "number" | "email" | "password" | "tel"
    inputMode?: any
    placeholder?: any
    maxLength?: number
    value?: any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    pattern?: any
    "custom-style"?: string,
    style?: any
    numbersOnly?: boolean;
    decimal?: boolean;


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
    number={true/false}
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
    pattern,
    numbersOnly = false,
    decimal,
    "custom-style": customStyle,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (numbersOnly) {
            if (decimal) {
                // Allow digits and one decimal point
                e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1");
            } else {
                // Integers only
                e.target.value = e.target.value.replace(/\D/g, "");
            }
        }

        onChange?.(e);
    };
    return (
        <>
            <input
                type={type}
                inputMode={decimal ? "decimal" : numbersOnly ? "numeric" : inputMode}
                maxLength={maxLength}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                style={style}
                pattern={numbersOnly ? "[0-9]*" : pattern}
                className={`${customStyle} font-["Calibri_Light",Calibri,sans-serif] text-[clamp(14px,1.5vw,18px)] w-full py-3 px-4 bg-transparent border border-[#333] text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white`}
            />
        </>
    );
};

export default CustomInput;