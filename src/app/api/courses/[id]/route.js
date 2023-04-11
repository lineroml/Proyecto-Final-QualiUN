import PocketBase from "pocketbase";
import {NextResponse} from "next/server";

const pb = new PocketBase("https://qualiun.pockethost.io/");

export async function GET(request, context) {

    const { id } = context.params;

    const query = await pb.collection("courses").getOne(id, {
        expand: "reviews(course).answers"
    });

    console.log(query.expand["reviews(course)"]);
    return NextResponse.json({ query });

}