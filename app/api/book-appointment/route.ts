import { NextRequest, NextResponse } from "next/server";

// API handler for POST requests to book an appointment
export async function POST(req: NextRequest) {
  try {
    const { doctor, date, time } = await req.json();

    if (!doctor || typeof doctor !== "string") {
      console.log("Validation error: Doctor name is required and must be a string");
      return NextResponse.json(
        { error: "Doctor name is required and must be a string" },
        { status: 400 }
      );
    }

    if (!date || !isValidDate(date)) {
      console.log("Validation error: Valid date is required");
      return NextResponse.json(
        { error: "A valid date is required (YYYY-MM-DD format)" },
        { status: 400 }
      );
    }

    if (!time || !isValidTime(time)) {
      console.log("Validation error: Valid time is required");
      return NextResponse.json(
        { error: "A valid time is required (HH:MM format)" },
        { status: 400 }
      );
    }

    const bookingDetails = {
      doctor,
      date,
      time,
      bookedAt: new Date().toISOString(),
    };
    console.log("Booking saved successfully:", bookingDetails);

    // Return a simple success message
    return NextResponse.json(
      { message: "Appointment booked" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in /api/book-appointment:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });
    return NextResponse.json(
      {
        error: "Failed to book appointment",
        details: error.message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

// Helper functions
function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !isNaN(date.getTime()) && date >= today;
}

function isValidTime(timeString: string): boolean {
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(timeString);
}