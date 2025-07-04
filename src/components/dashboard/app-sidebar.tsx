import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader
} from "@/components/ui/sidebar"
import {Checkbox} from "@/components/ui/checkbox";
import {Slider} from "@/components/ui/slider";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const religions = [
    {
        id: 1,
        religion: "Hindu"
    },
    {
        id: 2,
        religion: "Muslim"
    },
    {
        id: 3,
        religion: "Christian"
    },
    {
        id: 4,
        religion: "Sikh"
    },
    {
        id: 5,
        religion: "Jain"
    },
    {
        id: 6,
        religion: "Buddhist"
    },
    {
        id: 7,
        religion: "Zoroastrian"
    },
    {
        id: 8,
        religion: "Judaism"
    },
    {
        id: 9,
        religion: "Donyi-Polo"
    },
    {
        id: 10,
        religion: "Atheism"
    },
    {
        id: 11,
        religion: "Sarna"
    },
    {
        id: 12,
        religion: "Gondi"
    },
    {
        id: 13,
        religion: "Baháʼí Faith"
    },
    {
        id: 14,
        religion: "Other"
    }
]

const education = [
    {
        id: 1,
        education: "High School"
    },
    {
        id: 2,
        education: "Bachelor's"
    },
    {
        id: 3,
        education: "Master's"
    },
    {
        id: 4,
        education: "PhD"
    },
    {
        id: 5,
        education: "Diploma"
    },
    {
        id: 6,
        education: "Graduate"
    },
    {
        id: 7,
        education: "Post Graduate"
    },
    {
        id: 8,
        education: "Doctorate"
    },
    {
        id: 9,
        education: "Other"
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <h4 className={"text-2xl font-semibold text-primary"}>Filters</h4>
                <Button variant={"destructive"} className={"w-full text-center"}>Reset</Button>
                <Button className={"w-full text-center"}>Apply Filter</Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Age range</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Slider defaultValue={[23, 30]} min={18} max={118} step={1}/>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Salary range</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Slider defaultValue={[600000, 1200000]} min={0} max={100000000} step={1}/>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Height range</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Slider defaultValue={[5,7]} min={0} max={20} step={1}/>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Religion</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Checkbox/>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Location</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Input type={"text"} placeholder={"Enter City"}/>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Education</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Checkbox/>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button variant={"destructive"} className={"w-full text-center"}>Reset</Button>
                <Button className={"w-full text-center"}>Apply Filter</Button>
            </SidebarFooter>
        </Sidebar>
    )
}