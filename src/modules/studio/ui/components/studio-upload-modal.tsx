"use client";
import { trpc } from "@/app/trpc/client";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon, CheckIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import { toast } from "sonner";

export const StudioUploadModal = () => {
    const [showTick, setShowTick] = useState(false)

    const utils = trpc.useUtils();
    const create = trpc.videos.create.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate();
            setShowTick(true)

            // Hide the tick mark after 2 seconds
            setTimeout(() => {
                setShowTick(false)
            }, 2000)
        },
        onError: (error) => {
            console.error(`Error while creating video: ${error.message}`);
            toast.error("Failed to create video");
        }
    });
    return (
        <Button variant="secondary" onClick={() => create.mutate()} disabled={create.isPending} className="relative">
            <AnimatePresence mode="wait">
                {create.isPending ? (
                    <Loader2Icon className="animate-spin" />
                ) : showTick ? (
                    <motion.div
                        key="tick"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                    >
                        <CheckIcon className="size-5" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="plus"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                    >
                        <PlusIcon />
                    </motion.div>
                )}
            </AnimatePresence>
            <span className="ml-2">Create</span>
        </Button>
    );
}