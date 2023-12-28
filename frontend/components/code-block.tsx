"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CopyBlock, dracula } from "react-code-blocks"

type CodeBlockProps = {
    title: string;
    code: string;
    className?: string;
}
export default function CodeBlock({ title, code, className, ...props }: CodeBlockProps) {
    return(
        <Card className={`${className} w-full relative`} {...props}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="ml-4">
                <CopyBlock
                    text={code}
                    language={"python"}
                    showLineNumbers
                    theme={dracula}
                /> 
            </CardContent>
        </Card>
    )
}
