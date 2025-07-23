"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

import { DiGithubBadge } from "react-icons/di";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

export default function SignUp() {
    return (
        <div className="flex justify-center items-center h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-col items-center space-y-2 text-center">
                    <h1 className="text-xl font-semibold">Create an account</h1>
                    <span className="text-sm text-muted-foreground">
                        Enter your email below to create your account
                    </span>
                    <div className="w-full">
                        <div className="flex flex-col sm:flex-row gap-2 w-full">
                            <div className="w-full">
                                <Button className="w-full flex items-center justify-center gap-2">
                                    <DiGithubBadge className="size-6" />
                                    GitHub
                                </Button>
                            </div>
                            <div className="w-full">
                                <Button className="w-full flex items-center justify-center gap-2">
                                    <FaGoogle className="size-4" />
                                    Google
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 border-t border-muted-foreground" />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                            OR CONTINUE WITH
                        </span>
                        <div className="flex-1 border-t border-muted-foreground" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <div className="w-full max-w-md">
                        <h1 className="mb-1">Email</h1>
                        <Input placeholder="m@example.com" />
                    </div>
                    <div className="w-full max-w-md">
                        <h1 className="mb-1">Passworld</h1>
                        <Input />
                    </div>
                    <div className="flex flex-col gap-2 w-full max-w-md">
                        <Link href={"/buscarcep"}>
                            <Button className="w-full">Create account</Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
