import type { Request, Response } from "express";
import { Equal, Like } from "typeorm";

// Retrieve id from response
export function retrieveIdFromPath(req: Request) {
    const id = Number.parseInt(req.params.id);
    if (!Number.isNaN(id))
        return id;
    return 0;
}

// Parse to number
export function parseToNumber(value: any) {
    const id = Number.parseInt(value);
    if (!Number.isNaN(id))
        return id;
    return 0;
}

// Not found response
export function notFoundResponse(res: Response, msg = 'NOT_FOUND') {
    res.status(404).json({
        message: msg,
        timestamp: new Date()
    });
}

// Error response
export function sendErrorResponse(res: Response, code = 400, msg = "BAD_REQUEST") {
    res.status(code).json({
        message: msg,
        timestamp: new Date()
    });
}

export function sendError(res: Response, e: any) {
    res.status(500).json({
        message: e.message,
        timestamp: new Date()
    })
}

// Validate if defined
export function checkIfDefined(data: any, res: Response) {
    if (data == undefined) {
        notFoundResponse(res)
        return;
    }
    return data;
}

// Search utils
export function filter(search: string) {
    const filter = search ?? "";
    return Like(`%${filter}%`)
}

// Search utils for numbers
export function filterNumber(search: string | number | undefined) {
    const filter = parseInt(search as string, 10); // Convert to number if possible
    if (isNaN(filter)) {
        // If search is not a valid number, return an invalid operator (or handle differently)
        return null;
    }
    return Equal(filter); // Use the Equal operator for numeric comparison
}

// Search utils
export function splitFilter(search: string) {
    const filter = search ?? "";
    return filter.trim().split(/\s+/).map(part => Like(`%${part}%`));
}