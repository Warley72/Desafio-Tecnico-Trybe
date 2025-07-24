import Link from "next/link"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { DiGithubBadge } from "react-icons/di"
import { FaGoogle } from "react-icons/fa"

export default function SignIn() {
    return (
        <div className="flex justify-center items-center h-screen p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Login to your account</CardTitle>
                    <CardAction>
                        <Link href={"/createAccount"}>
                            <Button variant="link">Sign Up</Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2 w-full">
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                        <Link href={""} className="w-full sm:w-1/2">
                            <Button className="w-full flex items-center justify-center gap-2">
                                <FaGoogle className="size-4" />
                                Google
                            </Button>
                        </Link>

                        <span className="hidden sm:block text-muted-foreground">OR</span>

                        <Link href={""} className="w-full sm:w-1/2">
                            <Button className="w-full flex items-center justify-center gap-2">
                                <DiGithubBadge className="size-5" />
                                GitHub
                            </Button>
                        </Link>
                    </div>
                    <Link href={"/buscarcep"} className="w-full">
                        <Button type="submit" className="w-full">Login</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
