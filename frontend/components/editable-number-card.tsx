"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { EditableNumberCardItem } from "@/types/number-card";
import { useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function EditableNumberCard({ number, title, description, min, max, className, ...props } : EditableNumberCardItem) {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(number)
    return (
        <Card className={`${className} ${!isEditing ? "cursor-pointer" : ""} w-full relative`} onClick={() => {if(!isEditing) {setIsEditing(!isEditing)}}}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>

                {isEditing && <X className="h-5 w-5 absolute right-4 top-4 cursor-pointer" onClick={() => {setIsEditing(!isEditing)}}/>}
            </CardHeader>
            <CardContent>
                {isEditing && 
                    <div className="flex flex-row justify-around">
                    <Input 
                        className="w-8/12" 
                        type="number" 
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        min={min}
                        max={max}
                    />
                    <Button 
                        className="w-3/12" 
                        variant="secondary" 
                        size="icon"
                        disabled={value < min || value > 10}
                        onClick={() => {
                            setIsEditing(!isEditing)
                        }}> 
                        Enter
                    </Button>
                    </div>
                }
                {!isEditing && 
                    <p className="font-extrabold text-5xl">{value}</p>
                }
            </CardContent>
        </Card>
    );
}