// src/app/api/utils/response.ts
import { NextResponse } from 'next/server';

export const sendSuccess = (message: string, data: any = null, status = 200) => {
  return NextResponse.json({
    success: true,
    message,
    data,
  }, { status });
};

export const sendError = (message: string, status = 500) => {
  return NextResponse.json({
    success: false,
    error: {
      message,
    },
  }, { status });
};