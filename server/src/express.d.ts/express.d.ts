import * as express from 'express';


declare global {
    namespace Express {
        interface Request {
            userId? : number;
        };
    }
};

// Rule of thumb... always import the library at the top of the .d.ts file...
/// always wrap your changes inside declare global { namespace LibraryName {... Whatever code} } 