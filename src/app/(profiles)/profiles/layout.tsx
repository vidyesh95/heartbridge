import React from "react";
import HeaderSection from "@/components/dashboard/header-section";

interface Props {
    children: React.ReactNode;
}
export default function Layout({ children }: Props) {
    return (
        <div className={"relative min-h-screen"}>
            {children}
            <HeaderSection/>
        </div>
    )
}