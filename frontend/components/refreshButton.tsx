'use client'

import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react"
import useTimeout from "@/hooks/use-timeout";

interface RefreshButtonProps {
    refresh: () => void;
}

export default function RefreshButton({ refresh }: RefreshButtonProps) {
    const [loading, setLoading] = useState(false);
    const { reset } = useTimeout(() => setLoading(false), 3000);

    const handleOnClick = () => {
        refresh();
        setLoading(true);
        reset();
    }
    return (
        <Button disabled={loading} variant="outline" size="icon" onClick={handleOnClick}>
            <RefreshCcw className={`${loading ? "animate-spin" : ""} h-4 w-4`} />
        </Button>
    );
}