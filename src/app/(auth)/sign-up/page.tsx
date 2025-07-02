import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Lock, Mail, Phone} from "lucide-react";

export default function SignUp() {
    return (
        <main className="min-h-screen py-4 flex flex-col justify-center items-center">
            <Link href="/" className="text-3xl font-bold text-primary text-center mb-2">
                UrbanPestMaster
            </Link>
            <p className="text-gray-600 text-base text-center max-w-76 pb-6">
                Professional pest control solutions for your home and business
            </p>
            <Card className="w-88">
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription>Enter your credentials to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="email">
                                <Mail className="h-4 w-4"/>Email or<Phone className="h-4 w-4"/>Phone number
                            </Label>
                            <Input type="text"
                                   id="email"
                                   placeholder="Enter your email or phone number"
                                   pattern="^([^\s@]+@[^\s@]+\.[^\s@]+|\+?\d{10,15})$"
                                   title="Please enter a valid email or phone number"
                                   required/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="password">
                                <Lock className="h-4 w-4"/>Password
                            </Label>
                            <Input type="password" id="password" placeholder="Enter your password" required/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="password2"><Lock className="h-4 w-4"/>Confirm password</Label>
                            <Input type="password" id="password2" placeholder="Enter your password again" required/>
                        </div>
                        <Button type="submit" variant="default" className="w-full">Sign up</Button>
                        <span className="flex gap-1 justify-center">
                            Already have an account?
                            <Link href="/sign-in" className="text-primary font-semibold">
                                Sign in
                            </Link>
                        </span>
                        <div className="w-full flex justify-between items-center gap-2 py-3">
                            <hr className="w-full"/>
                            <span className="flex-none text-xs">OR CONTINUE WITH</span>
                            <hr className="w-full"/>
                        </div>
                        <Button type="button" variant="outline" className="w-full">
                            <Mail className="me-2 h-4 w-4"/>Continue with Google</Button>
                    </form>
                </CardContent>
                <CardFooter className="text-xs">By signing up you accept Privacy Policy and Terms</CardFooter>
            </Card>
        </main>
    );
}