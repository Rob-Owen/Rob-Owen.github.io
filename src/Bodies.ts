import { Bodies, Vector } from 'matter-js';

type bodyCallback = (bodies: Matter.Body[]) => void;
const bodiesAddedCallbacks: bodyCallback[] = [];

export const registerCallback = (cb: bodyCallback) => bodiesAddedCallbacks.push(cb);

export const addBody = (body: Matter.Body) => {
    bodiesAddedCallbacks.forEach(cb => cb([body]));
};

export const addBodies = (bodies: Matter.Body[]) => {
    bodiesAddedCallbacks.forEach(cb => cb(bodies));
};

export const setInitalBodies = () => {
    addBodies([
        Bodies.rectangle(300, 10, 20, 20),
        Bodies.rectangle(148, 50, 20, 20),
        Bodies.rectangle(155, 30, 20, 20),
        Bodies.rectangle(500, 300, 500, 10, { isStatic: true })
    ]);
};

export const addTestBody = (v: Vector) => {
    addBody(Bodies.rectangle(v.x, v.y, 30, 30));
};