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

    const handleOnClick = () => {
        refresh();
        setLoading(true);
        useTimeout(() => setLoading(false), 1000);
    }
    return (
        <Button className={`${loading ? "animate-pulse" : ""}`} variant="outline" size="icon" onClick={refresh}>
            <RefreshCcw className="h-4 w-4" />
        </Button>
    );
}