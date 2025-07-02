import React from "react";
import HeaderSection from "@/components/home/header-section";
import FooterSection from "@/components/home/footer-section";

interface Props {
    children: React.ReactNode;
}
export default function Layout({ children }: Props) {
    return (
        <div className={"relative min-h-screen"}>
            {children}
            <HeaderSection/>
            <FooterSection/>
        </div>
    )
}
