//api route to handle new user registration

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import {conn} from "../../../../config/dbConfig"

export async function POST(req: Request) {
  try {
    await conn(); //connection before processing
    const { fullName, email, password } = await req.json();
    //input validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 } //conflict status
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    //create new user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    //success response
    return NextResponse.json(
      {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        message: "Account created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
