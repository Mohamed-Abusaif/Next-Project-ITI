import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma";

async function getSessionUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return null;
  }
  return session.user;
}

async function getID(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: { id: true },
  });
  if (!user) {
    return null;
  }
  return user.id;
}

export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany({});
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loggedInUserId = await getID(user.email || "");
    if (!loggedInUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ posts, loggedInUserId }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await getSessionUser();
    if (!data) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("User:", data);

    const loggedInUserId = await getID(data.email || "");
    if (!loggedInUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: loggedInUserId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const loggedInUserData = await getSessionUser();
    if (!loggedInUserData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loggedInUserId = await getID(loggedInUserData.email || "");
    if (!loggedInUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const authorizedPost = await prisma.post.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!authorizedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (authorizedPost.userId !== loggedInUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || "Failed to delete post" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const loggedInUserId = await getID(user.email || "");
    if (!loggedInUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const body = await request.json();
    const { id, title, content } = body;

    if (!id || !title || !content) {
      return NextResponse.json(
        { error: "ID, title, and content are required" },
        { status: 400 }
      );
    }

    const authorizedPost = await prisma.post.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!authorizedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (authorizedPost.userId !== loggedInUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || "Failed to update post" },
      { status: 500 }
    );
  }
}
