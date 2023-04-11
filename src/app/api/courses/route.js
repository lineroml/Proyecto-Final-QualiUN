import PocketBase from 'pocketbase';
import { NextResponse } from "next/server";

const pb = new PocketBase('https://qualiun.pockethost.io/');

export async function GET(request) {

    const filter = request.nextUrl.searchParams.get('filter');

    if (filter) {
        // Check if filter contains a course code. Course codes are formed by three letters followed by four to six numbers.
        const courseCodeRegex = /^[a-zA-Z]{3}[0-9]{4,6}$/;
        const courseCode = filter.match(courseCodeRegex);

        // If a match is found, fetch courses with code and number separated

        let rawCourses;
        if (courseCode) {
            const courseCodeNumber = courseCode[0].match(/[0-9]+/)[0];
            const courseCodeLetters = courseCode[0].match(/[a-zA-Z]+/)[0].toUpperCase();
            console.log(courseCodeNumber, courseCodeLetters)
            rawCourses = await pb.collection('courses').getFullList({
                filter: `course_number = '${courseCodeNumber}' && course_code = '${courseCodeLetters}'`,
                expand: 'reviews(course)'
            })
        } else {
            rawCourses = await pb.collection('courses').getFullList({
                filter: `name ~ '${filter}'`,
                expand: 'reviews(course)'
            })

        }
        console.log(rawCourses)
        const courses = rawCourses.map(course => {
            return {
                id: course.id,
                nombre: course.name,
                codigo: course.course_code + " " + course.course_number,
                reviews: course.expand['reviews(course)']?.length || 0,
            }
        });
        return NextResponse.json({
            courses,
            total: courses.length,
            message: 'Courses fetched successfully'
        });
    } else {
        return NextResponse.json({
            courses: [],
            total: 0,
            message: 'No filter provided'
        });
    }

}