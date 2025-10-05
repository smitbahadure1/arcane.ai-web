"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
    ImageIcon,
    FileUp,
    Figma,
    MonitorIcon,
    User,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
} from "lucide-react";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px` ;
                return;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px` ;

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px` ;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px` ;
        }
    }, [minHeight]);

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

export function VercelV0Chat() {
    const [value, setValue] = useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 44,
        maxHeight: 120,
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                setValue("");
                adjustHeight(true);
            }
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-sm sm:max-w-md md:max-w-2xl mx-auto p-1.5 sm:p-2 space-y-2 sm:space-y-4">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground text-center px-1 leading-tight">
                What can I help you ship?
            </h1>

            <div className="w-full">
                <div className="relative bg-card border border-border rounded-md sm:rounded-lg">
                    <div className="overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask v0 a question..."
                            className={cn(
                                "w-full px-2.5 py-2 text-sm",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-foreground",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-muted-foreground",
                                "min-h-[40px]"
                            )}
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-1.5 sm:p-2">
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="group p-1 hover:bg-accent rounded transition-colors"
                            >
                                <Paperclip className="w-3 h-3 text-muted-foreground" />
                            </button>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                className="px-1.5 py-0.5 rounded text-xs text-muted-foreground transition-colors border border-dashed border-border hover:border-border hover:bg-accent flex items-center gap-1"
                            >
                                <PlusIcon className="w-3 h-3" />
                            </button>
                            <button
                                type="button"
                                className={cn(
                                    "px-1 py-0.5 rounded text-xs transition-colors border border-border hover:border-border hover:bg-accent flex items-center",
                                    value.trim()
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground"
                                )}
                            >
                                <ArrowUpIcon
                                    className={cn(
                                        "w-3 h-3",
                                        value.trim()
                                            ? "text-primary-foreground"
                                            : "text-muted-foreground"
                                    )}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-1 mt-1.5 sm:mt-2 px-1">
                    <ActionButton
                        icon={<ImageIcon className="w-3 h-3" />}
                        label="Clone"
                    />
                    <ActionButton
                        icon={<Figma className="w-3 h-3" />}
                        label="Figma"
                    />
                    <ActionButton
                        icon={<FileUp className="w-3 h-3" />}
                        label="Upload"
                    />
                    <ActionButton
                        icon={<MonitorIcon className="w-3 h-3" />}
                        label="Landing"
                    />
                    <ActionButton
                        icon={<User className="w-3 h-3" />}
                        label="Sign Up"
                    />
                </div>
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
    return (
        <button
            type="button"
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-card hover:bg-accent rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
        >
            {icon}
            <span className="text-xs sm:text-sm">{label}</span>
        </button>
    );
}
