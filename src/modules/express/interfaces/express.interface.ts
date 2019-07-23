import { Router } from 'express';

export interface RouterExtender {
    extend(router: Router): void;
}
