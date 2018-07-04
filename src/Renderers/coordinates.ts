// physics engine has one set of units
// we want to decouple this from canvas pixels and screen size

// scale things so that canvas always displays 0-1000 in the x direction

import { Vector } from 'matter-js';
export interface DisplayVector {
    x: number;
    y: number;
}

export const RENDER_WIDTH = 1000;

const getDisplayCoord = (coord: number, canvasWidth: number) => coord * canvasWidth / RENDER_WIDTH;

const getWorldCoord = (coord: number, canvasWidth: number) => RENDER_WIDTH * coord / canvasWidth;

// Convert a Matter.Vector coordinate to a canvas coordinate for display
export const getDisplayCoords = (v: Vector, canvasWidth: number): DisplayVector => {
    return {
        x: getDisplayCoord(v.x, canvasWidth), 
        y: getDisplayCoord(v.y, canvasWidth)
    };
};