import Link from "next/link";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Lock, Mail, Phone} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";

export default function SignIn() {
    return (
        <main className="min-h-screen py-4 flex flex-col justify-center items-center">
            <Link href="/" className="text-3xl font-bold text-primary text-center mb-2">
                HeartBridge
            </Link>
            <p className="text-gray-600 text-base text-center max-w-76 pb-6">
                Personal assistance to facilitate introductions and guide both families through the process.
            </p>
            <Card className="w-88">
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
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
                        <div className="w-full flex justify-between items-center gap-2">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember"/>
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <Link href="/forgot-password" className="text-sm text-primary font-semibold">
                                Forgot password?
                            </Link>
                        </div>

                        <Link href="/">
                            <Button type="submit" variant="default" className="w-full">Sign in</Button>
                        </Link>
                        <span className="flex gap-1 justify-center">
                            Don&#39;t have an account?<Link href="/sign-up" className="text-primary font-semibold">Sign up</Link>
                        </span>
                        <div className="w-full flex justify-between items-center gap-2 py-3">
                            <hr className="w-full"/>
                            <span className="flex-none text-xs">OR CONTINUE WITH</span>
                            <hr className="w-full"/>
                        </div>
                        <Button type="button" variant="outline" className="w-full" asChild>
                            <Link href={"/"}>
                                <Mail className="me-2 h-4 w-4"/>Continue with Google
                            </Link>
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-xs">
                    By signing in you accept&nbsp;
                    <Link href={"/privacy-policy"}>Privacy Policy</Link>
                    &nbsp;and&nbsp;
                    <Link href={"/terms-of-service"}>Terms</Link>
                </CardFooter>
            </Card>
        </main>
    )
}