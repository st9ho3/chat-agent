// src/app/api/utils/response.ts
import { NextResponse } from 'next/server';


interface APIResponseSuccess<T> {
    success: boolean;
    message: string;
    data: T;
}
interface APIResponseError {
    success: boolean;
    error: {
        message: string
    }
}

export const sendSuccess = <T>(message: string, data: T, status = 200): NextResponse<APIResponseSuccess<T>>  => {
  return NextResponse.json({
    success: true,
    message,
    data,
  }, { status });
};

export const sendError = (message: string, status = 500): NextResponse<APIResponseError> => {
  return NextResponse.json({
    success: false,
    error: {
      message,
    },
  }, { status });
};