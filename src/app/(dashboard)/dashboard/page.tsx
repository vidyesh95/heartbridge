import Image from "next/image";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Bookmark, Eye, Heart} from "lucide-react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/dashboard/app-sidebar";

const profiles = [
    {
        id: 1,
        imageUrl: "/profile1.avif",
        name: "Karan Kapoor",
        age: "29",
        height: "6'1\"",
        location: "Dehradun",
        annualIncome: "₹680,000",
        religion: "Hindu",
        education: "Diploma",
        profession: "Software Engineer"
    },
    {
        id: 2,
        imageUrl: "/profile2.avif",
        name: "Rahul Verma",
        age: "28",
        height: "5'8\"",
        location: "Delhi",
        annualIncome: "₹550,000",
        religion: "Hindu",
        education: "B.Tech",
        profession: "Accountant"
    },
    {
        id: 3,
        imageUrl: "/profile3.avif",
        name: "Ananya Singh",
        age: "25",
        height: "5'5\"",
        location: "Bangalore",
        annualIncome: "₹450,000",
        religion: "Muslim",
        education: "MCA",
        profession: "Data Analyst"
    },
    {
        id: 4,
        imageUrl: "/profile4.avif",
        name: "Vikram Patel",
        age: "30",
        height: "6'0\"",
        location: "Chennai",
        annualIncome: "₹650,000",
        religion: "Sikh",
        education: "B.Com",
        profession: "Sales Manager"
    },
    {
        id: 5,
        imageUrl: "/profile5.avif",
        name: "Neha Gupta",
        age: "27",
        height: "5'6\"",
        location: "Kolkata",
        annualIncome: "₹700,000",
        religion: "Christian",
        education: "M.Sc",
        profession: "Researcher"
    },
    {
        id: 6,
        imageUrl: "/profile6.avif",
        name: "Rohit Kumar",
        age: "29",
        height: "5'9\"",
        location: "Hyderabad",
        annualIncome: "₹480,000",
        religion: "Hindu",
        education: "BBA",
        profession: "Consultant"
    },
    {
        id: 7,
        imageUrl: "/profile7.avif",
        name: "Sanya Mehta",
        age: "24",
        height: "5'3\"",
        location: "Pune",
        annualIncome: "₹420,000",
        religion: "Jain",
        education: "BA",
        profession: "Designer"
    },
    {
        id: 8,
        imageUrl: "/profile8.avif",
        name: "Arun Das",
        age: "31",
        height: "5'10\"",
        location: "Jaipur",
        annualIncome: "₹600,000",
        religion: "Buddhist",
        education: "B.E.",
        profession: "Engineer"
    },
    {
        id: 9,
        imageUrl: "/profile9.avif",
        name: "Kavita Reddy",
        age: "26",
        height: "5'7\"",
        location: "Ahmedabad",
        annualIncome: "₹620,000",
        religion: "Hindu",
        education: "MBBS",
        profession: "Doctor"
    },
    {
        id: 10,
        imageUrl: "/profile10.avif",
        name: "Manoj Joshi",
        age: "32",
        height: "5'11\"",
        location: "Lucknow",
        annualIncome: "₹750,000",
        religion: "Muslim",
        education: "M.Tech",
        profession: "Architect"
    },
    {
        id: 11,
        imageUrl: "/profile11.avif",
        name: "Deepa Nair",
        age: "28",
        height: "5'5\"",
        location: "Goa",
        annualIncome: "₹800,000",
        religion: "Christian",
        education: "PhD",
        profession: "Researcher"
    },
    {
        id: 12,
        imageUrl: "/profile12.avif",
        name: "Priya Sharma",
        age: "26",
        height: "5'4\"",
        location: "Mumbai",
        annualIncome: "₹600,000",
        religion: "Hindu",
        education: "MBA",
        profession: "Software Engineer"
    },
    {
        id: 13,
        imageUrl: "/profile13.avif",
        name: "Ritu Bose",
        age: "27",
        height: "5'4\"",
        location: "Surat",
        annualIncome: "₹530,000",
        religion: "Sikh",
        education: "BCA",
        profession: "Marketing Manager"
    },
    {
        id: 14,
        imageUrl: "/profile14.avif",
        name: "Amar Chauhan",
        age: "30",
        height: "5'9\"",
        location: "Indore",
        annualIncome: "₹490,000",
        religion: "Jain",
        education: "MA",
        profession: "Teacher"
    },
    {
        id: 15,
        imageUrl: "/profile15.avif",
        name: "Sneha Roy",
        age: "26",
        height: "5'6\"",
        location: "Nagpur",
        annualIncome: "₹710,000",
        religion: "Christian",
        education: "LLB",
        profession: "Lawyer"
    },
    {
        id: 16,
        imageUrl: "/profile16.avif",
        name: "Aditya Jain",
        age: "28",
        height: "5'8\"",
        location: "Bhubaneswar",
        annualIncome: "₹460,000",
        religion: "Hindu",
        education: "B.Ed",
        profession: "Teacher"
    },
    {
        id: 17,
        imageUrl: "/profile17.avif",
        name: "Pooja Desai",
        age: "25",
        height: "5'3\"",
        location: "Patna",
        annualIncome: "₹520,000",
        religion: "Muslim",
        education: "MPhil",
        profession: "Consultant"
    },
    {
        id: 18,
        imageUrl: "/profile18.avif",
        name: "Sameer Khan",
        age: "31",
        height: "6'0\"",
        location: "Chandigarh",
        annualIncome: "₹630,000",
        religion: "Sikh",
        education: "B.Pharma",
        profession: "Pharmacist"
    }
]

export default function Dashboard() {
    return (
        <section>
            <hgroup className={"flex flex-col items-center justify-center space-y-4 text-center pt-18"}>
                <h3 className={"text-4xl md:text-6xl text-secondary-foreground"}>Browse Profiles</h3>
                <p className={"w-full max-w-2xl text-muted-foreground"}>
                    6 profiles match your preferences
                </p>
            </hgroup>
            <SidebarProvider className={"p-4"}>
                <AppSidebar/>
                <main className={"flex-1"}>
                    <SidebarTrigger/>
                    <div
                        className={"w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"}>
                        {profiles.map((profile) => (
                            <Card className={"w-full pt-0 overflow-hidden"} key={profile.id}>
                                <CardHeader className={"px-0"}>
                                    <Image
                                        src={profile.imageUrl}
                                        height={341}
                                        width={341}
                                        alt={"Display Image"}
                                        className={"w-full aspect-square object-cover"}/>
                                </CardHeader>
                                <CardContent>
                                    <h5 className={"text-lg font-semibold text-primary mb-2"}>{profile.name}</h5>
                                    <p>
                                        <span>{profile.age}</span>
                                        &nbsp;•&nbsp;
                                        <span>{profile.height}</span>
                                        &nbsp;•&nbsp;
                                        <span>{profile.location}</span>
                                    </p>
                                    <p>Annual income:&nbsp;<span>{profile.annualIncome}</span></p>
                                    <p>Religion:&nbsp;<span>{profile.religion}</span></p>
                                    <p>Education:&nbsp;<span>{profile.education}</span></p>
                                    <p>Profession:&nbsp;<span>{profile.profession}</span></p>
                                </CardContent>
                                <CardFooter className={"space-x-4"}>
                                    <Button variant={"outline"}><Heart/>Like</Button>
                                    <Button variant={"outline"}><Bookmark/></Button>
                                    <Button variant={"outline"}><Eye/></Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </main>
            </SidebarProvider>
        </section>
    )
}