import * as React from "react";
import { cn } from "@/lib/utils";
import { IoMdEye } from "react-icons/io";

interface InputProps extends React.ComponentProps<"input"> {
    icon?: React.ReactNode;
    label?: string;
    error?: string;
    helperText?: string;
    tooltip?: string;
    id?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ icon, label, error, helperText, tooltip, className, id, type, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
        const [showPassword, setShowPassword] = React.useState(false);

        const hasPasswordToggle = type === "password";
        const hasIcon = !!icon;

        return (
            <div className="flex flex-col relative">
                {label && (
                    <div className="flex items-center space-x-1 mb-0.5">
                        <label htmlFor={inputId} className="text-sm font-medium text-zinc-300">
                            {label}{props.required && <span className="text-zinc-400">*</span>}
                        </label>
                        {tooltip && (
                            <div className="group relative">
                                <span className="cursor-pointer text-zinc-950 text-xs font-bold border bg-zinc-400 rounded-full w-4 h-4 flex items-center justify-center">
                                    ?
                                </span>
                                <div className="absolute left-1/2 transform -translate-x-1/2 top-6 z-10 hidden group-hover:block bg-neutral-900 text-xs px-3 py-2 rounded shadow-lg">
                                    {tooltip}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div className="relative w-full">
                    <input
                        id={inputId}
                        type={type === "password" && showPassword ? "text" : type}
                        className={cn(
                            "flex h-10 w-full rounded-md border px-3 py-2 text-base " +
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 " +
                            "placeholder:text-zinc-500 focus-visible:ring-0 focus:ring-0 focus:outline-none focus-visible:outline-none " +
                            "disabled:opacity-50 md:text-sm",
                            error
                                ? "border-red-500 focus-visible:border-red-900 focus:border-red-900"
                                : "border-zinc-700 focus-visible:border-zinc-600 focus:border-zinc-600",
                            hasPasswordToggle && hasIcon ? "pr-20" : hasPasswordToggle ? "pr-10" : hasIcon ? "pr-10" : "pr-3",
                            className
                        )}
                        autoComplete={type === "password" ? "current-password" : "off"}
                        ref={ref}
                        aria-invalid={!!error}
                        aria-describedby={
                            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
                        }
                        {...props}
                        required={false}
                        style={{
                            textOverflow: "ellipsis",
                            outline: "none",
                            boxShadow: "none"
                        }}
                    />
                    {type === "password" && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            tabIndex={-1}
                        >
                            {showPassword ? <IoMdEye /> : <IoMdEye />}
                        </button>
                    )}
                    {icon && (
                        <div className={cn(
                            "absolute top-1/2 transform -translate-y-1/2 text-zinc-400",
                            hasPasswordToggle ? "right-12" : "right-3"
                        )}>
                            {icon}
                        </div>
                    )}
                </div>
                {error ? (
                    <p id={`${inputId}-error`} className="mt-1 text-sm text-red-500 break-all">
                        {error}
                    </p>
                ) : helperText ? (
                    <p id={`${inputId}-helper`} className="mt-1 text-sm text-zinc-400 break-all">
                        {helperText}
                    </p>
                ) : null}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };